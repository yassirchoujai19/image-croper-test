<template>
<<<<<<< HEAD
  <div class="smart-cropper-app">
    <header class="header-section">
      <div class="header-content">
        <h1 class="headline">Smart Image Cropper</h1>
        <p class="subtitle">
          Upload an image and instantly get perfectly cropped versions for all your favorite social
          media platforms.
        </p>
=======
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
>>>>>>> 0b447cc847fc37852b3255d226b6374b85f98d34
      </div>
      <div class="header-decoration"></div>
    </header>

<<<<<<< HEAD
    <main class="main-content">
=======
    <main class="relative max-w-7xl mx-auto px-4 py-16">
>>>>>>> 0b447cc847fc37852b3255d226b6374b85f98d34
      <FileUploader
        @file-uploaded="handleFileUpload"
        :isLoading="isLoading"
        :uploadProgress="uploadProgress"
      />

      <SocialMediaPreviews
        :images="processedImages"
        :error="error"
        @download-image="downloadImage"
        @download-all="downloadAll"
      />
    </main>
<<<<<<< HEAD
=======

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
>>>>>>> 0b447cc847fc37852b3255d226b6374b85f98d34
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FileUploader from './/components/FileUploader.vue'
import SocialMediaPreviews from './/components/SocialMediaPreviews.vue'

interface SizeConfig {
  platform: string
  aspectRatio: string
  color: string
  hoverColor: string
  width?: number
  height?: number
}

const isLoading = ref(false)
const uploadProgress = ref(0)
const error = ref<string | null>(null)
const uploadedImageUrl = ref<string | null>(null)
const processedImages = ref<
  Array<{
    platform: string
    url: string
    aspectRatio: string
    color: string
    hoverColor: string
  }>
>([])
const platformSizes = ref<SizeConfig[]>([])

// Load sizes from JSON file
const loadSizes = async () => {
  const possiblePaths = [
    'src/assets/sizes.json',
    '.src/assets/size.json',
    'src/size.json',
    './size.json',
  ]

  for (const path of possiblePaths) {
    try {
      console.log(`📁 Trying to load sizes from ${path}...`)
      const response = await fetch(path)

      if (!response.ok) {
        console.log(`❌ ${path} not found (${response.status})`)
        continue
      }

      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        console.log(`❌ ${path} is not JSON (content-type: ${contentType})`)
        continue
      }

      const appsData = await response.json()
      console.log('✅ Raw JSON data loaded:', appsData)

      // Transform the JSON data into our expected format
      const transformedSizes: SizeConfig[] = []

      appsData.forEach((app: any) => {
        // Get the main/simple sizes for each app first
        const mainSizes = app.sizes.filter((size: any) => size.simple === true)

        // If we have simple sizes, use them, otherwise take first 3 sizes
        const sizesToUse = mainSizes.length > 0 ? mainSizes : app.sizes.slice(0, 3)

        sizesToUse.forEach((size: any) => {
          // Calculate aspect ratio from width and height
          const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
          const divisor = gcd(size.width, size.height)
          const aspectRatio = `${size.width / divisor}:${size.height / divisor}`

          // Get app-specific colors
          const colors = getAppColors(app.app)

          transformedSizes.push({
            platform: `${app.app} - ${size.name}`,
            aspectRatio: aspectRatio,
            color: colors.color,
            hoverColor: colors.hoverColor,
            width: size.width,
            height: size.height,
          })
        })
      })

      platformSizes.value = transformedSizes
      console.log('✅ Transformed platform sizes:', transformedSizes)
      return // Success! Exit the function
    } catch (err) {
      console.log(`❌ Error loading ${path}:`, err)
      continue
    }
  }

  // If we get here, none of the paths worked
  console.log('⚠️ Could not load size.json from any location, using fallback sizes')

  // Fallback to default sizes if file can't be loaded
  platformSizes.value = [
    {
      platform: 'Instagram - Square Post',
      aspectRatio: '1:1',
      color: '#E1306C',
      hoverColor: '#C13584',
    },
    {
      platform: 'Facebook - Cover Photo',
      aspectRatio: '205:78',
      color: '#1877F2',
      hoverColor: '#166FE5',
    },
    {
      platform: 'Twitter - Header',
      aspectRatio: '3:1',
      color: '#1DA1F2',
      hoverColor: '#1A91DA',
    },
    {
      platform: 'YouTube - Thumbnail',
      aspectRatio: '16:9',
      color: '#FF0000',
      hoverColor: '#CC0000',
    },
    {
      platform: 'LinkedIn - Post',
      aspectRatio: '191:100',
      color: '#0A66C2',
      hoverColor: '#004182',
    },
    {
      platform: 'TikTok - Video',
      aspectRatio: '9:16',
      color: '#000000',
      hoverColor: '#333333',
    },
  ]
  console.log('🔄 Using fallback sizes')
}

// Helper function to get app-specific colors
const getAppColors = (appName: string) => {
  const colorMap: Record<string, { color: string; hoverColor: string }> = {
    Facebook: { color: '#1877F2', hoverColor: '#166FE5' },
    'Facebook Ads': { color: '#1877F2', hoverColor: '#166FE5' },
    Instagram: { color: '#E1306C', hoverColor: '#C13584' },
    Twitter: { color: '#1DA1F2', hoverColor: '#1A91DA' },
    YouTube: { color: '#FF0000', hoverColor: '#CC0000' },
    TikTok: { color: '#000000', hoverColor: '#333333' },
    LinkedIn: { color: '#0A66C2', hoverColor: '#004182' },
    Pinterest: { color: '#BD081C', hoverColor: '#9D0619' },
    Snapchat: { color: '#FFFC00', hoverColor: '#E6E300' },
    'Open Graph': { color: '#10b981', hoverColor: '#059669' },
    Email: { color: '#6366F1', hoverColor: '#4F46E5' },
    'Google Banner Ads': { color: '#4285F4', hoverColor: '#3367D6' },
  }

  return colorMap[appName] || { color: '#10b981', hoverColor: '#059669' }
}

// Load sizes on component mount
onMounted(() => {
  loadSizes()
})

// Handle file upload from FileUploader component
const handleFileUpload = async (fileUrl: string) => {
  console.log('🚀 File uploaded, processing:', fileUrl)

  try {
    error.value = null
    isLoading.value = true
    uploadProgress.value = 0
    uploadedImageUrl.value = fileUrl

    // Simulate processing time with progress
    const progressInterval = setInterval(() => {
      uploadProgress.value += Math.random() * 10 + 5
      if (uploadProgress.value >= 100) {
        uploadProgress.value = 100
        clearInterval(progressInterval)
      }
    }, 200)

    // Wait for progress to complete
    await new Promise((resolve) => {
      const checkProgress = () => {
        if (uploadProgress.value >= 100) {
          resolve(true)
        } else {
          setTimeout(checkProgress, 100)
        }
      }
      checkProgress()
    })

    // Verify the fileUrl is valid before using it
    console.log('📸 Using file URL for all platforms:', fileUrl)
    console.log('📐 Using platform sizes from JSON:', platformSizes.value)

    // Create processed images array using the loaded platform sizes
    processedImages.value = platformSizes.value.map((platform) => ({
      platform: platform.platform,
      aspectRatio: platform.aspectRatio,
      color: platform.color,
      hoverColor: platform.hoverColor,
      url: fileUrl, // Use the exact same blob URL for all formats
    }))

    console.log('✅ Processing complete, created images:', processedImages.value)
  } catch (err) {
    console.error('❌ Error processing image:', err)
    error.value = 'Failed to process image. Please try again.'
  } finally {
    isLoading.value = false
    uploadProgress.value = 0
  }
}

const downloadImage = ({ url, platform }: { url: string; platform: string }) => {
  console.log('📥 Downloading image:', platform, url)

  // Create a temporary link to download the image
  const link = document.createElement('a')
  link.href = url
  link.download = `${platform.toLowerCase().replace(/\s+/g, '-')}-cropped.jpg`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const downloadAll = () => {
  console.log('📥 Downloading all images')

  processedImages.value.forEach((image, index) => {
    setTimeout(() => {
      downloadImage({ url: image.url, platform: image.platform })
    }, index * 500) // Stagger downloads
  })
}
</script>

<<<<<<< HEAD
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
=======
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
>>>>>>> 0b447cc847fc37852b3255d226b6374b85f98d34

.smart-cropper-app {
  min-height: 100vh;
<<<<<<< HEAD
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
=======
  background: #ffffff;
>>>>>>> 0b447cc847fc37852b3255d226b6374b85f98d34
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow-x: hidden;
}

<<<<<<< HEAD
.smart-cropper-app::before {
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
=======
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
>>>>>>> 0b447cc847fc37852b3255d226b6374b85f98d34
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

<<<<<<< HEAD
.header-section {
  position: relative;
  padding: 4rem 2rem 6rem;
  text-align: center;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.header-content {
  position: relative;
  z-index: 2;
  max-width: 4xl;
  margin: 0 auto;
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

.headline {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 50%, #e0f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
  animation: slideInUp 1s ease-out;
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

.subtitle {
  font-size: 1.25rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  max-width: 42rem;
  margin: 0 auto;
  line-height: 1.6;
  animation: slideInUp 1s ease-out 0.2s both;
}

.main-content {
  max-width: 80rem;
  width: 100%;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  position: relative;
  z-index: 1;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-section {
    padding: 3rem 1rem 4rem;
  }

  .main-content {
    padding: 2rem 1rem;
  }

  .subtitle {
    font-size: 1.125rem;
  }
}

/* Enhanced animations for interactive elements */
.smart-cropper-app * {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Subtle hover effects for better interactivity */
.header-section:hover .header-decoration {
  animation-duration: 20s;
}

/* Glass morphism effect for modern look */
.header-section {
  box-shadow:
    0 8px 32px 0 rgba(31, 38, 135, 0.37),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
}

/* Improved focus states for accessibility */
.smart-cropper-app :focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.8);
  outline-offset: 2px;
  border-radius: 4px;
=======
::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #7c3aed, #6d28d9);
>>>>>>> 0b447cc847fc37852b3255d226b6374b85f98d34
}
</style>