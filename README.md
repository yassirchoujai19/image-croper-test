# 📸 Smart Image Cropper

A modern Vue 3 application that allows users to upload images, generate social media-specific previews with smart cropping, and download optimized formats—all with a responsive and elegant UI.

## 🚀 Tech Stack

- **Framework**: Vue 3 + Composition API
- **Build Tool**: Vite
- **Styling**:  CSS custom properties
- **Image Handling**: Uploadcare (file uploads & transformations)
- **State Management**: Vue's native reactivity system
- **Language**: TypeScript

---

## ✨ Features

### 1. 🔼 Image Upload System
- **Upload Interface** powered by [Uploadcare](https://uploadcare.com/)
- Supports multiple image formats: `JPEG`, `PNG`, `WebP`
- Responsive preview gallery with real-time upload progress
- Theme-aware design

### 2. 🖼️ Social Media Preview Generator
- Smart cropping for major platforms:
  - Instagram
  - Facebook
  - Twitter (X)
  - LinkedIn
- Auto aspect ratio detection and cropping
- Platform-branded previews with respective colors
- Individual and bulk image downloads

### 3. 📦 Component-Based Architecture
- `FileUploader.vue`: Handles file uploads with progress UI
- `SocialMediaPreviews.vue`: Displays generated platform previews in a responsive grid
- Fully responsive layout and smooth UX on both mobile and desktop

### 4. ⚙️ Advanced Composition API Usage
- Uses `<script setup>` and custom composables
- Created a `useImageProcessor` composable for handling smart cropping and format transformation

---

## 🧠 Technical Highlights

- **Smart Cropping**: Leverages Uploadcare's AI cropping suggestions
- **Optimized Formats**: Automatically delivers best-suited formats for each platform
- **Download Logic**: Users can download images individually or all at once
- **Type Safety**: Full TypeScript integration for maintainability and scalability

---

## 📂 Project Structure
src/
├── assets/
   └── sizes.json
├── components/
│ ├── FileUploader.vue
│ └── SocialMediaPreviews.vue
├── composables/
│ └── useImageProcessor.ts
└── App.vue


---

## 🔧 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/smart-image-cropper.git
cd smart-image-cropper

# Install dependencies
npm install

# Add Uploadcare
npm install @uploadcare/file-uploader

# Run the dev server
npm run dev

🧪 Known Limitations
Currently uses Uploadcare's free-tier which may have usage limits

No authentication or user persistence

Limited to a few predefined platforms (easily extendable)

🌱 Future Enhancements
Add drag-and-drop file upload

Integrate user login for saving cropping history

Enable live editing for crop dimensions before generating previews

Support for video formats

🧭 Architectural Decisions
Why Uploadcare? Rapid integration with smart crop, CDN delivery, and file optimizations built-in.

Why SCSS? Custom properties + SCSS variables enabled theme flexibility and dynamic styling.

Why Composition API? Clean separation of concerns and reusable logic via composables like useImageProcessor.

💬 Final Thoughts
This project showcases a modern approach to Vue 3 development—leveraging composition patterns, reactive design, and professional-grade third-party services. It’s not just about image cropping, but delivering a polished and extensible frontend architecture.

👑 Author
Built with 💚 by Yassir Choujai — aspiring frontend engineer & creative problem solver.

Want to chat about the code or give feedback? I'm always open to discussions!
