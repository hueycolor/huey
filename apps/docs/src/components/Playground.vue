<script setup lang="ts">
import { useSound } from '@vueuse/sound'
import { computed, ref } from 'vue'
import tap from '@/assets/sound/tap.wav'
import AbodePicker from '@/components/playground-pickers/AbodePicker.vue'

import CromePicker from '@/components/playground-pickers/CromePicker.vue'
import LigmaPicker from './playground-pickers/LigmaPicker.vue'

const MIN_PLAYBACK_RATE = 0.7

const pickers = [CromePicker, LigmaPicker, AbodePicker]

const { play } = useSound(tap, { volume: 0.25 })
const index = ref(0)

const currentPicker = computed(() => pickers[index.value])

function changePickers() {
  play({ playbackRate: MIN_PLAYBACK_RATE + Math.random() * ((1 - MIN_PLAYBACK_RATE) * 2) })

  index.value = index.value === pickers.length - 1 ? 0 : index.value + 1
}
</script>

<template>
  <div class="sandbox" @click="changePickers">
    <div class="tabs" />
    <div class="pickers" @click.stop>
      <component :is="currentPicker" />
    </div>
    <span class="hint">Wave your wand to change the color picker style</span>
  </div>
</template>

<style scoped>
.sandbox {
  user-select: none;
  width: 100%;
  height: 676px;
  max-width: 664px;
  background-color: var(--color-linen-100);
  padding: var(--spacing-24);
  border-radius: var(--radius-32);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: url("data:image/svg+xml;utf8,<svg width=%2232%22 height=%2232%22 viewBox=%220 0 32 32%22 fill=%22none%22 xmlns=%22http://www.w3.org/2000/svg%22><path d=%22M15.5469 15.5205L15.0205 17.2207L28.2783 30.5469C28.5818 30.8414 28.9875 31.0037 29.4072 31C29.8268 30.9962 30.2291 30.827 30.5273 30.5273C30.8259 30.2273 30.9963 29.82 31 29.3936C31.0036 28.9673 30.841 28.5571 30.5479 28.252L17.3252 14.9629L15.5469 15.5205Z%22 fill=%22white%22 stroke=%22black%22 stroke-width=%222%22/><path d=%22M8.50464 3.89258L8.49097 3.90332L8.47632 3.91309C8.2452 4.07442 7.9786 4.17882 7.69897 4.2168C7.42361 4.25413 7.14402 4.22454 6.88159 4.13379L6.88062 4.13477L2.6355 2.68945L4.06714 6.94043C4.13346 7.09669 4.17925 7.26049 4.19897 7.42871L4.21167 7.63672L4.19897 7.84473C4.17477 8.05089 4.11504 8.252 4.02124 8.43848L3.98218 8.51562L3.93042 8.58594L1.23413 12.209H5.77319C5.97695 12.215 6.17758 12.2556 6.36694 12.3281L6.55249 12.4111C6.7936 12.536 7.0034 12.7133 7.16675 12.9297L7.17944 12.9463L7.19116 12.9639L9.67456 16.5518L11.0046 12.2646H11.0066C11.0881 11.9933 11.234 11.7453 11.4343 11.5439C11.6349 11.3424 11.8827 11.1948 12.155 11.1123L12.1541 11.1113L16.4353 9.76855L12.7654 7.16602L12.738 7.14648C12.522 6.98187 12.3451 6.77062 12.2214 6.5293C12.0978 6.28803 12.0301 6.02177 12.0222 5.75098L12.0212 5.73633V1.25L8.50464 3.89258Z%22 fill=%22%23FFCE2C%22 stroke=%22black%22 stroke-width=%222%22/></svg>") 10 10, auto;

  &:active {
    cursor: url("data:image/svg+xml;utf8,<svg width=%2248%22 height=%2248%22 viewBox=%22-8 -8 48 48%22 fill=%22none%22 xmlns=%22http://www.w3.org/2000/svg%22><g transform=%22rotate(8, 30, 30)%22><path d=%22M15.5469 15.5205L15.0205 17.2207L28.2783 30.5469C28.5818 30.8414 28.9875 31.0037 29.4072 31C29.8268 30.9962 30.2291 30.827 30.5273 30.5273C30.8259 30.2273 30.9963 29.82 31 29.3936C31.0036 28.9673 30.841 28.5571 30.5479 28.252L17.3252 14.9629L15.5469 15.5205Z%22 fill=%22white%22 stroke=%22black%22 stroke-width=%222%22/><path d=%22M8.50464 3.89258L8.49097 3.90332L8.47632 3.91309C8.2452 4.07442 7.9786 4.17882 7.69897 4.2168C7.42361 4.25413 7.14402 4.22454 6.88159 4.13379L6.88062 4.13477L2.6355 2.68945L4.06714 6.94043C4.13346 7.09669 4.17925 7.26049 4.19897 7.42871L4.21167 7.63672L4.19897 7.84473C4.17477 8.05089 4.11504 8.252 4.02124 8.43848L3.98218 8.51562L3.93042 8.58594L1.23413 12.209H5.77319C5.97695 12.215 6.17758 12.2556 6.36694 12.3281L6.55249 12.4111C6.7936 12.536 7.0034 12.7133 7.16675 12.9297L7.17944 12.9463L7.19116 12.9639L9.67456 16.5518L11.0046 12.2646H11.0066C11.0881 11.9933 11.234 11.7453 11.4343 11.5439C11.6349 11.3424 11.8827 11.1948 12.155 11.1123L12.1541 11.1113L16.4353 9.76855L12.7654 7.16602L12.738 7.14648C12.522 6.98187 12.3451 6.77062 12.2214 6.5293C12.0978 6.28803 12.0301 6.02177 12.0222 5.75098L12.0212 5.73633V1.25L8.50464 3.89258Z%22 fill=%22%23FFCE2C%22 stroke=%22black%22 stroke-width=%222%22/></g></svg>") 18 18, auto;
  }

  &:active {
    .pickers:not(:hover) {
      scale: 0.98;
    }
  }

  .pickers {
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    cursor: auto;
    transition: scale 100ms ease-out;
  }

  .hint {
    opacity: 0.5;
    color: var(--color-beige-950);
    font: var(--paragraph-sm)
  }
}
</style>
