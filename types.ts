
export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  brand: string;
  packSize: string;
  unit: string; // e.g., 'kg', 'l', 'pack'
  quantityValue: number; // e.g., 5 for 5kg
  price: number;
}

export interface CartItem extends InventoryItem {
  quantity: number; // Number of packs in cart
  cartId: string; // Unique ID for the cart entry
}

export interface Message {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: number;
  isError?: boolean;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
}

export type FunctionCallHandler = (
  functionName: string,
  args: Record<string, any>
) => Promise<{ result: any }>;

export interface AppConfig {
    isBotOnline: boolean;
    systemInstruction: string;
}
