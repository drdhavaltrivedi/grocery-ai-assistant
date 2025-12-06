
import React, { useState } from 'react';
import { InventoryItem } from '../types';
import { CATEGORIES } from '../constants';

interface AdminPanelProps {
  inventory: InventoryItem[];
  onUpdateInventory: (items: InventoryItem[]) => void;
  onClose: () => void;
  isBotOnline: boolean;
  onToggleBot: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ inventory, onUpdateInventory, onClose, isBotOnline, onToggleBot }) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'settings'>('inventory');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [editingItem, setEditingItem] = useState<Partial<InventoryItem> | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (isAddingNew) {
        // Create new item
        const newItem: InventoryItem = {
            id: `SKU_${Date.now()}`,
            name: editingItem.name || 'New Product',
            brand: editingItem.brand || 'Generic',
            packSize: editingItem.packSize || '1 unit',
            category: editingItem.category || 'General',
            price: editingItem.price || 0,
            quantityValue: 1, // Default
            unit: 'unit'      // Default
        };
        onUpdateInventory([...inventory, newItem]);
    } else {
        // Update existing
        const newInventory = inventory.map(item => 
            item.id === editingItem.id ? { ...item, ...editingItem } as InventoryItem : item
        );
        onUpdateInventory(newInventory);
    }
    setEditingItem(null);
    setIsAddingNew(false);
  };

  const handleDelete = (id: string) => {
      if(confirm('Are you sure you want to delete this product?')) {
          onUpdateInventory(inventory.filter(i => i.id !== id));
      }
  };

  const startEdit = (item: InventoryItem) => {
      setEditingItem(item);
      setIsAddingNew(false);
  };

  const startAdd = () => {
      setEditingItem({ category: 'General', price: 0 });
      setIsAddingNew(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-50 flex flex-col animate-fade-in-up">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-600 rounded-lg text-white">
                    <span className="material-icons-round">admin_panel_settings</span>
                </div>
                <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
            </div>
            <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                Back to Store
            </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r flex flex-col">
                <div className="p-4 space-y-2 border-b">
                     <button 
                        onClick={() => setActiveTab('inventory')}
                        className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${activeTab === 'inventory' ? 'bg-purple-50 text-purple-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <span className="material-icons-round">inventory_2</span>
                        Inventory
                    </button>
                    <button 
                        onClick={() => setActiveTab('settings')}
                        className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${activeTab === 'settings' ? 'bg-purple-50 text-purple-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <span className="material-icons-round">settings</span>
                        Bot Settings
                    </button>
                </div>
                
                {activeTab === 'inventory' && (
                    <div className="p-4 flex-1 overflow-y-auto">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Categories</h3>
                        <div className="space-y-1">
                            <button 
                                onClick={() => setSelectedCategory('All')}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm ${selectedCategory === 'All' ? 'bg-gray-100 font-medium text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                All Products
                            </button>
                            {CATEGORIES.map(cat => (
                                <button 
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${selectedCategory === cat ? 'bg-gray-100 font-medium text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Main View */}
            <div className="flex-1 p-8 overflow-y-auto bg-gray-50">
                {activeTab === 'inventory' ? (
                    <div className="max-w-5xl mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <div className="relative w-96">
                                <span className="material-icons-round absolute left-3 top-2.5 text-gray-400">search</span>
                                <input 
                                    type="text" 
                                    placeholder="Search products..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <button 
                                onClick={startAdd}
                                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
                            >
                                <span className="material-icons-round text-sm">add</span>
                                Add Product
                            </button>
                        </div>

                        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Product</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Category</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Brand</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Size</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Price</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredInventory.map(item => (
                                        <tr key={item.id} className="hover:bg-gray-50 group">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                <span className="inline-block px-2 py-1 bg-gray-100 rounded text-xs">
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{item.brand}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{item.packSize}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">₹{item.price}</td>
                                            <td className="px-6 py-4 flex gap-2">
                                                <button onClick={() => startEdit(item)} className="text-blue-600 hover:text-blue-800">Edit</button>
                                                <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredInventory.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                                No products found in this category.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-2xl mx-auto space-y-6">
                        <div className="bg-white p-6 rounded-xl border shadow-sm">
                            <h3 className="text-lg font-semibold mb-4">Bot Status</h3>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">Online Status</p>
                                    <p className="text-sm text-gray-500">When offline, the bot will show maintenance mode.</p>
                                </div>
                                <button 
                                    onClick={onToggleBot}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isBotOnline ? 'bg-green-500' : 'bg-gray-300'}`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isBotOnline ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Add/Edit Modal */}
        {editingItem && (
            <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
                <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl">
                    <h3 className="text-lg font-bold mb-4">{isAddingNew ? 'Add Product' : 'Edit Product'}</h3>
                    <form onSubmit={handleSaveItem} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select 
                                value={editingItem.category || 'General'}
                                onChange={e => setEditingItem({...editingItem, category: e.target.value})}
                                className="w-full border rounded-lg p-2 mt-1 bg-white text-gray-900"
                            >
                                {CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input 
                                required
                                value={editingItem.name || ''} 
                                onChange={e => setEditingItem({...editingItem, name: e.target.value})}
                                className="w-full border rounded-lg p-2 mt-1"
                                placeholder="e.g. Rice"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Brand</label>
                                <input 
                                    required
                                    value={editingItem.brand || ''} 
                                    onChange={e => setEditingItem({...editingItem, brand: e.target.value})}
                                    className="w-full border rounded-lg p-2 mt-1"
                                    placeholder="e.g. India Gate"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Pack Size</label>
                                <input 
                                    required
                                    value={editingItem.packSize || ''} 
                                    onChange={e => setEditingItem({...editingItem, packSize: e.target.value})}
                                    className="w-full border rounded-lg p-2 mt-1"
                                    placeholder="e.g. 5 kg"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                            <input 
                                required
                                type="number"
                                min="0"
                                value={editingItem.price || ''} 
                                onChange={e => setEditingItem({...editingItem, price: parseInt(e.target.value)})}
                                className="w-full border rounded-lg p-2 mt-1"
                            />
                        </div>
                        <div className="flex gap-3 pt-4">
                            <button type="button" onClick={() => setEditingItem(null)} className="flex-1 py-2 border rounded-lg hover:bg-gray-50 text-gray-900">Cancel</button>
                            <button type="submit" className="flex-1 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </div>
  );
};

export default AdminPanel;
