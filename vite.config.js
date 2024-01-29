import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './src/main.js', // Replace with the path to your entry file
      },
    },
  },
  publicDir: 'public',
  base: '/marcy_RecipeWizard/',
});