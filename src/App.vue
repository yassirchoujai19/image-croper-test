<template>
  <div class="crop-master-app">
    <!-- Modern gradient background -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-violet-50/30"></div>
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
    </div>

    <!-- Navigation -->
    <nav class="relative z-10 bg-white/90 backdrop-blur-xl border-b border-gray-200/60 sticky top-0">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <div class="flex items-center space-x-3">
            <div
              class="w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/25"
            >
              <svg
                class="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">CropMaster Pro</h1>
              <p class="text-sm text-gray-600 font-medium">Professional Image Cropping</p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <span class="px-4 py-2 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 text-sm font-semibold rounded-full border border-violet-200/50">
              Beta v2.0
            </span>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative py-24 overflow-hidden">
      <div class="max-w-4xl mx-auto text-center px-4">
        <div
          class="inline-flex items-center gap-2 mb-8 px-5 py-3 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 rounded-full text-sm font-semibold border border-violet-200/50 shadow-sm"
        >
          <div class="w-2.5 h-2.5 bg-violet-500 rounded-full animate-pulse"></div>
          Professional Grade
        </div>

        <h1 class="text-6xl md:text-7xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
          Precision Image
          <span
            class="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
          >
            Cropping
          </span>
        </h1>

        <p class="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
          Transform your images into pixel-perfect crops for every social media platform with our
          advanced cropping engine
        </p>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          <div class="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div class="text-3xl font-black text-violet-600 mb-2">50+</div>
            <div class="text-sm font-semibold text-gray-700">Formats</div>
          </div>
          <div class="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div class="text-3xl font-black text-violet-600 mb-2">4K</div>
            <div class="text-sm font-semibold text-gray-700">Quality</div>
          </div>
          <div class="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div class="text-3xl font-black text-violet-600 mb-2">1-Click</div>
            <div class="text-sm font-semibold text-gray-700">Download</div>
          </div>
          <div class="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div class="text-3xl font-black text-violet-600 mb-2">Free</div>
            <div class="text-sm font-semibold text-gray-700">Forever</div>
          </div>
        </div>
      </div>
    </section>

    <main class="relative max-w-7xl mx-auto px-4 py-16">
      <FileUploader
        @file-uploaded="handleFileUpload"
        :isLoading="isLoading"
        :uploadProgress="uploadProgress"
      />

      <SocialMediaPreviews
        v-if="uploadedImage || error"
        :images="processedImages"
        :error="error"
        @download-image="downloadImage"
        @download-all="downloadAll"
      />
    </main>

    <!-- Footer -->
    <footer class="relative mt-24 py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div class="max-w-4xl mx-auto px-6 text-center">
        <div class="flex justify-center items-center gap-3 mb-6">
          <div
            class="w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/25"
          >
            <svg
              class="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <h3 class="text-2xl font-bold">CropMaster Pro</h3>
            <p class="text-gray-400 text-base font-medium">Professional Image Cropping</p>
          </div>
        </div>
        <p class="text-gray-300 mb-8 text-lg">
          Built with precision and care for content creators worldwide
        </p>
        <div class="text-base text-gray-400 font-medium">
          © 2024 CropMaster Pro. Powered by Vue.js & TypeScript.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useImageProcessor } from './composables/useImageProcessor'
import FileUploader from './components/FileUploader.vue'
import SocialMediaPreviews from './components/SocialMediaPreviews.vue'

const {
  uploadedImage,
  processedImages,
  isLoading,
  uploadProgress,
  error,
  handleFileUpload,
  downloadImage,
  downloadAll,
} = useImageProcessor()
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

.crop-master-app {
  min-height: 100vh;
  background: #ffffff;
  font-family: 'Inter', sans-serif;
  color: #1f2937;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #7c3aed, #6d28d9);
}
</style>
