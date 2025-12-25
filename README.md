<div align="center">

# 🛒 Grocery AI Assistant

**An intelligent grocery shopping assistant powered by Google Gemini AI**

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?logo=vite)](https://vitejs.dev/)
[![Gemini AI](https://img.shields.io/badge/Gemini-2.5%20Flash-4285F4?logo=google)](https://ai.google.dev/)

*Shop smarter with AI-powered conversations*

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack)

</div>

---

## 📖 Overview

**Grocery AI Assistant** is a modern, conversational grocery shopping application that leverages Google's Gemini AI to provide an intuitive shopping experience. Users can interact with the AI assistant through text or voice to browse, add items to cart, and complete purchases seamlessly.

### ✨ Key Highlights

- 🤖 **AI-Powered Conversations** - Natural language processing for intuitive shopping
- 🎤 **Voice Mode** - Hands-free shopping with voice commands
- 🛍️ **Smart Cart Management** - Intelligent product matching and cart operations
- 👨‍💼 **Admin Panel** - Manage inventory and control bot status
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- ⚡ **Real-time Updates** - Streaming responses for instant feedback

---

## 🎯 Features

### 🗣️ Conversational Shopping
- Natural language product search and ordering
- Smart product matching with brand and size clarification
- Context-aware recommendations
- Multi-item batch processing

### 🎤 Voice Assistant
- Voice-activated shopping mode
- Hands-free cart management
- Voice-guided checkout process
- Real-time speech recognition

### 🛒 Cart Management
- Add/remove items with ease
- Quantity calculations for different pack sizes
- Real-time cart updates
- Visual cart drawer with item details

### 👨‍💼 Admin Features
- Inventory management system
- Product catalog with 500+ items
- Bot online/offline control
- Dynamic inventory updates

### 🎨 User Experience
- Modern, clean interface
- Typing indicators for better UX
- Smooth animations and transitions
- Mobile-responsive design

---

## 🚀 Demo

### Screenshots

<div align="center">

**Chat Interface**
```
┌─────────────────────────────────────┐
│  🛒 Grocery AI          [🛍️] [🎤]  │
├─────────────────────────────────────┤
│                                     │
│  👤 I need 5kg rice                 │
│                                     │
│  🤖 Which brand? We have:           │
│     • India Gate                    │
│     • Daawat                        │
│     • Fortune                      │
│                                     │
│  👤 India Gate                      │
│                                     │
│  🤖 Added 5kg India Gate Rice      │
│     to cart!                        │
│                                     │
└─────────────────────────────────────┘
```

</div>

### Try It Out

1. **Text Mode**: Type your grocery requests naturally
2. **Voice Mode**: Click the microphone icon for voice shopping
3. **Cart**: View and manage items in the cart drawer
4. **Checkout**: Complete your order with delivery details

---

## 🛠️ Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Google Gemini API Key** ([Get one here](https://ai.google.dev/))

### Step-by-Step Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/grocery-ai-assistant.git
   cd grocery-ai-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000`

---

## 📚 Usage

### Basic Shopping Flow

1. **Start a conversation**
   - The AI greets you when you open the app
   - Type your grocery needs naturally

2. **Add items to cart**
   ```
   User: "I need 2kg atta and 1 liter oil"
   AI: "Which brand of atta? We have Aashirvaad, Pillsbury..."
   User: "Aashirvaad"
   AI: "Added 2kg Aashirvaad Atta to cart!"
   ```

3. **Manage your cart**
   - Click the cart icon to view items
   - Remove items or adjust quantities
   - Proceed to checkout

4. **Complete checkout**
   - Review your order
   - Enter delivery address
   - Place order

### Voice Mode

1. Click the **microphone icon** 🎤
2. Allow microphone permissions
3. Speak your grocery requests
4. The AI will process and respond via voice

### Admin Panel

1. Click the **admin icon** in the header
2. Manage inventory items
3. Toggle bot online/offline status
4. Update product details

---

## 🏗️ Tech Stack

### Frontend
- **React 19.2.0** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling (via inline classes)

### AI & Backend
- **Google Gemini 2.5 Flash** - AI conversation engine
- **@google/genai** - Gemini API client

### Features
- **Function Calling** - AI tool integration
- **Streaming Responses** - Real-time text generation
- **Voice Recognition** - Web Speech API
- **State Management** - React Hooks

---

## 📁 Project Structure

```
grocery-ai-assistant/
├── components/          # React components
│   ├── AdminPanel.tsx
│   ├── CartDrawer.tsx
│   ├── ChatInput.tsx
│   ├── ChatMessage.tsx
│   ├── CheckoutModal.tsx
│   ├── TypingIndicator.tsx
│   └── VoiceAgentModal.tsx
├── services/           # API services
│   └── geminiService.ts
├── utils/              # Utility functions
│   └── audioUtils.ts
├── constants.ts        # App constants & inventory
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main application component
├── index.tsx           # Entry point
├── vite.config.ts      # Vite configuration
└── package.json        # Dependencies
```

### Key Files

- **`App.tsx`** - Main application logic and state management
- **`constants.ts`** - Inventory data and system instructions
- **`services/geminiService.ts`** - Gemini AI integration
- **`components/`** - Reusable UI components

---

## 🎨 Features in Detail

### 🤖 AI Capabilities

- **Smart Product Matching**: Understands variations in product names
- **Brand & Size Clarification**: Asks for specifics when needed
- **Quantity Calculations**: Handles pack size conversions automatically
- **Context Awareness**: Remembers conversation context
- **Recommendations**: Suggests complementary products

### 🛍️ Inventory Management

- **500+ Products**: Comprehensive grocery catalog
- **Categories**: Staples, Dairy, Snacks, Personal Care, etc.
- **Dynamic Updates**: Admin can modify inventory in real-time
- **Price Management**: Automatic price generation

### 🎤 Voice Features

- **Speech Recognition**: Browser-based voice input
- **Text-to-Speech**: AI responses via voice
- **Hands-free Shopping**: Complete shopping without typing
- **Voice Checkout**: Order placement via voice commands

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Your Google Gemini API key | Yes |

### Build Commands

```bash
# Development
npm run dev          # Start dev server on port 3000

# Production
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## 🚀 Deployment

### Netlify (Recommended)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variable: `GEMINI_API_KEY`

3. **Configure redirects**
   - The `_redirects` file is already included for SPA routing

### Other Platforms

- **Vercel**: Similar to Netlify setup
- **GitHub Pages**: Requires additional configuration
- **AWS S3 + CloudFront**: For enterprise deployments

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow TypeScript best practices
- Maintain code style consistency
- Add comments for complex logic
- Update documentation as needed
- Test your changes thoroughly

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful conversational AI
- **React Team** for the amazing framework
- **Vite** for the lightning-fast build tool
- All contributors and users of this project

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/grocery-ai-assistant/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/grocery-ai-assistant/discussions)
- **Email**: support@example.com

---

<div align="center">

**Made with ❤️ using React, TypeScript, and Gemini AI**

⭐ Star this repo if you find it helpful!

[⬆ Back to Top](#-grocery-ai-assistant)

</div>
