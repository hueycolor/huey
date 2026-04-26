import { addCollection } from '@iconify/vue'

addCollection({
  prefix: 'feather',
  width: 24,
  height: 24,
  icons: {
    'check': {
      body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 6L9 17l-5-5"/>',
    },
    'copy': {
      body: '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="13" height="13" x="9" y="9" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></g>',
    },
    'chevron-right': {
      body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 18l6-6l-6-6"/>',
    },
    'eye': {
      body: '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M1 12s4-8 11-8s11 8 11 8s-4 8-11 8s-11-8-11-8"/><circle cx="12" cy="12" r="3"/></g>',
    },
    'code': {
      body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m16 18l6-6l-6-6M8 6l-6 6l6 6"/>',
    },
  },
})

addCollection({
  prefix: 'ph',
  width: 256,
  height: 256,
  icons: {
    'puzzle-piece': {
      body: '<path fill="currentColor" d="M220.27 158.54a8 8 0 0 0-7.7-.46a20 20 0 1 1 0-36.16a8 8 0 0 0 11.43-7.23V72a16 16 0 0 0-16-16h-36.22a35 35 0 0 0 .22-4a36.1 36.1 0 0 0-11.36-26.24a36 36 0 0 0-60.55 23.62a36.6 36.6 0 0 0 .14 6.62H64a16 16 0 0 0-16 16v32.22a35 35 0 0 0-4-.22a36.12 36.12 0 0 0-26.24 11.36a35.7 35.7 0 0 0-9.69 27a36.08 36.08 0 0 0 33.31 33.6a35.7 35.7 0 0 0 6.62-.14V208a16 16 0 0 0 16 16h144a16 16 0 0 0 16-16v-42.69a8 8 0 0 0-3.73-6.77M208 208H64v-42.69a8 8 0 0 0-11.43-7.23a20 20 0 1 1 0-36.16A8 8 0 0 0 64 114.69V72h46.69a8 8 0 0 0 7.23-11.43a20 20 0 1 1 36.16 0A8 8 0 0 0 161.31 72H208v32.23a35.7 35.7 0 0 0-6.62-.14A36 36 0 0 0 204 176a35 35 0 0 0 4-.22Z"/>',
    },
    'arrow-right': {
      body: '<path fill="currentColor" d="m221.66 133.66l-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32"/>',
    },
    'binoculars': {
      body: '<path fill="currentColor" d="M237.2 151.87a47 47 0 0 0-2.35-5.45L193.26 51.8a7.8 7.8 0 0 0-1.66-2.44a32 32 0 0 0-45.26 0A8 8 0 0 0 144 55v25h-32V55a8 8 0 0 0-2.34-5.66a32 32 0 0 0-45.26 0a7.8 7.8 0 0 0-1.66 2.44L21.15 146.4a47 47 0 0 0-2.35 5.45A48 48 0 1 0 112 168V96h32v72a48 48 0 1 0 93.2-16.13M76.71 59.75a16 16 0 0 1 19.29-1v73.51a47.9 47.9 0 0 0-46.79-9.92ZM64 200a32 32 0 1 1 32-32a32 32 0 0 1-32 32m96-141.26a16 16 0 0 1 19.29 1l27.5 62.58a47.9 47.9 0 0 0-46.79 9.93ZM192 200a32 32 0 1 1 32-32a32 32 0 0 1-32 32"/>',
    },
  },
})

addCollection({
  prefix: 'ri',
  width: 24,
  height: 24,
  icons: {
    'vuejs-line': {
      body: '<path fill="currentColor" d="M3.317 3L12 18l8.684-15H23L12 22L1 3zm4.342 0L12 10.5L16.343 3h2.316L12 14.5L5.343 3z"/>',
    },
    'svelte-line': {
      body: '<path fill="currentColor" d="M19.8 3.77a6.25 6.25 0 0 0-8.63-1.913L6.11 5.081a6.25 6.25 0 0 0-1.973 8.532a6.25 6.25 0 0 0 8.693 8.53l5.06-3.224a6.25 6.25 0 0 0 1.974-8.532A6.25 6.25 0 0 0 19.8 3.77m-1.352 5.004A6.26 6.26 0 0 0 15.65 7.5a1 1 0 0 0-1.525-1.003L9.066 9.72a1 1 0 1 0 1.075 1.686l2.109-1.343a4.25 4.25 0 1 1 4.567 7.17l-5.06 3.223a4.25 4.25 0 0 1-6.203-5.23A6.25 6.25 0 0 0 8.35 16.5a1 1 0 0 0 1.525 1.003l5.06-3.224a1 1 0 0 0-1.074-1.687l-2.109 1.344a4.25 4.25 0 0 1-4.567-7.17l5.06-3.223a4.25 4.25 0 0 1 6.203 5.23"/>',
    },
  },
})

addCollection({
  prefix: 'majesticons',
  width: 24,
  height: 24,
  icons: {
    selector: {
      body: '<g fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.707 4.293a1 1 0 0 0-1.414 0l-4 4A1 1 0 0 0 8 10h8a1 1 0 0 0 .707-1.707l-4-4zM8 14a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4A1 1 0 0 0 16 14H8z" fill="currentColor"/></g>',
    },
  },
})
