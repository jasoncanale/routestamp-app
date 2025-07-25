# 🌍 RouteStamp - Country Tracker

A beautiful and intuitive Progressive Web App (PWA) for tracking your travel journey across the world. Built with Next.js, Shadcn UI, and modern web technologies.

![RouteStamp App](https://img.shields.io/badge/RouteStamp-Country%20Tracker-green?style=for-the-badge&logo=globe)
![Next.js](https://img.shields.io/badge/Next.js-15.4.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![PWA](https://img.shields.io/badge/PWA-Ready-green?style=for-the-badge&logo=pwa)

## ✨ Features

### 🗺️ **Country Management**
- **Track Visited Countries** - Mark countries you've explored
- **Wishlist Countries** - Plan your future adventures
- **Home Countries** - Mark places you've lived or currently live
- **Country Details** - Store visit dates, ratings, cities, and notes
- **Auto-fill** - Automatic country code and flag detection

### 📊 **Statistics & Analytics**
- **Dashboard Overview** - Quick stats and recent activity
- **Detailed Analytics** - Visual charts and insights
- **Region Breakdown** - Track progress by continent
- **Visit History** - Timeline of your travels

### ✈️ **Trip Planning**
- **Upcoming Trips** - Plan and track future journeys
- **Countdown Timer** - Days until your next adventure
- **Trip Details** - Store destination, dates, and notes

### ⚙️ **Settings & Customization**
- **Theme Support** - Light, Dark, and System themes
- **Currency Selection** - Global currency support with system detection
- **Data Management** - Export/Import your travel data
- **Notifications** - Stay updated with travel reminders

### 🔄 **Advanced Features**
- **History Tracking** - Undo/redo functionality for all changes
- **Keyboard Shortcuts** - Quick actions with Ctrl+Z/Y
- **Offline Support** - Works without internet connection
- **PWA Ready** - Install as a native app on mobile devices

## 🚀 Live Demo

**🌐 Web App:** [https://jasoncanale.github.io/routestamp-app/](https://jasoncanale.github.io/routestamp-app/)

**📱 PWA:** Install directly from your browser or use PWABuilder to generate an APK

## 🛠️ Tech Stack

- **Framework:** Next.js 15.4.3
- **Language:** TypeScript
- **UI Library:** Shadcn UI + Radix UI
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **Theming:** next-themes
- **Icons:** Lucide React + Flag Icons
- **PWA:** next-pwa
- **Deployment:** GitHub Pages

## 📱 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/jasoncanale/routestamp-app.git
   cd routestamp-app
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

### Building for Production

```bash
# Build the app
npm run build

# Start production server
npm start
```

## 📦 PWA Features

### Install as App
- **Chrome/Edge:** Click the install icon in the address bar
- **Safari:** Add to Home Screen from Share menu
- **Android:** Install prompt will appear automatically

### Generate APK
1. Visit [PWABuilder](https://www.pwabuilder.com/)
2. Enter: `https://jasoncanale.github.io/routestamp-app/`
3. Click "Build My PWA"
4. Download the APK file

## 🎨 Customization

### Themes
The app supports three themes:
- **Light** - Clean, bright interface
- **Dark** - Easy on the eyes
- **System** - Follows your OS preference

### Currency
- **System Default** - Automatically detects your local currency
- **Manual Selection** - Choose from 150+ global currencies

## 📊 Data Management

### Export Data
- Navigate to Settings → Data Management
- Click "Export Data"
- Download your travel data as JSON

### Import Data
- Navigate to Settings → Data Management
- Click "Import Data"
- Select your JSON file
- Confirm the import

### Data Storage
- **Local Storage** - Data persists in your browser
- **Offline Support** - Works without internet
- **Privacy First** - Your data stays on your device

## 🎯 Usage Guide

### Adding Countries
1. Go to the **Countries** page
2. Click **"Add Country"**
3. Type the country name (auto-fill available)
4. Select status: Visited, Wishlist, or Home
5. Add details like visit date, rating, cities
6. Click **"Save"**

### Managing Trips
1. Go to the **Trips** page
2. Click **"Add Trip"**
3. Enter destination, dates, and notes
4. View countdown to your next trip

### Using Statistics
1. Visit the **Stats** page
2. View your travel progress
3. See breakdowns by region
4. Track your journey timeline

## 🔧 Development

### Project Structure
```
routestamp/
├── src/
│   ├── app/                 # Next.js app router pages
│   ├── components/          # React components
│   │   ├── ui/             # Shadcn UI components
│   │   └── ...             # Custom components
│   ├── lib/                # Utilities and contexts
│   └── hooks/              # Custom React hooks
├── public/                 # Static assets
└── out/                    # Static export (for deployment)
```

### Key Components
- **`CountryProvider`** - Manages country data and history
- **`CurrencyProvider`** - Handles currency selection
- **`TripsProvider`** - Manages trip data
- **`ThemeProvider`** - Theme management

### Adding New Features
1. Create components in `src/components/`
2. Add pages in `src/app/`
3. Update types in `src/lib/types.ts`
4. Test thoroughly before committing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Shadcn UI** - Beautiful component library
- **Flag Icons** - Country flag icons
- **Next.js** - Amazing React framework
- **Tailwind CSS** - Utility-first CSS framework

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/jasoncanale/routestamp-app/issues)
- **Discussions:** [GitHub Discussions](https://github.com/jasoncanale/routestamp-app/discussions)

---

**Made with ❤️ for travelers around the world**

*Travel. Track. Remember.* 🌍✈️
