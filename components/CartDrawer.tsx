import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart, onRemove, onCheckout }) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const getCategoryIcon = (category: string) => {
    switch (category) {
        case 'Staples': return 'grains';
        case 'Dairy': return 'egg_alt'; // close approximation
        case 'Fresh Produce': return 'eco';
        case 'Snacks & Instant': return 'cookie';
        case 'Beverages': return 'local_drink';
        case 'Personal Care': return 'soap';
        case 'Household': return 'cleaning_services';
        default: return 'shopping_bag';
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed inset-y-0 right-0 w-80 sm:w-96 bg-white z-50 shadow-2xl transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="px-5 py-4 bg-white border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <span className="material-icons-round text-gray-500">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-3">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="material-icons-round text-4xl text-gray-300">shopping_basket</span>
              </div>
              <p className="font-medium">Your cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.cartId} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex gap-3">
                {/* Icon Box */}
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 text-gray-500">
                    <span className="material-icons-round">{getCategoryIcon(item.category)}</span>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-800 truncate pr-2">{item.name}</h3>
                      <button 
                        onClick={() => onRemove(item.cartId)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <span className="material-icons-round text-lg">close</span>
                      </button>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{item.brand} • {item.packSize}</p>
                  
                  <div className="flex justify-between items-end mt-2">
                    <div className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                        {item.quantity} x ₹{item.price}
                    </div>
                    <span className="font-bold text-gray-900">₹{item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-5 bg-white border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] safe-area-bottom">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 font-medium">Total Amount</span>
              <span className="text-2xl font-bold text-gray-900">₹{total}</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-black text-white py-3.5 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all active:scale-[0.98] shadow-md flex items-center justify-center gap-2"
            >
              <span>Checkout</span>
              <span className="material-icons-round text-sm">arrow_forward</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;