<template>
  <div class="file-uploader">
    <div class="uploader-container">
      <label for="uploader-input" class="upload-label">
        <input
          id="uploader-input"
          type="file"
          accept="image/*"
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
          <span class="progress-percentage">{{ uploadProgress }}%</span>
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
import * as UC from '@uploadcare/file-uploader'
UC.defineComponents(UC)

import { ref } from 'vue'

const { isLoading, uploadProgress } = defineProps<{
  isLoading: boolean
  uploadProgress: number
}>()

const emit = defineEmits(['file-uploaded'])

const isDragOver = ref(false)

// Handle file selection via input
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    processFile(file)
  }
}

// Handle drag over
const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = true
}

// Handle drag leave
const handleDragLeave = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = false
}

// Handle file drop
const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = false

  const files = event.dataTransfer?.files
  if (files && files.length > 0) {
    const file = files[0]
    if (isValidImageFile(file)) {
      processFile(file)
    } else {
      console.error('Invalid file type')
    }
  }
}

// Validate file type
const isValidImageFile = (file: File): boolean => {
  return file.type.startsWith('image/')
}

// Process the uploaded file
const processFile = (file: File) => {
  if (!isValidImageFile(file)) {
    console.error('Please upload a valid image file')
    return
  }

  console.log('🔄 Processing file:', file.name, file.type, file.size)

  // Create object URL for the file
  const fileUrl = URL.createObjectURL(file)
  console.log('📸 Created blob URL:', fileUrl)

  // Test the blob URL by creating a test image
  const testImg = new Image()
  testImg.onload = () => {
    console.log('✅ Blob URL is valid and image loads successfully')
    console.log('Image dimensions:', testImg.naturalWidth, 'x', testImg.naturalHeight)
    // Emit the file URL to parent component
    emit('file-uploaded', fileUrl)
  }
  testImg.onerror = (error) => {
    console.error('❌ Blob URL failed to load:', error)
    URL.revokeObjectURL(fileUrl) // Clean up the failed URL
  }
  testImg.src = fileUrl
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

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

.upload-btn:hover,
.upload-btn.drag-over {
  border-color: rgba(16, 185, 129, 0.6);
  transform: translateY(-4px) scale(1.02);
  box-shadow:
    0 30px 60px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  background: rgba(16, 185, 129, 0.1);
}

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

.upload-text {
  text-align: center;
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

/* Progress Container */
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
