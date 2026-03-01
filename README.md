# AI Background Remover 

![AI Background Remover](https://img.shields.io/badge/AI%20Powered-Yes-blueviolet?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)

A powerful, client-side AI tool that instantly removes image backgrounds securely in your browser. Built with **Next.js 15**, **React 19**, and **@imgly/background-removal**.

## 🌐 Live Demo

Check out the live demo here: [https://removerai.netlify.app/](https://removerai.netlify.app/)

## ✨ Features

- **🚀 Instant AI Processing**: Remove backgrounds in seconds using advanced machine learning models running directly in your browser.
- **🔒 100% Privacy**: No images are uploaded to any server. All processing happens locally on your device.
- **🖱️ Drag & Drop**: Intuitive interface with drag-and-drop support for quick image uploads.
- **📱 Fully Responsive**: Optimized for all devices (Mobile, Tablet, Desktop) with a modern, glassmorphism UI.
- **📥 High-Quality Download**: Download your processed images in full resolution with transparent backgrounds (PNG).
- **🌗 Modern Design**: Features a sleek dark mode aesthetic with smooth animations and transitions.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Engine**: [@imgly/background-removal](https://img.ly/docs/cesdk/web/guides/background-removal/) (WASM)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animation**: CSS Keyframes & Transitions

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.17.0 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/ai-bg-remover.git
    cd ai-bg-remover
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

4.  **Open your browser:**

    Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## 📂 Project Structure

```bash
ai-bg-remover/
├── app/                  # Next.js App Router directory
│   ├── favicon.ico       # App icon
│   ├── globals.css       # Global styles (Tailwind layers)
│   ├── layout.js         # Root layout with metadata & navbar
│   └── page.js           # Home page component
├── components/           # Reusable UI components
│   ├── BgRemover.jsx     # Core background removal logic & UI
│   └── Navbar.jsx        # Navigation bar component
├── public/               # Static assets
└── package.json          # Project dependencies and scripts
```

## 🤝 Contributing

Contributions are always welcome! If you'd like to improve this project, please format your code and open a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgements

- Thanks to the [IMG.LY Team](https://img.ly/) for their incredible open-source background removal library.
- Icons provided by [Lucide](https://lucide.dev/).

## ✨ Author

**Amit Kumar Patra**

- [GitHub](https://github.com/AmitKumarPatra99)
- [LinkedIn](https://www.linkedin.com/in/amit-kumar-patra-A92503190/)

