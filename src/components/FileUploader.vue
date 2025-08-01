<template>
  <div class="file-uploader mb-16">
    <div class="max-w-4xl mx-auto">
      <!-- Section header -->
      <div class="text-center mb-12">
        <div
          class="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-semibold"
        >
          <span
            class="w-6 h-6 bg-violet-600 text-white rounded-full flex items-center justify-center text-xs font-bold"
            >1</span
          >
          Upload Image
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Select Your Image</h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Upload any image and we'll automatically generate perfect crops for all major social media
          platforms
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8 items-center">
        <!-- Upload Area -->
        <div class="order-2 md:order-1">
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            @change="handleFileSelect"
            class="hidden"
          />

          <div class="upload-zone group relative" @click="triggerFileSelect">
            <div
              class="relative p-8 border-2 border-dashed border-gray-300 rounded-2xl bg-white hover:bg-gray-50 transition-all duration-300 group-hover:border-violet-400 group-hover:shadow-lg cursor-pointer"
            >
              <!-- Upload icon -->
              <div class="text-center">
                <div
                  class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                >
                  <svg
                    class="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v8"
                    />
                  </svg>
                </div>

                <h3
                  class="text-xl font-semibold text-gray-900 mb-2 group-hover:text-violet-700 transition-colors"
                >
                  Drop your image here
                </h3>
                <p class="text-gray-600 mb-4">or click to browse files</p>

                <!-- Supported formats -->
                <div class="flex justify-center gap-2 mb-4">
                  <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
                    >JPG</span
                  >
                  <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
                    >PNG</span
                  >
                  <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
                    >WEBP</span
                  >
                </div>

                <p class="text-sm text-gray-500">Maximum file size: 10MB</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Features -->
        <div class="order-1 md:order-2 space-y-6">
          <div class="flex items-start gap-4">
            <div
              class="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0"
            >
              <svg
                class="w-5 h-5 text-violet-600"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 mb-1">Lightning Fast</h3>
              <p class="text-gray-600 text-sm">
                Process images in seconds with our optimized cropping engine
              </p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div
              class="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0"
            >
              <svg
                class="w-5 h-5 text-violet-600"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 mb-1">Perfect Quality</h3>
              <p class="text-gray-600 text-sm">
                Maintain image quality with smart cropping algorithms
              </p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div
              class="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0"
            >
              <svg
                class="w-5 h-5 text-violet-600"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 mb-1">Batch Download</h3>
              <p class="text-gray-600 text-sm">Download all formats at once or individually</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Progress section -->
      <div v-if="isLoading" class="mt-8">
        <div class="max-w-md mx-auto bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-8 h-8 border-2 border-violet-200 border-t-violet-600 rounded-full animate-spin"
            ></div>
            <span class="font-semibold text-gray-900">Processing your image...</span>
          </div>

          <!-- Progress bar -->
          <div class="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div
              class="h-2 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full transition-all duration-300 ease-out"
              :style="{ width: uploadProgress + '%' }"
            ></div>
          </div>

          <div class="flex justify-between text-sm">
            <span class="text-gray-600">{{ uploadProgress }}% complete</span>
            <span class="font-medium text-violet-600">{{
              getProgressMessage(uploadProgress)
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['file-uploaded'])

const { isLoading, uploadProgress } = defineProps<{
  isLoading: boolean
  uploadProgress: number
}>()

const fileInput = ref<HTMLInputElement | null>(null)

const getProgressMessage = (progress: number) => {
  if (progress < 30) return 'Analyzing image...'
  if (progress < 60) return 'Optimizing quality...'
  if (progress < 90) return 'Generating crops...'
  return 'Almost done!'
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file && file.type.startsWith('image/')) {
    // Create a mock CDN URL for demo purposes
    const mockCdnUrl = `https://ucarecdn.com/demo-${Date.now()}/`
    emit('file-uploaded', mockCdnUrl)
  }
}

const triggerFileSelect = () => {
  fileInput.value?.click()
}
</script>

<style scoped>
.file-uploader {
  font-family: 'Inter', sans-serif;
}

.upload-zone {
  transition: all 0.3s ease;
}
</style>
