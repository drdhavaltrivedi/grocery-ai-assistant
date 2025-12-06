
import React, { useState, useEffect, useRef } from 'react';
import { INITIAL_GREETING, INITIAL_INVENTORY, generateSystemInstruction } from './constants';
import { CartItem, Message, InventoryItem } from './types';
import ChatInput from './components/ChatInput';
import ChatMessage from './components/ChatMessage';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import TypingIndicator from './components/TypingIndicator';
import VoiceAgentModal from './components/VoiceAgentModal';
import AdminPanel from './components/AdminPanel';
import { initializeGemini, sendMessageToGemini, resetSession } from './services/geminiService';

const App: React.FC = () => {
  // --- Global State ---
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [messages, setMessages] = useState<Message[]>([INITIAL_GREETING]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isBotOnline, setIsBotOnline] = useState(true);
  
  // --- UI State ---
  const [isTyping, setIsTyping] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [focusInputTrigger, setFocusInputTrigger] = useState(0);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const systemInstructionRef = useRef<string>(generateSystemInstruction(INITIAL_INVENTORY));

  // --- Initialization ---
  useEffect(() => {
    // Generate instruction based on initial inventory
    systemInstructionRef.current = generateSystemInstruction(inventory);
    initializeGemini(systemInstructionRef.current);
  }, []); // Only runs once on mount. Updates handled by resetSession.

  // --- Auto-scroll ---
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // --- Helpers ---
  const findInventoryItem = (name: string, brand?: string, packSize?: string): InventoryItem | undefined => {
    const targetName = name.toLowerCase();
    const targetBrand = brand?.toLowerCase();
    const targetPack = packSize?.toLowerCase().replace(/\s/g, ''); 

    return inventory.find(item => {
        const itemName = item.name.toLowerCase();
        const itemBrand = item.brand.toLowerCase();
        const itemPack = item.packSize.toLowerCase().replace(/\s/g, '');

        const nameMatch = itemName.includes(targetName) || targetName.includes(itemName);
        const brandMatch = targetBrand ? itemBrand === targetBrand : true;
        const packMatch = targetPack ? itemPack === targetPack : true;
        
        return nameMatch && brandMatch && packMatch;
    });
  };

  // --- Shared Tool Handlers (Voice + Text) ---
  const handleToolCall = async (name: string, args: any): Promise<any> => {
    console.log(`Executing Tool: ${name}`, args);

    switch (name) {
      case 'addToCart': {
        const { productName, brand, packSize, quantity = 1 } = args;
        const item = findInventoryItem(productName, brand, packSize);
        
        if (!item) {
           return { success: false, message: `Could not find ${brand} ${productName} ${packSize} in inventory.` };
        }

        setCart(prev => {
          const existingIndex = prev.findIndex(p => p.id === item.id);
          if (existingIndex >= 0) {
            const newCart = [...prev];
            newCart[existingIndex].quantity += quantity;
            return newCart;
          }
          return [...prev, { ...item, quantity, cartId: Math.random().toString(36).substr(2, 9) }];
        });
        
        return { success: true, message: `Added ${quantity}x ${item.brand} ${item.name} (${item.packSize}).` };
      }

      case 'removeFromCart': {
        const { productName } = args;
        let removedCount = 0;
        setCart(prev => {
            const filtered = prev.filter(item => {
                const match = item.name.toLowerCase().includes(productName.toLowerCase());
                if (match) removedCount++;
                return !match;
            });
            return filtered;
        });
        return { success: true, count: removedCount, message: removedCount > 0 ? "Removed items." : "Item not found." };
      }

      case 'clearCart': {
        setCart([]);
        return { success: true, message: "Cart cleared." };
      }

      case 'showCart': {
        setIsCartOpen(true);
        return { success: true, message: "Cart opened." };
      }

      case 'triggerCheckout': {
        if (cart.length === 0) return { success: false, message: "Cart is empty." };
        setIsCheckoutOpen(true);
        setIsVoiceMode(false);
        return { success: true, message: "Checkout started." };
      }

      case 'getCartDetails': {
         if (cart.length === 0) return { success: true, cart: "Your cart is empty.", total: 0 };
         const list = cart.map(i => `${i.quantity}x ${i.name} (${i.brand})`).join(', ');
         const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
         return { success: true, cart: list, total: total };
      }

      case 'placeOrder': {
         const { address } = args;
         if (cart.length === 0) return { success: false, message: "Cart is empty, cannot place order." };
         
         // Finalize order
         setCart([]);
         setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: 'model',
            text: `🎉 **Order Placed!**\nDelivering to: ${address}`,
            timestamp: Date.now()
         }]);
         // Do not reset session here to allow AI to finish speaking
         
         // Close voice mode after a brief delay
         setTimeout(() => setIsVoiceMode(false), 5000);
         
         return { success: true, message: "Order placed successfully." };
      }

      default:
        return { error: "Unknown tool" };
    }
  };

  // --- Text Chat Interaction ---
  const handleUserSend = async (text: string) => {
    if (!isBotOnline) {
         setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: 'model',
            text: "⚠️ **Store is currently offline.** Please check back later.",
            timestamp: Date.now()
         }]);
         return;
    }

    // 1. Add User Message
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // 2. Create Placeholder for Model Message
    const modelMsgId = (Date.now() + 1).toString();
    const modelMsg: Message = { id: modelMsgId, role: 'model', text: '', timestamp: Date.now() };
    setMessages(prev => [...prev, modelMsg]);

    // 3. Send to Gemini with Streaming Callback
    await sendMessageToGemini(text, handleToolCall, (streamText) => {
        setIsTyping(false); // Stop typing indicator as soon as we get first chunk
        setMessages(prev => prev.map(m => m.id === modelMsgId ? { ...m, text: streamText } : m));
    });
    
    // Ensure typing indicator is definitely off
    setIsTyping(false);
  };

  // --- Admin Logic ---
  const handleUpdateInventory = (newInventory: InventoryItem[]) => {
      setInventory(newInventory);
      // Re-initialize Gemini with new inventory
      systemInstructionRef.current = generateSystemInstruction(newInventory);
      resetSession(systemInstructionRef.current);
  };

  const handleToggleBot = () => {
      setIsBotOnline(!isBotOnline);
  };

  const handleCloseCheckout = () => {
      setIsCheckoutOpen(false);
      setFocusInputTrigger(prev => prev + 1);
  };

  const handleCheckoutSuccess = () => {
    setIsCheckoutOpen(false);
    setCart([]); 
    setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "🎉 **Order placed!** What else do you need?",
        timestamp: Date.now()
    }]);
    // Reset context
    resetSession(systemInstructionRef.current);
    setFocusInputTrigger(prev => prev + 1);
  };

  // --- Render ---
  return (
    <div className="flex flex-col h-full bg-gray-50 relative">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-3 flex justify-between items-center z-10 sticky top-0 safe-area-top">
        <div className="flex items-center gap-2">
           <div className={`p-2 rounded-lg transition-colors ${isBotOnline ? 'bg-blue-600' : 'bg-gray-400'}`}>
             <span className="material-icons-round text-white text-xl block">storefront</span>
           </div>
           <div>
             <h1 className="font-bold text-gray-800 leading-tight">Grocery AI</h1>
             <p className={`text-xs font-medium flex items-center gap-1 ${isBotOnline ? 'text-green-600' : 'text-red-500'}`}>
               <span className={`w-2 h-2 rounded-full ${isBotOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
               {isBotOnline ? 'Online' : 'Offline'}
             </p>
           </div>
        </div>
        
        <div className="flex items-center gap-2">
            <button 
                onClick={() => setIsAdminMode(true)}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-purple-600 transition-colors"
                title="Admin Panel"
            >
                <span className="material-icons-round">admin_panel_settings</span>
            </button>

            <button 
                onClick={() => setIsVoiceMode(true)}
                className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                title="Voice Mode"
            >
                <span className="material-icons-round">mic</span>
            </button>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <span className="material-icons-round text-gray-600 text-2xl">shopping_cart</span>
              {cart.length > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex-1 overflow-y-auto p-4 pb-0 scrollbar-hide">
        <div className="max-w-3xl mx-auto flex flex-col min-h-full">
           <div className="flex-1">
             {messages.map(msg => (
               <ChatMessage key={msg.id} message={msg} />
             ))}
             {isTyping && <TypingIndicator />}
             {!isBotOnline && (
                 <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg text-center my-4 border border-yellow-200">
                     Bot is currently offline for maintenance.
                 </div>
             )}
             <div ref={messagesEndRef} className="h-2" />
           </div>
        </div>
      </main>

      {/* Input */}
      <div className="w-full max-w-3xl mx-auto">
        <ChatInput 
            onSend={handleUserSend} 
            disabled={isTyping || !isBotOnline} 
            focusTrigger={focusInputTrigger}
        />
      </div>

      {/* Overlays */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => {
            setIsCartOpen(false);
            setFocusInputTrigger(prev => prev + 1);
        }} 
        cart={cart} 
        onRemove={(id) => setCart(prev => prev.filter(i => i.cartId !== id))}
        onCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={handleCloseCheckout} 
        cart={cart}
        onConfirm={handleCheckoutSuccess}
      />

      {isAdminMode && (
          <AdminPanel 
            inventory={inventory}
            onUpdateInventory={handleUpdateInventory}
            isBotOnline={isBotOnline}
            onToggleBot={handleToggleBot}
            onClose={() => setIsAdminMode(false)}
          />
      )}

      {isVoiceMode && (
          <VoiceAgentModal 
            isOpen={isVoiceMode}
            onClose={() => setIsVoiceMode(false)}
            inventory={inventory}
            toolHandler={handleToolCall}
          />
      )}
    </div>
  );
};

export default App;
