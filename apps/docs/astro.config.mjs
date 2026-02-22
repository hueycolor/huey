import starlight from '@astrojs/starlight'
// @ts-check
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'My Docs',
      customCss: [
        './src/styles/custom.css',
      ],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/hueycolor/huey' }],
      sidebar: [
        {
          label: 'Overview',
          items: [
            { label: 'Installation', slug: 'overview/installation' },
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
        Header: './src/components/Header.astro',
        ThemeProvider: './src/components/ThemeProvider.astro',
        ThemeSelect: './src/components/ThemeSelect.astro',
      },
    }),
  ],
})
