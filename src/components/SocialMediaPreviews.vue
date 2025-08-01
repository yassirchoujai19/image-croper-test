<template>
  <div class="social-previews">
    <div class="max-w-7xl mx-auto">
      <!-- Error Message -->
      <div v-if="error" class="mb-16 p-8 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200/60 rounded-3xl shadow-lg">
        <div class="flex items-start gap-5">
          <div
            class="w-16 h-16 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
          >
            <svg
              class="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-bold text-red-900 mb-2">Processing Error</h3>
            <p class="text-red-700 text-base font-medium">{{ error }}</p>
            <button
              class="mt-4 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>

      <!-- Header Section -->
      <div v-if="images.length" class="text-center mb-16">
        <div
          class="inline-flex items-center gap-2 mb-6 px-5 py-3 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 rounded-full text-sm font-semibold border border-violet-200/50 shadow-sm"
        >
          <span
            class="w-7 h-7 bg-gradient-to-br from-violet-600 to-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg"
            >2</span
          >
          Download Results
        </div>

        <h2 class="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Your Cropped Images</h2>

        <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-10 font-medium leading-relaxed">
          {{ images.length }} perfectly cropped images ready for download. Each optimized for its
          specific platform.
        </p>

        <!-- Download All Button -->
        <button
          @click="downloadAll"
          :disabled="downloadingAll"
          class="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg hover:scale-105"
        >
          <div
            v-if="downloadingAll"
            class="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"
          ></div>
          <svg
            v-else
            class="w-6 h-6"
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
          {{ downloadingAll ? 'Downloading All...' : 'Download All Images' }}
        </button>
      </div>

      <!-- Images Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div
          v-for="(image, index) in images"
          :key="image.platform"
          class="image-card group"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <!-- Card -->
          <div
            class="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/60 overflow-hidden hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 hover:border-violet-200"
          >
            <!-- Image container -->
            <div
              class="relative overflow-hidden"
              :class="getImageAspectRatioClass(image.aspectRatio)"
            >
              <img
                :src="image.url"
                :alt="`${image.platform} preview`"
                class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                @load="onImageLoad"
              />

              <!-- Overlay -->
              <div
                class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500"
              ></div>

              <!-- Platform badge -->
              <div
                class="absolute top-4 left-4 px-3 py-2 bg-white/95 backdrop-blur-md rounded-xl text-xs font-bold text-gray-800 shadow-lg border border-gray-200/50"
              >
                {{ getPlatformName(image.platform) }}
              </div>

              <!-- Dimensions badge -->
              <div
                class="absolute top-4 right-4 px-3 py-2 bg-black/80 backdrop-blur-md rounded-xl text-xs font-bold text-white shadow-lg"
              >
                {{ image.aspectRatio }}
              </div>

              <!-- Preview overlay -->
              <div
                class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
              >
                <div class="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-gray-200/50 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    class="w-8 h-8 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Content -->
            <div class="p-6">
              <div class="text-center mb-4">
                <h3 class="text-lg font-bold text-gray-900 mb-2">
                  {{ getPlatformName(image.platform) }}
                </h3>
                <p class="text-sm text-gray-600 font-medium">
                  {{ getFormatDescription(image.platform) }}
                </p>
              </div>

              <!-- Download button -->
              <button
                @click="downloadImage(image.url, image.platform)"
                :disabled="downloadingItem === image.platform"
                class="w-full px-5 py-3 rounded-2xl font-bold text-white transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                :style="{
                  background: `linear-gradient(135deg, ${image.color} 0%, ${image.hoverColor} 100%)`,
                }"
              >
                <div class="flex items-center justify-center gap-3">
                  <div
                    v-if="downloadingItem === image.platform"
                    class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
                  ></div>
                  <svg
                    v-else
                    class="w-5 h-5"
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
                  <span class="text-base">
                    {{ downloadingItem === image.platform ? 'Downloading...' : 'Download' }}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="images.length === 0 && !error" class="text-center py-20">
        <div
          class="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg border border-gray-200/50"
        >
          <svg
            class="w-16 h-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-3">Ready to Process</h3>
        <p class="text-lg text-gray-600 max-w-lg mx-auto font-medium">
          Upload an image above to see your perfectly cropped versions appear here
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { images, error } = defineProps<{
  images: Array<{
    platform: string
    url: string
    aspectRatio: string
    color: string
    hoverColor: string
  }>
  error: string | null
}>()

const emit = defineEmits(['download-image', 'download-all'])

const downloadingAll = ref(false)
const downloadingItem = ref<string | null>(null)

const downloadImage = async (url: string, platform: string) => {
  downloadingItem.value = platform
  await new Promise((resolve) => setTimeout(resolve, 1000))
  emit('download-image', { url, platform })
  downloadingItem.value = null
}

const downloadAll = async () => {
  downloadingAll.value = true
  await new Promise((resolve) => setTimeout(resolve, 1500))
  emit('download-all')
  downloadingAll.value = false
}

const getPlatformName = (fullName: string) => {
  return fullName.split(' - ')[0]
}

const getFormatDescription = (platform: string) => {
  const descriptions: Record<string, string> = {
    Facebook: 'Social sharing optimized',
    Instagram: 'Engagement ready',
    Twitter: 'Tweet perfect',
    YouTube: 'Video thumbnail',
    LinkedIn: 'Professional ready',
    TikTok: 'Mobile optimized',
    Pinterest: 'Pin ready',
  }
  const platformName = getPlatformName(platform)
  return descriptions[platformName] || 'Platform optimized'
}

const getImageAspectRatioClass = (aspectRatio: string) => {
  const ratioMap: Record<string, string> = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
    '9:16': 'aspect-[9/16]',
    '3:4': 'aspect-[3/4]',
    '2:3': 'aspect-[2/3]',
  }
  return ratioMap[aspectRatio] || 'aspect-square'
}

const onImageLoad = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.style.opacity = '1'
}
</script>

<style scoped>
.image-card {
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Image loading effect */
img {
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}
</style>
