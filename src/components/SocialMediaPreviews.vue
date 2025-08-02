<template>
<<<<<<< HEAD
  <div class="page-wrapper">
    <div class="container">
      <div class="content-area">
        <div v-if="error" class="error-message">
          <div class="error-content">
            <div class="error-icon">
              <svg
                class="icon"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667
                      1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732
                      0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <div class="error-text">
              <h3>Oops! Something went wrong</h3>
              <p>{{ error }}</p>
              <button class="error-retry-btn">Try Again</button>
            </div>
          </div>
        </div>

        <div v-if="images.length" class="header-section">
          <div class="header-content">
            <div class="step-indicator">
              <svg
                class="icon"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2
                      2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002
                      2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0
                      012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0
                      01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0
                      012 2v2a2 2 0 01-2 2h-2a2 2 0
                      01-2-2v-2z"
                />
              </svg>
              <span>Step 2</span>
            </div>
            <h2 class="main-title">Your Perfect Crops</h2>
            <p class="subtitle">
              {{ images.length }} professionally cropped images ready for download. Each one
              optimized for its specific platform.
            </p>
            <button @click="downloadAll" :disabled="downloadingAll" class="download-all-btn">
              <div class="btn-shine"></div>
              <span v-if="downloadingAll">Downloading All Images...</span>
              <span v-else>Download All Images</span>
            </button>
          </div>
          <div class="header-decoration"></div>
        </div>

        <div class="image-grid">
          <div
            v-for="(image, index) in images"
            :key="image.platform || index"
            class="image-card"
            :style="{ animationDelay: `${index * 100}ms` }"
            @mouseenter="hoveredCard = image.platform"
            @mouseleave="hoveredCard = null"
=======
  <div class="social-previews">
    <div class="max-w-7xl mx-auto">
      <!-- Error Message -->
      <div v-if="error" class="mb-16 p-8 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200/60 rounded-3xl shadow-lg">
        <div class="flex items-start gap-5">
          <div
            class="w-16 h-16 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
>>>>>>> 0b447cc847fc37852b3255d226b6374b85f98d34
          >
            <div class="card-wrapper">
              <div class="card-glow" :style="{ backgroundColor: image.color || '#10b981' }"></div>
              <div
                class="image-wrapper"
                :class="getImageAspectRatioClass(image.aspectRatio || '1:1')"
                @click="openPreview(image, index)"
              >
                <div class="image-skeleton" v-if="!imageLoaded[index]"></div>
                <img
                  :src="image.url"
                  :alt="`${image.platform || 'Social media'} preview`"
                  @load="onImageLoad($event, index)"
                  style="opacity: 0; transition: opacity 0.3s ease"
                />
                <div class="image-overlay"></div>
                <div class="badge-platform">
                  {{ getPlatformName(image.platform || 'Unknown') }}
                </div>
                <div class="badge-dimensions">
                  {{ image.aspectRatio || '1:1' }}
                </div>
                <div class="quick-action" @click.stop="openPreview(image, index)">
                  <div class="eye-icon">
                    <svg
                      class="icon-small clickable"
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
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943
                          9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div class="card-content">
                <h3>{{ getPlatformName(image.platform || 'Social Media') }}</h3>
                <div class="image-meta">
                  <svg
                    class="icon-small clickable"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0
                          012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0
                          00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{{ image.aspectRatio || '1:1' }}</span>
                </div>
                <p>{{ getFormatDescription(image.platform || 'Social Media') }}</p>
                <button
                  @click="downloadImage(image.url, image.platform || 'image')"
                  :disabled="downloadingItem === image.platform"
                  class="download-btn"
                  :style="{
                    background: `linear-gradient(135deg, ${image.color || '#10b981'} 0%, ${image.hoverColor || '#059669'} 50%)`,
                  }"
                >
                  <div class="shine-effect"></div>
                  <div class="btn-content">
                    <div
                      v-if="downloadingItem === image.platform"
                      class="loader small-loader"
                    ></div>
                    <svg
                      v-else
                      class="icon-small"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0
                          003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    <span>
                      {{ downloadingItem === image.platform ? 'Downloading...' : 'Download' }}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="images.length === 0 && !error" class="empty-state">
          <div class="empty-content">
            <div class="empty-icon">
              <svg
                class="icon-large"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div class="empty-text">
              <h3>Ready to create magic</h3>
              <p>
                Upload an image above to see your perfectly cropped versions appear here in this
                beautiful gallery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="previewModal.isOpen"
        class="preview-modal"
        @click="closePreview"
        @keydown.esc="closePreview"
        tabindex="0"
      >
        <div class="modal-backdrop"></div>
        <div class="modal-content" @click.stop>
          <button class="close-btn" @click="closePreview">
            <svg
<<<<<<< HEAD
              class="close-icon"
=======
              class="w-8 h-8 text-red-600"
>>>>>>> 0b447cc847fc37852b3255d226b6374b85f98d34
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="preview-image-container">
            <img
              v-if="previewModal.currentImage"
              :src="previewModal.currentImage.url"
              :alt="`${previewModal.currentImage.platform} preview`"
              class="preview-image"
              @load="onPreviewImageLoad"
            />
            <div v-if="previewImageLoading" class="preview-loading">
              <div class="loading-spinner"></div>
              <p>Loading preview...</p>
            </div>
          </div>
<<<<<<< HEAD

          <div v-if="previewModal.currentImage" class="preview-info">
            <div class="info-header">
              <h3>{{ getPlatformName(previewModal.currentImage.platform) }}</h3>
              <div class="info-badges">
                <span class="info-badge">{{ previewModal.currentImage.aspectRatio }}</span>
              </div>
            </div>
            <p class="info-description">
              {{ getFormatDescription(previewModal.currentImage.platform) }}
            </p>
            <button
              @click="
                downloadImage(previewModal.currentImage.url, previewModal.currentImage.platform)
              "
              :disabled="downloadingItem === previewModal.currentImage.platform"
              class="preview-download-btn"
              :style="{
                background: `linear-gradient(135deg, ${previewModal.currentImage.color || '#10b981'} 0%, ${previewModal.currentImage.hoverColor || '#059669'} 100%)`,
              }"
=======
          <div>
            <h3 class="text-xl font-bold text-red-900 mb-2">Processing Error</h3>
            <p class="text-red-700 text-base font-medium">{{ error }}</p>
            <button
              class="mt-4 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
>>>>>>> 0b447cc847fc37852b3255d226b6374b85f98d34
            >
              <div
                v-if="downloadingItem === previewModal.currentImage.platform"
                class="loader small-loader"
              ></div>
              <svg
                v-else
                class="icon-small"
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
              <span>
                {{
                  downloadingItem === previewModal.currentImage.platform
                    ? 'Downloading...'
                    : 'Download'
                }}
              </span>
            </button>
          </div>
        </div>
      </div>
<<<<<<< HEAD
    </Teleport>
=======

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
>>>>>>> 0b447cc847fc37852b3255d226b6374b85f98d34
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue'

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

const emit = defineEmits([])

const hoveredCard = ref<string | null>(null)
const downloadingAll = ref(false)
const downloadingItem = ref<string | null>(null)
const imageLoaded = reactive<Record<number, boolean>>({})

const previewModal = reactive({
  isOpen: false,
  currentImage: null as any,
})
const previewImageLoading = ref(false)

const openPreview = (image: any, index: number) => {
  previewModal.isOpen = true
  previewModal.currentImage = image
  previewImageLoading.value = true

  setTimeout(() => {
    const modal = document.querySelector('.preview-modal') as HTMLElement
    if (modal) modal.focus()
  }, 100)
}

const closePreview = () => {
  previewModal.isOpen = false
  previewModal.currentImage = null
  previewImageLoading.value = false
}

const onPreviewImageLoad = () => {
  previewImageLoading.value = false
}

const handleKeydown = (event: KeyboardEvent) => {
  if (!previewModal.isOpen) return

  if (event.key === 'Escape') {
    closePreview()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

const downloadImage = async (url: string, platform: string) => {
  downloadingItem.value = platform

  try {
    let blob: Blob

    if (url.startsWith('data:')) {
      const response = await fetch(url)
      blob = await response.blob()
    } else if (url.startsWith('blob:')) {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to fetch blob: ${response.status}`)
      }
      blob = await response.blob()
    } else {
      const response = await fetch(url, {
        mode: 'cors',
        credentials: 'omit',
      })
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status}`)
      }
      blob = await response.blob()
    }

    const currentImage = images.find((img) => img.platform === platform)
    const aspectRatio = currentImage?.aspectRatio || '1-1'
    const cleanPlatform = getPlatformName(platform).toLowerCase().replace(/\s+/g, '-')
    const timestamp = new Date().getTime()

    let extension = 'jpg'
    if (blob.type.includes('png')) extension = 'png'
    else if (blob.type.includes('webp')) extension = 'webp'
    else if (blob.type.includes('gif')) extension = 'gif'

    const filename = `${cleanPlatform}-${aspectRatio.replace(':', 'x')}-cropped-${timestamp}.${extension}`

    if (window.navigator && (window.navigator as any).msSaveOrOpenBlob) {
      ;(window.navigator as any).msSaveOrOpenBlob(blob, filename)
    } else {
      const downloadUrl = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = filename
      link.style.display = 'none'

      document.body.appendChild(link)
      link.click()

      setTimeout(() => {
        document.body.removeChild(link)
        window.URL.revokeObjectURL(downloadUrl)
      }, 100)
    }
  } catch (error) {
    try {
      const newWindow = window.open(url, '_blank')
      if (!newWindow) {
        alert(
          'Download failed. Please try right-clicking the image and selecting "Save image as..."',
        )
      }
    } catch (fallbackError) {
      alert('Download failed. Please try right-clicking the image and selecting "Save image as..."')
    }
  } finally {
    downloadingItem.value = null
  }
}

const downloadAll = async () => {
  downloadingAll.value = true

  try {
    let successCount = 0
    let failCount = 0

    for (let i = 0; i < images.length; i++) {
      const image = images[i]

      try {
        downloadingItem.value = image.platform
        await downloadImage(image.url, image.platform)
        successCount++

        if (i < images.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 800))
        }
      } catch (error) {
        failCount++
      }
    }

    if (failCount > 0) {
      alert(`Downloaded ${successCount} images successfully. ${failCount} downloads failed.`)
    }
  } catch (error) {
    alert('Batch download failed. Please try downloading images individually.')
  } finally {
    downloadingAll.value = false
    downloadingItem.value = null
  }
}

const getPlatformName = (fullName: string) => {
  return fullName.split(' - ')[0]
}

const getFormatDescription = (platform: string) => {
  const descriptions: Record<string, string> = {
    Facebook: 'Perfect for social sharing',
    Instagram: 'Optimized for engagement',
    Twitter: 'Ideal for tweets and threads',
    YouTube: 'Great for video thumbnails',
    LinkedIn: 'Professional networking ready',
    TikTok: 'Mobile-first vertical format',
    Pinterest: 'Pin-worthy dimensions',
    'Social Media': 'Optimized for social platforms',
  }
  const platformName = getPlatformName(platform)
  return descriptions[platformName] || 'Optimized for this platform'
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

const onImageLoad = (event: Event, index: number) => {
  const img = event.target as HTMLImageElement
  imageLoaded[index] = true
  img.style.opacity = '1'
  img.style.visibility = 'visible'
}
</script>

<style scoped>
<<<<<<< HEAD
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

/* All existing styles remain the same... */
/* Page layout with modern gradient background */
.page-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow-x: hidden;
  padding: 2rem 1rem;
=======
.image-card {
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  opacity: 0;
>>>>>>> 0b447cc847fc37852b3255d226b6374b85f98d34
}

.page-wrapper::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%);
  animation: float 20s ease-in-out infinite;
  pointer-events: none;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(1deg);
  }
  66% {
    transform: translateY(10px) rotate(-1deg);
  }
}

.container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.content-area {
  width: 100%;
}

/* Debug section (temporary) */
.debug-section {
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-family: monospace;
  font-size: 0.875rem;
  white-space: pre-wrap;
}

.debug-section h3 {
  margin-bottom: 0.5rem;
  color: #10b981;
}

/* Error Message with glass morphism */
.error-message {
  margin-bottom: 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 2rem;
  box-shadow:
    0 20px 40px rgba(239, 68, 68, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  animation:
    slideInUp 0.6s ease-out,
    shake 0.6s ease-in-out 0.3s;
}

@keyframes shake {
  10%,
  90% {
    transform: translateX(-2px);
  }
  20%,
  80% {
    transform: translateX(4px);
  }
  30%,
  50%,
  70% {
    transform: translateX(-6px);
  }
  40%,
  60% {
    transform: translateX(6px);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.error-content {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.error-icon {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #ef4444 0%, #db2777 100%);
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 10px 20px rgba(219, 39, 119, 0.4);
}

.error-icon svg {
  width: 28px;
  height: 28px;
  color: white;
}

.error-text h3 {
  font-size: 1.75rem;
  font-weight: 800;
  color: white;
  margin-bottom: 0.5rem;
}

.error-text p {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.error-retry-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  color: white;
  font-weight: 600;
  border-radius: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 16px rgba(220, 38, 38, 0.4);
}

.error-retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(220, 38, 38, 0.6);
}

/* Header Section with glass morphism */
.header-section {
  position: relative;
  text-align: center;
  margin-bottom: 4rem;
  padding: 3rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.header-content {
  position: relative;
  z-index: 2;
}

.header-decoration {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(from 0deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  animation: rotate 30s linear infinite;
  pointer-events: none;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.step-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(16, 185, 129, 0.2);
  backdrop-filter: blur(10px);
  color: white;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(16, 185, 129, 0.3);
  animation: slideInUp 0.6s ease-out 0.2s both;
}

.step-indicator svg {
  width: 16px;
  height: 16px;
}

.main-title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 50%, #e0f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
  animation: slideInUp 0.6s ease-out 0.4s both;
}

.subtitle {
  font-size: 1.25rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  max-width: 48rem;
  margin: 0 auto 2rem;
  line-height: 1.6;
  animation: slideInUp 0.6s ease-out 0.6s both;
}

.download-all-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  font-weight: 700;
  font-size: 1.125rem;
  color: white;
  border-radius: 1.5rem;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  box-shadow: 0 10px 25px rgba(16, 185, 129, 0.4);
  cursor: pointer;
  border: none;
  overflow: hidden;
  transition: all 0.3s ease;
  animation: slideInUp 0.6s ease-out 0.8s both;
}

.download-all-btn:hover:not([disabled]) {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(16, 185, 129, 0.6);
}

.download-all-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.btn-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transform: translateX(-100%);
  transition: transform 0.7s ease;
  border-radius: 1.5rem;
  pointer-events: none;
}

.download-all-btn:hover .btn-shine {
  transform: translateX(100%);
}

/* Images Grid */
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

/* Card with modern glass morphism */
.image-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 2rem;
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
<<<<<<< HEAD
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.image-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow:
    0 30px 60px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

.card-glow {
  position: absolute;
  inset: 0;
  border-radius: 2rem;
  opacity: 0;
  transition: opacity 0.5s ease;
  filter: blur(20px);
  pointer-events: none;
}

.image-card:hover .card-glow {
  opacity: 0.15;
}

/* Image Container */
.image-wrapper {
  position: relative;
  overflow: hidden;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  cursor: pointer;
}

.aspect-video {
  aspect-ratio: 16 / 9;
}

.aspect-\[4\/3\] {
  aspect-ratio: 4 / 3;
}

.aspect-square {
  aspect-ratio: 1 / 1;
}

.aspect-\[9\/16\] {
  aspect-ratio: 9 / 16;
}

.aspect-\[3\/4\] {
  aspect-ratio: 3 / 4;
}

.aspect-\[2\/3\] {
  aspect-ratio: 2 / 3;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: all 0.4s ease;
  opacity: 0;
  display: block;
  border-radius: 0;
}

.image-wrapper img.loaded {
  opacity: 1;
}

.image-wrapper:hover img {
  transform: scale(1.05);
}

.image-skeleton {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.1) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent 60%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-card:hover .image-overlay {
  opacity: 1;
}

/* Badges */
.badge-platform {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #374151;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.image-card:hover .badge-platform {
  transform: scale(1.05);
}

.badge-dimensions {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 0.75rem;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Quick Action */
.quick-action {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.image-card:hover .quick-action {
  opacity: 1;
  pointer-events: auto;
}

.eye-icon {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(15px);
  padding: 1rem;
  border-radius: 1.5rem;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.eye-icon:hover {
  transform: scale(1.1);
}

.icon-small {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.clickable {
  cursor: pointer;
  transition: all 0.2s ease;
}

.clickable:hover {
  transform: scale(1.1);
  opacity: 0.8;
}

/* Card Content */
.card-content {
  padding: 1.5rem 2rem 2rem;
  text-align: center;
}

.card-content h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.75rem;
  transition: color 0.3s ease;
}

.image-meta {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
}

.card-content p {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

/* Download Button */
.download-btn {
  position: relative;
  width: 100%;
  padding: 1rem 1.5rem;
  border-radius: 1.5rem;
  font-weight: 700;
  color: white;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.download-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}

.download-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.shine-effect {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transform: translateX(-100%);
  transition: transform 0.7s ease;
  border-radius: 1.5rem;
  pointer-events: none;
}

.download-btn:hover .shine-effect {
  transform: translateX(100%);
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 1;
}

/* Loader */
.small-loader {
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Empty State */
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  text-align: center;
}

.empty-content {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 2rem;
  padding: 3rem 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.empty-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 2rem;
  box-shadow: 0 15px 30px rgba(16, 185, 129, 0.3);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.icon-large {
  width: 40px;
  height: 40px;
  color: white;
}

.empty-text h3 {
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
}

.empty-text p {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  max-width: 400px;
}

/* NEW: Preview Modal Styles */
.preview-modal {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  outline: none;
}

.modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(30px);
  border-radius: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  animation: modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 10;
  width: 48px;
  height: 48px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.9);
  transform: scale(1.1);
}

.close-icon {
  width: 24px;
  height: 24px;
}

.preview-image-container {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  max-height: 70vh;
  overflow: hidden;
}

.preview-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 1rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  transition: opacity 0.3s ease;
}

.preview-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: white;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.preview-info {
  padding: 2rem;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.info-header h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.info-badges {
  display: flex;
  gap: 0.5rem;
}

.info-badge {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.info-description {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.preview-download-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border-radius: 1.5rem;
  font-weight: 700;
  color: white;
  cursor: pointer;
  border: none;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.preview-download-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
}

.preview-download-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Responsive Design */
@media (max-width: 768px) {
  .page-wrapper {
    padding: 1rem;
  }

  .header-section {
    padding: 2rem 1rem;
    margin-bottom: 2rem;
  }

  .image-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .main-title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .preview-modal {
    padding: 1rem;
  }

  .modal-content {
    max-width: 95vw;
    max-height: 95vh;
  }

  .close-btn {
    top: 1rem;
    right: 1rem;
    width: 40px;
    height: 40px;
  }

  .close-icon {
    width: 20px;
    height: 20px;
  }

  .preview-info {
    padding: 1.5rem;
  }

  .info-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
=======
  transition: opacity 0.5s ease-in-out;
>>>>>>> 0b447cc847fc37852b3255d226b6374b85f98d34
}
</style>
