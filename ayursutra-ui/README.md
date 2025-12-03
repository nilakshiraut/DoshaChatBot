# AyurSutra UI - React.js Chatbot Interface

A pixel-perfect React.js chatbot interface that connects to the AyurSutra backend for complete dosha assessment and therapy recommendations.

## 🌿 Features

- **Real-time Chat**: WebSocket connection to AyurSutra backend
- **10-Question Assessment**: Complete dosha classification flow
- **ML-Powered Results**: Visual dosha percentages and therapy recommendations
- **Pixel-Perfect Design**: AyurSutra color palette with smooth animations
- **Responsive**: Works on all devices
- **Typing Indicators**: Real-time bot feedback
- **Progress Tracking**: Visual assessment progress

## 🛠️ Tech Stack

- **React.js** 18 with Hooks
- **Vite** for fast development
- **WebSocket** for real-time communication
- **CSS3** with AyurSutra color palette
- **Modern JavaScript** (ES6+)

## 📁 Project Structure

```
ayursutra-ui/
├── src/
│   ├── components/
│   │   ├── Chatbot.jsx          # Main chat interface with WebSocket
│   │   ├── ChatResult.jsx       # Dosha results with therapy grid
│   │   ├── TherapyCard.jsx      # Individual therapy cards
│   │   └── MessageBubble.jsx    # Chat message bubbles
│   ├── data/
│   │   └── therapies.js         # Therapy data structure
│   ├── styles/
│   │   └── chatbot.css          # Complete styling
│   ├── App.jsx                  # Main React app
│   └── main.jsx                 # React entry point
├── package.json
├── vite.config.js
└── index.html
```

## 🚀 Running the Application

### Prerequisites
- Node.js 16 or higher
- AyurSutra backend running on `http://127.0.0.1:8000`

### Installation

```bash
cd ayursutra-ui
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 🔗 Backend Integration

This UI connects to the AyurSutra backend via:

**WebSocket**: `ws://127.0.0.1:8000/ws/chat`
- Real-time chat messages
- Assessment question flow
- Results delivery

**Data Flow**:
1. User starts assessment
2. Bot asks 10 questions sequentially
3. ML model classifies dosha percentages
4. Results displayed with therapy recommendations
5. Smooth animations and typing indicators

## 🎨 AyurSutra Color Palette

- **Dark Green**: #0B5A42
- **Soft Green Card**: #E3F0EC
- **Mint Background**: #CBE4DD
- **White**: #FFFFFF
- **Border Gray**: #DCE8E3

## 📱 Features in Detail

### Assessment Flow
1. **Welcome Message**: Bot introduces itself
2. **Question Sequence**: 10 questions about physical/mental traits
3. **Progress Tracking**: Visual progress bar
4. **ML Classification**: Dosha percentages calculated
5. **Results Display**: Circular charts + therapy grid

### Therapy Recommendations
- **2-Column Grid**: Responsive card layout
- **Soft Green Cards**: #E3F0EC background
- **20px Rounded Corners**: As specified
- **Dynamic Content**: From backend ML recommendations

### Real-time Features
- **Typing Indicators**: Animated dots when bot is thinking
- **WebSocket Connection**: Persistent real-time communication
- **Message History**: Complete conversation tracking
- **Smooth Animations**: Fade-in effects for results

## 🐛 Troubleshooting

### Connection Issues
- Ensure backend is running on port 8000
- Check WebSocket connection in browser console
- Verify CORS settings in backend

### Styling Issues
- Clear browser cache
- Check CSS variables are loaded
- Verify AyurSutra color palette is applied

## 📝 Notes

- This is a **frontend-only** React.js application
- Requires the AyurSutra backend to function
- All ML processing happens on the backend
- UI is pixel-perfect to specifications

---

**Namaste! 🌿** Ready to discover your Ayurvedic profile.</contents>
</xai:function_call">Writing file ayursutra-ui/README.md