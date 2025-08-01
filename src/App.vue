<template>
  <div class="crop-master-app">
    <!-- Geometric background -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 left-0 w-full h-full">
        <svg class="w-full h-full opacity-5" viewBox="0 0 100 100" fill="none">
          <defs>
            <pattern id="hexagons" width="20" height="20" patternUnits="userSpaceOnUse">
              <polygon
                points="10,2 18,7 18,13 10,18 2,13 2,7"
                fill="none"
                stroke="currentColor"
                stroke-width="0.5"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#hexagons)" />
        </svg>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="relative z-10 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-3">
            <div
              class="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-white"
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
              <h1 class="text-xl font-bold text-gray-900">CropMaster Pro</h1>
              <p class="text-xs text-gray-500">Professional Image Cropping</p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <span class="px-3 py-1 bg-violet-100 text-violet-700 text-sm font-medium rounded-full">
              Beta v2.0
            </span>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative py-20 bg-gradient-to-br from-gray-50 via-white to-violet-50">
      <div class="max-w-4xl mx-auto text-center px-4">
        <div
          class="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-semibold"
        >
          <div class="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></div>
          Professional Grade
        </div>

        <h1 class="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          Precision Image
          <span
            class="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"
          >
            Cropping
          </span>
        </h1>

        <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
          Transform your images into pixel-perfect crops for every social media platform with our
          advanced cropping engine
        </p>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <div class="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div class="text-2xl font-bold text-violet-600">50+</div>
            <div class="text-sm text-gray-600">Formats</div>
          </div>
          <div class="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div class="text-2xl font-bold text-violet-600">4K</div>
            <div class="text-sm text-gray-600">Quality</div>
          </div>
          <div class="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div class="text-2xl font-bold text-violet-600">1-Click</div>
            <div class="text-sm text-gray-600">Download</div>
          </div>
          <div class="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div class="text-2xl font-bold text-violet-600">Free</div>
            <div class="text-sm text-gray-600">Forever</div>
          </div>
        </div>
      </div>
    </section>

    <main class="relative max-w-7xl mx-auto px-4 py-12">
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
    <footer class="relative mt-20 py-12 bg-gray-900 text-white">
      <div class="max-w-4xl mx-auto px-6 text-center">
        <div class="flex justify-center items-center gap-3 mb-6">
          <div
            class="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-white"
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
            <h3 class="text-xl font-bold">CropMaster Pro</h3>
            <p class="text-gray-400 text-sm">Professional Image Cropping</p>
          </div>
        </div>
        <p class="text-gray-400 mb-6">
          Built with precision and care for content creators worldwide
        </p>
        <div class="text-sm text-gray-500">
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
  background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
  font-family: 'Inter', sans-serif;
  color: #1f2937;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #8b5cf6, #7c3aed);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #7c3aed, #6d28d9);
}
</style>
