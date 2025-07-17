# 🌱 Crop Game

A fun and engaging farming simulation game built with Next.js and React. Plant, grow, and harvest crops while managing your resources to build a successful farm!

## 🎮 Game Features

### 🌾 Core Gameplay

- **Plant & Grow**: Plant tulip and daisy seeds in a 4x4 grid of fields
- **Real-time Growth**: Watch your crops grow through 5 stages (Seeding → Little Plant → Middle Plant → Flower → Dried)
- **Harvest System**: Collect flowers at the perfect time to maximize profits
- **Resource Management**: Manage your coin balance and seed inventory

### 🌺 Crop Types

- **🌷 Tulips**: Cost 10 coins, reward 20 coins when harvested
- **🌼 Daisies**: Cost 20 coins, reward 30 coins when harvested (higher risk, higher reward)

### 🏪 Game Systems

- **Store**: Buy seeds individually or in bulk with quantity controls
- **Authentication**: Simple sign-up/sign-in system with local storage
- **Balance System**: Start with 100 coins and grow your wealth
- **Inventory Management**: Track your seed counts and spending

## 🛠️ Technical Stack

- **Framework**: Next.js 15.3.5 with App Router
- **Language**: TypeScript
- **Styling**: CSS Modules with custom animations
- **State Management**: React Context API
- **UI Components**: Custom reusable components
- **Build Tool**: Turbopack for fast development

## 📁 Project Structure

```
src/
├── app/                   # Next.js App Router pages
│   ├── game/              # Main game interface
│   ├── store/             # Seed purchasing interface
│   ├── signin/            # User authentication
│   ├── signup/            # User registration
│   └── layout.tsx         # Root layout with providers
├── components/            # Reusable UI components
│   ├── button/            # Custom button component
│   ├── field/             # Interactive game field
│   └── input-box/         # Form input component
└── context/               # React Context providers
    ├── BalanceContext.tsx # Coin balance management
    └── SeedContext.tsx    # Seed inventory & actions
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/tanercelikkiran/crop-game.git
   cd crop-game
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server with Turbopack

## 🎯 How to Play

1. **Sign Up/Sign In**: Create an account or sign in to start playing
2. **Visit the Store**: Buy tulip or daisy seeds with your starting 100 coins
3. **Plant Seeds**: Go to the game area and select which crop to plant
4. **Watch Growth**: Seeds automatically grow through 5 stages over time
5. **Harvest**: Click on fully grown flowers (stage 4) to collect them for coins
6. **Manage Resources**: Balance spending on seeds with harvesting profits
7. **Expand**: Use profits to buy more seeds and grow your farming operation

## 🎨 Game Mechanics

### Growth Timeline

- **Stage 1**: Seeding (planted)
- **Stage 2**: Little Plant (after 2 seconds)
- **Stage 3**: Middle Plant (after 4 seconds)
- **Stage 4**: Flower (after 6 seconds) - **Harvest Time!**
- **Stage 5**: Dried Flower (after 10 seconds) - No value

### Economic System

- Starting balance: 100 coins
- Tulip seeds: 10 coins → 20 coins profit
- Daisy seeds: 20 coins → 30 coins profit

## 🎨 Visual Design

The game features a beautiful, modern design with:

- Gradient backgrounds and smooth animations
- Responsive CSS Grid layout for the farming fields
- Interactive hover effects and transitions
- Custom button components with emoji icons

## 🔧 Technical Features

- **React Context**: Centralized state management for balance and seeds
- **TypeScript**: Type-safe development with interfaces and props
- **CSS Modules**: Scoped styling with custom animations
- **Local Storage**: Persistent user data for authentication

## 🙏 Acknowledgments

- Built with Next.js and React
- Icons and emojis for enhanced user experience
- Modern CSS techniques for smooth animations
- Responsive design principles
