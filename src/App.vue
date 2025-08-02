<template>
  <div class="smart-cropper-app">
    <header class="header-section">
      <div class="header-content">
        <h1 class="headline">Smart Image Cropper</h1>
        <p class="subtitle">
          Upload an image and instantly get perfectly cropped versions for all your favorite social
          media platforms.
        </p>
      </div>
      <div class="header-decoration"></div>
    </header>

    <main class="main-content">
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FileUploader from './/components/FileUploader.vue'
import SocialMediaPreviews from './/components/SocialMediaPreviews.vue'

// --- Interfaces & Constants ---

/**
 * Defines the structure for a social media size configuration.
 */
interface SizeConfig {
  platform: string
  aspectRatio: string
  color: string
  hoverColor: string
  width?: number
  height?: number
}

/**
 * An array of possible file paths to search for the sizes.json file.
 * This provides flexibility in different deployment environments.
 */
const POSSIBLE_SIZE_PATHS = [
  'src/assets/sizes.json',
  '.src/assets/size.json',
  'src/size.json',
  './size.json',
]

/**
 * A fallback configuration to be used if sizes.json cannot be loaded.
 */
const FALLBACK_SIZES: SizeConfig[] = [
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
  { platform: 'Twitter - Header', aspectRatio: '3:1', color: '#1DA1F2', hoverColor: '#1A91DA' },
  { platform: 'YouTube - Thumbnail', aspectRatio: '16:9', color: '#FF0000', hoverColor: '#CC0000' },
  { platform: 'LinkedIn - Post', aspectRatio: '191:100', color: '#0A66C2', hoverColor: '#004182' },
  { platform: 'TikTok - Video', aspectRatio: '9:16', color: '#000000', hoverColor: '#333333' },
]

/**
 * Maps application names to their brand colors for consistent styling.
 */
const APP_COLOR_MAP: Record<string, { color: string; hoverColor: string }> = {
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

// --- State Management with Vue's `ref` ---

const isLoading = ref(false) // Indicates if the image is currently being processed.
const uploadProgress = ref(0) // Tracks the progress of the processing simulation.
const error = ref<string | null>(null) // Stores any error messages.
const uploadedImageUrl = ref<string | null>(null) // The URL of the uploaded image.
const processedImages = ref<
  Array<{
    platform: string
    url: string
    aspectRatio: string
    color: string
    hoverColor: string
  }>
>([]) // The array of processed image objects for preview and download.
const platformSizes = ref<SizeConfig[]>([]) // The array of social media size configurations.

// --- Helper Functions ---

/**
 * Helper function to calculate the greatest common divisor (GCD) for aspect ratio calculation.
 * @param {number} a - The first number (width).
 * @param {number} b - The second number (height).
 * @returns {number} The greatest common divisor.
 */
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))

/**
 * Retrieves the brand-specific colors for a given social media platform.
 * @param {string} appName - The name of the social media platform.
 * @returns {object} An object containing the color and hoverColor.
 */
const getAppColors = (appName: string) => {
  return APP_COLOR_MAP[appName] || { color: '#10b981', hoverColor: '#059669' }
}

/**
 * Tries to load platform size configurations from a JSON file.
 * It iterates through a list of possible paths until it finds a valid file.
 * If no file is found, it falls back to a predefined set of sizes.
 */
const loadSizes = async () => {
  for (const path of POSSIBLE_SIZE_PATHS) {
    try {
      const response = await fetch(path)
      if (!response.ok) continue

      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) continue

      const appsData = await response.json()
      const transformedSizes: SizeConfig[] = []

      // Loop through each app and its sizes to transform the data
      appsData.forEach((app: any) => {
        const sizesToUse =
          app.sizes.filter((size: any) => size.simple === true) || app.sizes.slice(0, 3)
        sizesToUse.forEach((size: any) => {
          const divisor = gcd(size.width, size.height)
          const aspectRatio = `${size.width / divisor}:${size.height / divisor}`
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
      return // Success! Exit the function
    } catch (err) {
      console.error(`❌ Error loading sizes from ${path}:`, err)
    }
  }

  // If the loop finishes without returning, use fallback sizes
  console.warn('⚠️ Could not load sizes from any location, using fallback sizes.')
  platformSizes.value = FALLBACK_SIZES
}

// --- Lifecycle Hooks ---

// Load platform sizes when the component is first mounted.
onMounted(() => {
  loadSizes()
})

// --- Event Handlers ---

/**
 * Handles the file upload event from the FileUploader component.
 * It simulates an image processing pipeline and updates the UI accordingly.
 * @param {string} fileUrl - The URL (e.g., a blob URL) of the uploaded image.
 */
const handleFileUpload = async (fileUrl: string) => {
  try {
    error.value = null
    isLoading.value = true
    uploadProgress.value = 0
    uploadedImageUrl.value = fileUrl

    // Simulate image processing with a progress bar
    const simulateProgress = () => {
      if (uploadProgress.value < 100) {
        uploadProgress.value += Math.random() * 10 + 5
        setTimeout(simulateProgress, 200)
      } else {
        uploadProgress.value = 100
        // Process the image after the simulation is complete
        processImage(fileUrl)
      }
    }
    simulateProgress()
  } catch (err) {
    console.error('❌ Error processing image:', err)
    error.value = 'Failed to process image. Please try again.'
  } finally {
    // Note: isLoading is set to false in the `processImage` function's finally block
  }
}

/**
 * Creates the processed image objects based on the uploaded image and platform sizes.
 * @param {string} fileUrl - The URL of the uploaded image.
 */
const processImage = (fileUrl: string) => {
  try {
    processedImages.value = platformSizes.value.map((platform) => ({
      platform: platform.platform,
      aspectRatio: platform.aspectRatio,
      color: platform.color,
      hoverColor: platform.hoverColor,
      url: fileUrl, // In a real-world app, this would be a URL to a new, cropped image
    }))
  } finally {
    isLoading.value = false
    uploadProgress.value = 0
  }
}

/**
 * Triggers the download of a single image.
 * @param {object} imageInfo - An object containing the image URL and platform name.
 */
const downloadImage = ({ url, platform }: { url: string; platform: string }) => {
  const link = document.createElement('a')
  link.href = url
  // Create a user-friendly filename
  link.download = `${platform.toLowerCase().replace(/\s+/g, '-')}-cropped.jpg`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Triggers the download of all processed images with a slight delay between each.
 */
const downloadAll = () => {
  processedImages.value.forEach((image, index) => {
    // Stagger the downloads to prevent browser pop-up blockers
    setTimeout(() => {
      downloadImage({ url: image.url, platform: image.platform })
    }, index * 500)
  })
}
</script>

<style scoped>
/*
 * --- Component Styling ---
  Comments were added for better context.
 */

/* Import a modern font for a clean look */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

.smart-cropper-app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow-x: hidden;
}

/* Background gradient animation */
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

.header-section {
  position: relative;
  padding: 4rem 2rem 6rem;
  text-align: center;
  /* Glass morphism effect */
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  box-shadow:
    0 8px 32px 0 rgba(31, 38, 135, 0.37),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
}

.header-content {
  position: relative;
  z-index: 2;
  max-width: 80rem;
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

/* Styled headline with a gradient text effect and animation */
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

/* Global transition for smooth animations */
.smart-cropper-app * {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover effect on header decoration */
.header-section:hover .header-decoration {
  animation-duration: 20s;
}

/* Accessibility: Improved focus states */
.smart-cropper-app :focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.8);
  outline-offset: 2px;
  border-radius: 4px;
}
</style>
