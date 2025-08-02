// ./composables/useImageProcessor.ts
import { ref, computed } from 'vue'
import rawData from '@/assets/sizes.json'

interface UploadedImage {
  uuid: string
  originalUrl: string
  isReady: boolean
  fileName: string
}

interface Size {
  name: string
  width: number
  height: number
  simple?: boolean
  positionSrc?: string
  description?: string
}

interface RawApp {
  app: string
  description: string
  logoSrc: string
  sizes: Size[]
}

interface SocialMediaConfig {
  platform: string
  aspectRatio: string
  width: number
  height: number
  color: string
  hoverColor: string
}

const rawApps: RawApp[] = rawData as RawApp[]

const colorMap: Record<string, { color: string; hoverColor: string }> = {
  Facebook: { color: '#4267B2', hoverColor: '#395c9a' },
  'Facebook Ads': { color: '#4267B2', hoverColor: '#395c9a' },
  Instagram: { color: '#E4405F', hoverColor: '#c83a54' },
  Twitter: { color: '#1DA1F2', hoverColor: '#1a8fd9' },
  YouTube: { color: '#FF0000', hoverColor: '#cc0000' },
  TikTok: { color: '#69C9D0', hoverColor: '#55a8b1' },
  LinkedIn: { color: '#0077B5', hoverColor: '#00679c' },
  Pinterest: { color: '#E60023', hoverColor: '#cc001f' },
  Snapchat: { color: '#FFFC00', hoverColor: '#d6ce00' },
  'Open Graph': { color: '#000000', hoverColor: '#333333' },
  Email: { color: '#D44638', hoverColor: '#b0352a' },
  'Google Banner Ads': { color: '#4285F4', hoverColor: '#357ae8' },
}

export const useImageProcessor = () => {
  const uploadedImage = ref<UploadedImage | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const uploadProgress = ref(0) // No longer used for simulation, but can be for real-time updates

  const configs: SocialMediaConfig[] = rawApps.flatMap((app) => {
    const colors = colorMap[app.app] || { color: '#000', hoverColor: '#333' }
    return app.sizes.map((size) => ({
      platform: `${app.app} - ${size.name}`,
      aspectRatio: size.description || `${size.width}:${size.height}`,
      width: size.width,
      height: size.height,
      color: colors.color,
      hoverColor: colors.hoverColor,
    }))
  })

  const downloadImage = (url: string, platform: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = `smart-crop-${platform.toLowerCase().replace(/\s/g, '-')}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const downloadAll = () => {
    if (!uploadedImage.value) return
    configs.forEach((config) => {
      const url = `https://ucarecdn.com/${uploadedImage.value!.uuid}/-/scale_crop/${config.width}x${config.height}/smart/`
      downloadImage(url, config.platform)
    })
  }

  const handleFileUpload = (cdnUrl: string) => {
    // We just need to extract the UUID and store it to generate URLs.
    error.value = null
    isLoading.value = false // We can set this to false immediately

    const uuid = cdnUrl.split('/').filter(Boolean).pop() || ''

    if (!uuid) {
      error.value = 'Failed to get a valid UUID from the Uploadcare URL.'
      return
    }

    // Store the uploaded image info
    uploadedImage.value = {
      uuid,
      originalUrl: cdnUrl,
      isReady: true,
      fileName: 'uploaded_image', // Or extract from cdnUrl
    }

    console.log('✅ Processing complete. UUID:', uuid)
  }

  return {
    uploadedImage,
    isLoading,
    uploadProgress,
    error,
    processedImages: computed(() => {
      if (!uploadedImage.value) return []
      const uuid = uploadedImage.value.uuid
      return configs.map((config) => {
        const url = `https://ucarecdn.com/${uuid}/-/scale_crop/${config.width}x${config.height}/smart/`
        return {
          platform: config.platform,
          url,
          aspectRatio: config.aspectRatio,
          color: config.color,
          hoverColor: config.hoverColor,
        }
      })
    }),
    handleFileUpload,
    downloadImage,
    downloadAll,
  }
}
