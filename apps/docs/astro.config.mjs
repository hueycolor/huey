import cloudflare from '@astrojs/cloudflare'
import starlight from '@astrojs/starlight'
import vue from '@astrojs/vue'

// @ts-check
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  output: 'server',
  integrations: [starlight({
    title: 'Huey',
    expressiveCode: {
      themes: ['vesper'],
    },
    customCss: [
      './src/styles/custom.css',
    ],
    social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/hueycolor/huey' }],
    sidebar: [
      {
        label: 'Overview',
        items: [
          { label: 'Getting Started', slug: 'overview/getting-started' },
          { label: 'Core Library', slug: 'overview/core' },
          { label: 'Components', slug: 'overview/components' },
          { label: 'Styling', slug: 'overview/styling' },
          { label: 'Accessibility', slug: 'overview/accessibility' },
          { label: 'Releases', slug: 'overview/releases' },
          { label: 'About', slug: 'overview/about' },
        ],
      },
      {
        label: 'Components',
        items: [
          { label: 'Saturation Area', slug: 'components/saturation-area' },
          { label: 'Color Preview', slug: 'components/color-preview' },
          { label: 'Color Swatch', slug: 'components/color-swatch' },
          { label: 'Color Dropper', slug: 'components/color-dropper' },
          { label: 'Hex Input', slug: 'components/hex-input' },
          { label: 'Alpha Input', slug: 'components/alpha-input' },
          { label: 'Alpha Slider', slug: 'components/alpha-slider' },
          { label: 'RGB Inputs', slug: 'components/rgb-inputs' },
          { label: 'HSL Inputs', slug: 'components/hsl-inputs' },
          { label: 'HSL Sliders', slug: 'components/hsl-sliders' },
        ],
      },
      {
        label: 'Utils',
        items: [
          { label: 'Color Utilities', slug: 'utils/color-utilities' },
          { label: 'Color Conversion', slug: 'utils/color-conversion' },
          { label: 'Regex Patterns', slug: 'utils/regex-patterns' },
          { label: 'DOM Utilities', slug: 'utils/dom-utilities' },
          { label: 'Keyboard Utilities', slug: 'utils/keyboard-utilities' },
          { label: 'Math Utilities', slug: 'utils/math-utilities' },
        ],
      },
    ],
    components: {
      Sidebar: './src/components/Sidebar.astro',
      Header: './src/components/Header.astro',
      ThemeProvider: './src/components/ThemeProvider.astro',
      Hero: './src/components/Hero.astro',
      ThemeSelect: './src/components/ThemeSelect.astro',
      MarkdownContent: './src/components/MarkdownContent.astro',
    },
  }), vue()],
})
