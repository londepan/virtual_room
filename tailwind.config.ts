import type { Config } from "tailwindcss"
const config: Config = {
  darkMode: 'class',
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { colors: { macias: { DEFAULT:"#f36f21", light:"#fde7d7", dark:"#c94e0f" } }, borderColor: { macias:"#f36f21" } } },
  plugins: []
}
export default config
