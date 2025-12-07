# 🌤️ AI Weather App

This is a cinematic and interactive weather application that provides real-time weather insights with AI-powered summaries. It includes location-based weather search, dynamic animated backgrounds, live temperature and wind stats, and AI-generated weather guidance — all inside a modern, responsive UI.

---

## 📁 Project Structure

```
AI-Weather-App/
│
├── public/
│   └── icons/                 # Weather icons and static assets
│
├── src/
│   ├── components/            # Reusable React UI components
│   ├── pages/                 # Page-level UI
│   ├── hooks/                 # Custom hooks (weather, theme, auth, etc.)
│   ├── services/              # API and Supabase utilities
│   └── App.tsx                # Main app entry
│
├── supabase/                  # Supabase auth and DB config
├── .env                       # Environment variables (API keys)
├── README.md                  # This file
├── index.html                 # Base HTML template
├── package.json               # App dependencies
└── vite.config.ts             # Vite configuration
```

---

## 🧪 Features

- 🌤 **Live weather updates** using Weather API  
- 📍 **City-based weather search**  
- 🎬 **Cinematic, dynamic background themes (Day/Night/Cloud/Rain)**  
- 🤖 **AI-generated weather tips and summaries**  
- 🔐 **Supabase Authentication (Login & Signup)**  
- 🌧 **Weather visuals and animations**  
- 📱 **Fully responsive UI**  
- ⚡ **Fast Vite + React + Tailwind stack**

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/AI-Weather-App.git
cd AI-Weather-App
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Add API Keys (Important)

Create a **`.env`** file in the root and add:

```
VITE_WEATHER_API_KEY=your_weather_api_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> Rename keys based on your project.

### 4️⃣ Run the App

```bash
npm run dev
```

Then open the URL (usually `http://localhost:5173`) in your browser.

---


## ✅ Requirements

- Node.js (Latest LTS Recommended)
- Vite
- React + TypeScript
- Tailwind CSS
- Supabase
- Weather API (OpenWeather / others)

---

## 📌 Notes

- Make sure your **`.env` file is not committed** to GitHub  
- Confirm the **weather API endpoint and Supabase URL** are correct  
- Supports **only live weather for now** — can be improved for forecasts

---

## 📄 License

This project is licensed under the **MIT License** — you may use, modify, and distribute it with attribution.

---

## 🙌 Acknowledgements

- 🌤 Weather API — for real-time weather data  
- Supabase — for backend, auth, and data storage  
- React + Vite — for the frontend framework  
- Tailwind — for styling

---

> Built with 💙 using **React, Tailwind, Supabase and AI**

