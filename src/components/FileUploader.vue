<template>
  <div class="file-uploader">
    <div class="uploader-container">
      <label for="uploader-input" class="upload-label">
        <input
          id="uploader-input"
          type="file"
          :accept="ACCEPT_FILE_TYPES"
          @change="handleFileChange"
          @dragover.prevent="handleDragOver"
          @dragleave.prevent="handleDragLeave"
          @drop.prevent="handleDrop"
          class="hidden-input"
        />
        <div class="upload-btn" :class="{ 'drag-over': isDragOver }">
          <div class="upload-decoration"></div>
          <div class="upload-content">
            <div class="icon-container">
              <div class="icon-glow"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="upload-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v8"
                />
              </svg>
            </div>
            <div class="upload-text">
              <span class="main-text">Click or drag image to upload</span>
              <p class="sub-text">Supports PNG, JPG, and WEBP formats</p>
            </div>
          </div>
          <div class="upload-shine"></div>
        </div>
      </label>

      <div v-if="isLoading" class="upload-progress-container">
        <div class="progress-header">
          <span class="progress-title">Processing your image</span>
          <span class="progress-percentage">{{ Math.floor(uploadProgress) }}%</span>
        </div>
        <div class="upload-progress-bar-wrapper">
          <div class="upload-progress-bar" :style="{ width: uploadProgress + '%' }">
            <div class="progress-shine"></div>
          </div>
        </div>
        <div class="progress-dots">
          <div class="dot" :class="{ active: uploadProgress > 25 }"></div>
          <div class="dot" :class="{ active: uploadProgress > 50 }"></div>
          <div class="dot" :class="{ active: uploadProgress > 75 }"></div>
          <div class="dot" :class="{ active: uploadProgress > 90 }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// --- Props & Emits ---

/**
 * Defines the component's props.
 * @property {boolean} isLoading - A flag to show the loading state.
 * @property {number} uploadProgress - The current progress percentage (0-100).
 */
const props = defineProps<{
  isLoading: boolean
  uploadProgress: number
}>()

/**
 * Defines the custom events emitted by this component.
 * @event file-uploaded - Emitted with the URL of the processed file.
 */
const emit = defineEmits(['file-uploaded'])

// --- State Management ---

/**
 * Reactive state to track if a file is being dragged over the drop zone.
 */
const isDragOver = ref(false)

// --- Constants ---

/**
 * A string defining the accepted file types for the input element.
 * This is a best practice for a clear and single source of truth for validation.
 */
const ACCEPT_FILE_TYPES = 'image/png, image/jpeg, image/webp'

// --- Event Handlers & Core Logic ---

/**
 * Handles the file change event from the `<input type="file">`.
 * @param {Event} event - The DOM event.
 */
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    processFile(file)
  }
}

/**
 * Handles the 'dragover' event to show the drag-over visual state.
 * @param {DragEvent} event - The DOM DragEvent.
 */
const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = true
}

/**
 * Handles the 'dragleave' event to reset the drag-over visual state.
 * @param {DragEvent} event - The DOM DragEvent.
 */
const handleDragLeave = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = false
}

/**
 * Handles the 'drop' event to process the dropped file.
 * @param {DragEvent} event - The DOM DragEvent.
 */
const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = false

  const file = event.dataTransfer?.files?.[0]
  if (file) {
    processFile(file)
  }
}

/**
 * Validates if a file is an accepted image type.
 * @param {File} file - The file to validate.
 * @returns {boolean} True if the file is a valid image, otherwise false.
 */
const isValidImageFile = (file: File): boolean => {
  const validImageMimeTypes = ['image/jpeg', 'image/png', 'image/webp']
  return validImageMimeTypes.includes(file.type)
}

/**
 * Processes the uploaded file, validates it, and emits the file URL.
 * It uses a FileReader to ensure the file is valid before emitting.
 * @param {File} file - The file object from the upload.
 */
const processFile = (file: File) => {
  if (!isValidImageFile(file)) {
    console.error('❌ Invalid file type. Please upload a valid image file (PNG, JPG, or WEBP).')
    // Consider adding a prop or emit to show this error in the UI
    return
  }

  console.log('🔄 Processing file:', file.name)

  const fileUrl = URL.createObjectURL(file)

  // Use an Image object to verify the URL and file data
  const testImg = new Image()
  testImg.onload = () => {
    console.log('✅ Blob URL is valid and image loads successfully.')
    console.log('Image dimensions:', testImg.naturalWidth, 'x', testImg.naturalHeight)
    emit('file-uploaded', fileUrl)
  }
  testImg.onerror = (error) => {
    console.error('❌ Blob URL failed to load:', error)
    URL.revokeObjectURL(fileUrl) // Clean up the URL if it fails
  }
  testImg.src = fileUrl
}
</script>

<style scoped>
/*
 * --- Component Styling ---
 * The CSS remains largely the same as it is already well-structured and
 * uses modern techniques like animations and transitions.
 */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

/* Main container for the entire component */
.file-uploader {
  font-family: 'Inter', sans-serif;
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
}

.uploader-container {
  max-width: 600px;
  margin: 0 auto;
  position: relative;
}

/* Visually-hidden input for accessibility and custom styling */
.upload-label {
  display: block;
  width: 100%;
  cursor: pointer;
}

.hidden-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

/* Main drag-and-drop button with glassmorphism and animation effects */
.upload-btn {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  animation: slideInUp 0.6s ease-out;
}

/* Hover and drag-over states */
.upload-btn:hover,
.upload-btn.drag-over {
  border-color: rgba(16, 185, 129, 0.6);
  transform: translateY(-4px) scale(1.02);
  box-shadow:
    0 30px 60px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  background: rgba(16, 185, 129, 0.1);
}

/* Rotating background decoration */
.upload-decoration {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(from 0deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  animation: rotate 20s linear infinite;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.upload-btn:hover .upload-decoration,
.upload-btn.drag-over .upload-decoration {
  opacity: 1;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
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

.upload-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Animated icon and text */
.icon-container {
  position: relative;
  margin-bottom: 1.5rem;
  transition: transform 0.4s ease;
}

.upload-btn:hover .icon-container,
.upload-btn.drag-over .icon-container {
  transform: scale(1.1) rotate(5deg);
}

.icon-glow {
  position: absolute;
  inset: -20px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
  animation: pulse 2s ease-in-out infinite;
}

.upload-btn:hover .icon-glow,
.upload-btn.drag-over .icon-glow {
  opacity: 1;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.6;
  }
}

.upload-icon {
  width: 4rem;
  height: 4rem;
  color: white;
  filter: drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3));
  transition: all 0.3s ease;
}

.upload-btn:hover .upload-icon,
.upload-btn.drag-over .upload-icon {
  color: #10b981;
  filter: drop-shadow(0 8px 16px rgba(16, 185, 129, 0.5));
}

.main-text {
  display: block;
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.upload-btn:hover .main-text,
.upload-btn.drag-over .main-text {
  color: #10b981;
  text-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

.sub-text {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  transition: color 0.3s ease;
}

.upload-btn:hover .sub-text,
.upload-btn.drag-over .sub-text {
  color: rgba(255, 255, 255, 0.9);
}

/* Shine effect on hover */
.upload-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transform: translateX(-100%);
  transition: transform 0.8s ease;
  border-radius: 2rem;
  pointer-events: none;
}

.upload-btn:hover .upload-shine,
.upload-btn.drag-over .upload-shine {
  transform: translateX(100%);
}

/* Progress bar styling */
.upload-progress-container {
  margin-top: 2rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  animation: slideInUp 0.6s ease-out;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.progress-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.progress-percentage {
  font-size: 1rem;
  font-weight: 700;
  color: #10b981;
  background: rgba(16, 185, 129, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.upload-progress-bar-wrapper {
  position: relative;
  height: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.upload-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #10b981 0%, #059669 50%, #047857 100%);
  border-radius: 9999px;
  transition: width 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4);
}

/* Animated shine effect on the progress bar */
.progress-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: progressShine 2s ease-in-out infinite;
  border-radius: 9999px;
}

@keyframes progressShine {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Dots animation */
.progress-dots {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
}

.dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  position: relative;
}

.dot.active {
  background: #10b981;
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.6);
  animation: dotPulse 1.5s ease-in-out infinite;
}

@keyframes dotPulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

.dot.active::before {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%);
  animation: ripple 1.5s ease-in-out infinite;
}

@keyframes ripple {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .upload-btn {
    padding: 2rem 1rem;
    margin: 1rem;
  }
  .upload-icon {
    width: 3rem;
    height: 3rem;
  }
  .main-text {
    font-size: 1.125rem;
  }
  .sub-text {
    font-size: 0.8rem;
  }
  .upload-progress-container {
    margin: 1rem;
    padding: 1.5rem;
  }
}
</style>
