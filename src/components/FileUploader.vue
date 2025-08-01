<template>
  <div class="file-uploader mb-16">
    <div class="max-w-4xl mx-auto">
      <!-- Section header -->
      <div class="text-center mb-16">
        <div
          class="inline-flex items-center gap-2 mb-6 px-5 py-3 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 rounded-full text-sm font-semibold border border-violet-200/50 shadow-sm"
        >
          <span
            class="w-7 h-7 bg-gradient-to-br from-violet-600 to-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg"
            >1</span
          >
          Upload Image
        </div>
        <h2 class="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Select Your Image</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
          Upload any image and we'll automatically generate perfect crops for all major social media
          platforms
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-12 items-center">
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
              class="relative p-12 border-2 border-dashed border-gray-300 rounded-3xl bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-500 group-hover:border-violet-400 group-hover:shadow-2xl group-hover:shadow-violet-500/10 cursor-pointer"
            >
              <!-- Upload icon -->
              <div class="text-center">
                <div
                  class="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-violet-500/25"
                >
                  <svg
                    class="w-10 h-10 text-white"
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
                  class="text-2xl font-bold text-gray-900 mb-3 group-hover:text-violet-700 transition-colors duration-300"
                >
                  Drop your image here
                </h3>
                <p class="text-lg text-gray-600 mb-6 font-medium">or click to browse files</p>

                <!-- Supported formats -->
                <div class="flex justify-center gap-3 mb-6">
                  <span class="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-xl text-sm font-semibold border border-gray-200"
                    >JPG</span
                  >
                  <span class="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-xl text-sm font-semibold border border-gray-200"
                    >PNG</span
                  >
                  <span class="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-xl text-sm font-semibold border border-gray-200"
                    >WEBP</span
                  >
                </div>

                <p class="text-base text-gray-500 font-medium">Maximum file size: 10MB</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Features -->
        <div class="order-1 md:order-2 space-y-8">
          <div class="flex items-start gap-5">
            <div
              class="w-14 h-14 bg-gradient-to-br from-violet-100 to-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg border border-violet-200/50"
            >
              <svg
                class="w-7 h-7 text-violet-600"
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
              <h3 class="text-xl font-bold text-gray-900 mb-2">Lightning Fast</h3>
              <p class="text-gray-600 text-base font-medium leading-relaxed">
                Process images in seconds with our optimized cropping engine
              </p>
            </div>
          </div>

          <div class="flex items-start gap-5">
            <div
              class="w-14 h-14 bg-gradient-to-br from-violet-100 to-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg border border-violet-200/50"
            >
              <svg
                class="w-7 h-7 text-violet-600"
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
              <h3 class="text-xl font-bold text-gray-900 mb-2">Perfect Quality</h3>
              <p class="text-gray-600 text-base font-medium leading-relaxed">
                Maintain image quality with smart cropping algorithms
              </p>
            </div>
          </div>

          <div class="flex items-start gap-5">
            <div
              class="w-14 h-14 bg-gradient-to-br from-violet-100 to-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg border border-violet-200/50"
            >
              <svg
                class="w-7 h-7 text-violet-600"
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
              <h3 class="text-xl font-bold text-gray-900 mb-2">Batch Download</h3>
              <p class="text-gray-600 text-base font-medium leading-relaxed">Download all formats at once or individually</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Progress section -->
      <div v-if="isLoading" class="mt-12">
        <div class="max-w-lg mx-auto bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200/50">
          <div class="flex items-center gap-4 mb-6">
            <div
              class="w-10 h-10 border-3 border-violet-200 border-t-violet-600 rounded-full animate-spin"
            ></div>
            <span class="text-lg font-bold text-gray-900">Processing your image...</span>
          </div>

          <!-- Progress bar -->
          <div class="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              class="h-3 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full transition-all duration-500 ease-out shadow-sm"
              :style="{ width: uploadProgress + '%' }"
            ></div>
          </div>

          <div class="flex justify-between text-base">
            <span class="font-semibold text-gray-700">{{ uploadProgress }}% complete</span>
            <span class="font-bold text-violet-600">{{
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
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
