
import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Type, FunctionDeclaration } from '@google/genai';
import { base64ToUint8Array, decodeAudioData, arrayBufferToBase64, float32ToPCM16 } from '../utils/audioUtils';
import { generateSystemInstruction } from '../constants';
import { InventoryItem } from '../types';

interface VoiceAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  inventory: InventoryItem[];
  toolHandler: (name: string, args: any) => Promise<any>;
}

// Live API Tool Definitions
const addToCartDecl: FunctionDeclaration = {
  name: 'addToCart',
  description: 'Add an item to the shopping cart.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      productName: { type: Type.STRING },
      brand: { type: Type.STRING },
      packSize: { type: Type.STRING },
      quantity: { type: Type.NUMBER }
    },
    required: ['productName', 'brand', 'packSize']
  }
};

const removeFromCartDecl: FunctionDeclaration = {
  name: 'removeFromCart',
  description: 'Remove a specific product from the cart.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      productName: { type: Type.STRING }
    },
    required: ['productName']
  }
};

const triggerCheckoutDecl: FunctionDeclaration = {
    name: 'triggerCheckout',
    description: 'Trigger the checkout process.',
    parameters: { type: Type.OBJECT, properties: {} }
};

const getCartDetailsDecl: FunctionDeclaration = {
    name: 'getCartDetails',
    description: 'Get a list of items currently in the cart to read out to the user.',
    parameters: { type: Type.OBJECT, properties: {} }
};

const placeOrderDecl: FunctionDeclaration = {
    name: 'placeOrder',
    description: 'Finalize the order with a delivery address.',
    parameters: {
        type: Type.OBJECT,
        properties: {
            address: { type: Type.STRING, description: 'User delivery address' }
        },
        required: ['address']
    }
};

const VoiceAgentModal: React.FC<VoiceAgentModalProps> = ({ isOpen, onClose, inventory, toolHandler }) => {
  const [status, setStatus] = useState<'connecting' | 'listening' | 'speaking' | 'error'>('connecting');
  const [volume, setVolume] = useState(0);
  
  // Refs for audio handling to avoid stale closures
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputContextRef = useRef<AudioContext | null>(null);
  const wsRef = useRef<any>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Helper ref to avoid stale closures in callbacks
  const toolHandlerRef = useRef(toolHandler);
  
  useEffect(() => {
    toolHandlerRef.current = toolHandler;
  }, [toolHandler]);

  useEffect(() => {
    if (!isOpen) {
      cleanup();
      return;
    }

    startSession();

    return () => cleanup();
  }, [isOpen]);

  const cleanup = () => {
    if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
    }
    if (processorRef.current) {
        processorRef.current.disconnect();
        processorRef.current = null;
    }
    if (inputContextRef.current) {
        inputContextRef.current.close();
        inputContextRef.current = null;
    }
    if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
    }
  };

  const startSession = async () => {
    setStatus('connecting');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const systemInstruction = generateSystemInstruction(inventory) + 
      "\n\nVOICE MODE SPECIFIC INSTRUCTIONS:\n1. Keep responses conversational and under 1 sentence.\n2. On 'Checkout', you MUST call getCartDetails() first. The user has a cart you cannot see yet.\n3. Follow the 5-step checkout flow strictly.\n4. Final output must mention 'Cash on Delivery' and 'Delivery in a few hours'.";

      // 1. Setup Audio Output
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      nextStartTimeRef.current = 0;

      // 2. Setup Audio Input
      inputContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
            systemInstruction: systemInstruction,
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
            },
            tools: [{
                functionDeclarations: [
                    addToCartDecl, 
                    removeFromCartDecl, 
                    triggerCheckoutDecl,
                    getCartDetailsDecl,
                    placeOrderDecl
                ]
            }]
        },
        callbacks: {
            onopen: () => {
                setStatus('listening');
                console.log("Live Session Open");
                
                // Start Microphone Stream
                if (!inputContextRef.current || !streamRef.current) return;
                
                const source = inputContextRef.current.createMediaStreamSource(streamRef.current);
                const processor = inputContextRef.current.createScriptProcessor(4096, 1, 1);
                processorRef.current = processor;
                
                processor.onaudioprocess = (e) => {
                    const inputData = e.inputBuffer.getChannelData(0);
                    // Visualizer Volume
                    let sum = 0;
                    for(let i=0; i<inputData.length; i++) sum += inputData[i] * inputData[i];
                    setVolume(Math.sqrt(sum / inputData.length));

                    const pcmData = float32ToPCM16(inputData);
                    const base64Data = arrayBufferToBase64(pcmData);
                    
                    sessionPromise.then(session => {
                        session.sendRealtimeInput({
                            media: {
                                mimeType: 'audio/pcm;rate=16000',
                                data: base64Data
                            }
                        });
                    });
                };
                
                source.connect(processor);
                processor.connect(inputContextRef.current.destination);
            },
            onmessage: async (msg: LiveServerMessage) => {
                // Handle Audio Output
                const audioData = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
                if (audioData) {
                    setStatus('speaking');
                    if (audioContextRef.current) {
                        const audioBuffer = await decodeAudioData(
                            base64ToUint8Array(audioData),
                            audioContextRef.current
                        );
                        
                        const source = audioContextRef.current.createBufferSource();
                        source.buffer = audioBuffer;
                        source.connect(audioContextRef.current.destination);
                        
                        const now = audioContextRef.current.currentTime;
                        // Schedule next chunk
                        const start = Math.max(now, nextStartTimeRef.current);
                        source.start(start);
                        nextStartTimeRef.current = start + audioBuffer.duration;
                        
                        source.onended = () => {
                           if (audioContextRef.current && audioContextRef.current.currentTime >= nextStartTimeRef.current) {
                               setStatus('listening');
                           }
                        };
                        sourcesRef.current.add(source);
                    }
                }

                // Handle Tool Calls
                if (msg.toolCall) {
                    for (const call of msg.toolCall.functionCalls) {
                        console.log("Voice Tool Call:", call);
                        // USE REF to get latest closure
                        const result = await toolHandlerRef.current(call.name, call.args);
                        
                        sessionPromise.then(session => {
                            session.sendToolResponse({
                                functionResponses: {
                                    id: call.id,
                                    name: call.name,
                                    response: { result }
                                }
                            });
                        });
                    }
                }
                
                if (msg.serverContent?.interrupted) {
                    // Clear buffer if user interrupts
                     sourcesRef.current.forEach(source => source.stop());
                     sourcesRef.current.clear();
                     nextStartTimeRef.current = 0;
                     setStatus('listening');
                }
            },
            onclose: () => {
                console.log("Live Session Closed");
                onClose();
            },
            onerror: (err) => {
                console.error("Live Session Error", err);
                setStatus('error');
            }
        }
      });

    } catch (e) {
      console.error(e);
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center animate-fade-in">
        <button onClick={onClose} className="absolute top-6 right-6 p-4 bg-white/10 rounded-full hover:bg-white/20 transition">
            <span className="material-icons-round text-white text-2xl">close</span>
        </button>

        <div className="relative">
             {/* Pulse Ring */}
             <div className={`absolute inset-0 rounded-full border-2 border-white/20 scale-[2] animate-ping opacity-20 ${status === 'speaking' || volume > 0.1 ? 'block' : 'hidden'}`}></div>
             
             {/* Main Orb */}
             <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_0_60px_rgba(59,130,246,0.5)]
                ${status === 'error' ? 'bg-red-500' : 
                  status === 'speaking' ? 'bg-blue-500 scale-110' : 
                  'bg-black border border-white/20'
                }
             `}>
                 <span className="material-icons-round text-white text-5xl">
                    {status === 'connecting' ? 'wifi' : 
                     status === 'error' ? 'error_outline' :
                     status === 'speaking' ? 'graphic_eq' : 'mic'}
                 </span>
             </div>
        </div>

        <h2 className="mt-8 text-2xl font-light text-white tracking-wide">
            {status === 'connecting' && "Connecting..."}
            {status === 'listening' && "Listening..."}
            {status === 'speaking' && "Speaking..."}
            {status === 'error' && "Connection Error"}
        </h2>
        
        <p className="mt-2 text-white/50 text-sm">Tap the microphone to interrupt</p>
    </div>
  );
};

export default VoiceAgentModal;
