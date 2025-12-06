
import { GoogleGenAI, FunctionDeclaration, Type, Chat, Part, GenerateContentResponse } from "@google/genai";

// Tool Definitions
const addToCartDecl: FunctionDeclaration = {
  name: 'addToCart',
  description: 'Add an item to the shopping cart. Fails if item not found in inventory.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      productName: { type: Type.STRING, description: 'Name of product (e.g. Rice)' },
      brand: { type: Type.STRING, description: 'Brand name (e.g. India Gate)' },
      packSize: { type: Type.STRING, description: 'Specific pack size (e.g. 5 kg)' },
      quantity: { type: Type.NUMBER, description: 'Number of packs to add. Default 1.' }
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
      productName: { type: Type.STRING, description: 'Name of product to remove' }
    },
    required: ['productName']
  }
};

const clearCartDecl: FunctionDeclaration = {
  name: 'clearCart',
  description: 'Remove all items from the cart.',
  parameters: {
    type: Type.OBJECT,
    properties: {},
  }
};

const showCartDecl: FunctionDeclaration = {
  name: 'showCart',
  description: 'Open the cart drawer to show items.',
  parameters: {
    type: Type.OBJECT,
    properties: {},
  }
};

const triggerCheckoutDecl: FunctionDeclaration = {
  name: 'triggerCheckout',
  description: 'Open the checkout modal to proceed to payment.',
  parameters: {
    type: Type.OBJECT,
    properties: {},
  }
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

let chatSession: Chat | null = null;
let aiClient: GoogleGenAI | null = null;

export const initializeGemini = (systemInstruction: string) => {
  if (!process.env.API_KEY) {
    console.error("API_KEY is missing!");
    return;
  }

  aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Create chat with tools
  chatSession = aiClient.chats.create({
    model: 'gemini-2.5-flash',
    config: {
        systemInstruction: systemInstruction,
        tools: [{
            functionDeclarations: [
                addToCartDecl, 
                removeFromCartDecl, 
                clearCartDecl, 
                showCartDecl, 
                triggerCheckoutDecl,
                getCartDetailsDecl,
                placeOrderDecl
            ]
        }]
    }
  });
};

export const sendMessageToGemini = async (
  message: string, 
  toolHandler: (name: string, args: any) => Promise<any>,
  onUpdate?: (chunk: string) => void
): Promise<string> => {
    // If session is missing, logic in App.tsx typically handles re-init, but we safeguard here
    if (!chatSession) {
        return "System Error: AI not initialized. Please refresh.";
    }

    let accumulatedText = "";
    
    // Helper to process stream logic
    const processStream = async (input: string | Part[]) => {
        let stream;
        try {
            // Pass input wrapped in 'message' property as required by @google/genai Chat.sendMessageStream
            stream = await chatSession!.sendMessageStream({ message: input });
        } catch (error: any) {
            // Handle Rate Limits (429)
            if (error.status === 429 || error.code === 429 || error.message?.includes('429') || error.message?.includes('quota')) {
                 const errorMsg = "\n*(I'm experiencing high traffic right now. Please wait a moment and try again.)*";
                 accumulatedText += errorMsg;
                 if (onUpdate) onUpdate(accumulatedText);
                 return []; // Stop processing
            }
            throw error;
        }

        let functionCalls: any[] = [];

        for await (const chunk of stream) {
            // Check for text updates
            if (chunk.text) {
                accumulatedText += chunk.text;
                if (onUpdate) onUpdate(accumulatedText);
            }
            
            // Collect function calls (Gemini 2.5 Flash / 3 Pro usually send them in chunks or at end)
            if (chunk.functionCalls && chunk.functionCalls.length > 0) {
                functionCalls.push(...chunk.functionCalls);
            }
        }
        return functionCalls;
    };

    try {
        let functionCalls = await processStream(message);

        // Handle Tool execution loop
        while (functionCalls.length > 0) {
            const parts: Part[] = [];
            
            for (const call of functionCalls) {
                try {
                    console.log("Calling tool:", call.name, call.args);
                    const executionResult = await toolHandler(call.name, call.args);
                    
                    parts.push({
                        functionResponse: {
                            name: call.name,
                            id: call.id, 
                            response: { result: executionResult }
                        }
                    });
                } catch (e) {
                    console.error(`Error executing tool ${call.name}:`, e);
                    parts.push({
                        functionResponse: {
                            name: call.name,
                            id: call.id,
                            response: { result: { error: "Tool execution failed" } }
                        }
                    });
                }
            }

            // Recursively send tool outputs back to model and continue streaming response
            functionCalls = await processStream(parts);
        }

        return accumulatedText || "";
    } catch (error) {
        console.error("Gemini Error:", error);
        return accumulatedText + "\n*(Connection error. Please try again.)*";
    }
};

export const resetSession = (systemInstruction: string) => {
    initializeGemini(systemInstruction);
}
