/* eslint-disable no-console */
import { convert, deserialize, OKLCH, sRGB } from '@texel/color'
import { hueyColor, isHex, isHsl, isLch, isOklch, isRgb } from './core.ts'
import { setupCounter } from './counter.ts'
import typescriptLogo from './typescript.svg'
import './style.css'
import viteLogo from '/vite.svg'

const color = hueyColor('rgba(244, 100, 20)')

console.log(color.getFormat())

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
