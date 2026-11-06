import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// React + Tailwind CSS 4 (plugin oficial do Vite)
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
