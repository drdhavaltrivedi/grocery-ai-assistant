import React, { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onConfirm: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, cart, onConfirm }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onConfirm();
    }, 2000); // Simulate API call
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={!isProcessing ? onClose : undefined} />
      
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative z-10 animate-scale-up">
        <div className="bg-green-600 p-6 text-white text-center">
          <h2 className="text-2xl font-bold">Checkout</h2>
          <p className="opacity-90 mt-1">{cart.length} Items</p>
        </div>

        <div className="p-6">
          <div className="mb-6 space-y-3 max-h-60 overflow-y-auto">
             <div className="flex justify-between border-b pb-2 font-semibold text-gray-600">
                <span>Item</span>
                <span>Amount</span>
             </div>
             {cart.map(item => (
                 <div key={item.cartId} className="flex justify-between text-sm text-gray-900 font-medium">
                     <span>{item.quantity}x {item.name} ({item.brand}, {item.packSize})</span>
                     <span>₹{item.price * item.quantity}</span>
                 </div>
             ))}
             <div className="flex justify-between pt-2 border-t font-bold text-lg text-gray-900 mt-2">
                <span>Total</span>
                <span>₹{total}</span>
             </div>
          </div>

          <div className="mb-6">
             <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
             <div className="grid grid-cols-2 gap-3">
                 <div className="border-2 border-green-500 bg-green-50 p-3 rounded-lg text-center cursor-pointer">
                    <span className="material-icons-round block text-green-600 mb-1">payments</span>
                    <span className="text-sm font-bold text-gray-900">Cash on Delivery</span>
                 </div>
                 <div className="border border-gray-200 p-3 rounded-lg text-center opacity-50 cursor-not-allowed">
                    <span className="material-icons-round block text-gray-400 mb-1">credit_card</span>
                    <span className="text-sm font-bold text-gray-900">Online (Disabled)</span>
                 </div>
             </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? (
               <>
                 <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                 Placing Order...
               </>
            ) : (
                "Place Order"
            )}
          </button>
          
          {!isProcessing && (
            <button onClick={onClose} className="w-full mt-3 py-2 text-gray-500 text-sm hover:text-gray-800">
                Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;