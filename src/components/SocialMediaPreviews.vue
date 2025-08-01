<template>
  <div class="social-previews">
    <div class="max-w-7xl mx-auto">
      <!-- Error Message -->
      <div v-if="error" class="mb-12 p-6 bg-red-50 border border-red-200 rounded-2xl">
        <div class="flex items-start gap-4">
          <div
            class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0"
          >
            <svg
              class="w-6 h-6 text-red-600"
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
            <h3 class="text-lg font-semibold text-red-900 mb-1">Processing Error</h3>
            <p class="text-red-700">{{ error }}</p>
            <button
              class="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>

      <!-- Header Section -->
      <div v-if="images.length" class="text-center mb-12">
        <div
          class="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-semibold"
        >
          <span
            class="w-6 h-6 bg-violet-600 text-white rounded-full flex items-center justify-center text-xs font-bold"
            >2</span
          >
          Download Results
        </div>

        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your Cropped Images</h2>

        <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          {{ images.length }} perfectly cropped images ready for download. Each optimized for its
          specific platform.
        </p>

        <!-- Download All Button -->
        <button
          @click="downloadAll"
          :disabled="downloadingAll"
          class="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div
            v-if="downloadingAll"
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
          {{ downloadingAll ? 'Downloading All...' : 'Download All Images' }}
        </button>
      </div>

      <!-- Images Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="(image, index) in images"
          :key="image.platform"
          class="image-card group"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <!-- Card -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1"
          >
            <!-- Image container -->
            <div
              class="relative overflow-hidden"
              :class="getImageAspectRatioClass(image.aspectRatio)"
            >
              <img
                :src="image.url"
                :alt="`${image.platform} preview`"
                class="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                @load="onImageLoad"
              />

              <!-- Overlay -->
              <div
                class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"
              ></div>

              <!-- Platform badge -->
              <div
                class="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-semibold text-gray-800"
              >
                {{ getPlatformName(image.platform) }}
              </div>

              <!-- Dimensions badge -->
              <div
                class="absolute top-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-lg text-xs font-medium text-white"
              >
                {{ image.aspectRatio }}
              </div>

              <!-- Preview overlay -->
              <div
                class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div class="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                  <svg
                    class="w-6 h-6 text-gray-700"
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
            <div class="p-4">
              <div class="text-center mb-3">
                <h3 class="font-semibold text-gray-900 mb-1">
                  {{ getPlatformName(image.platform) }}
                </h3>
                <p class="text-sm text-gray-600">
                  {{ getFormatDescription(image.platform) }}
                </p>
              </div>

              <!-- Download button -->
              <button
                @click="downloadImage(image.url, image.platform)"
                :disabled="downloadingItem === image.platform"
                class="w-full px-4 py-2 rounded-xl font-medium text-white transition-all duration-300 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                :style="{
                  background: `linear-gradient(135deg, ${image.color} 0%, ${image.hoverColor} 100%)`,
                }"
              >
                <div class="flex items-center justify-center gap-2">
                  <div
                    v-if="downloadingItem === image.platform"
                    class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                  ></div>
                  <svg
                    v-else
                    class="w-4 h-4"
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
                  <span class="text-sm">
                    {{ downloadingItem === image.platform ? 'Downloading...' : 'Download' }}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="images.length === 0 && !error" class="text-center py-16">
        <div
          class="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6"
        >
          <svg
            class="w-12 h-12 text-gray-400"
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
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Ready to Process</h3>
        <p class="text-gray-600 max-w-md mx-auto">
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
  animation: fadeInUp 0.6s ease-out forwards;
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
  transition: opacity 0.3s ease-in-out;
}
</style>
