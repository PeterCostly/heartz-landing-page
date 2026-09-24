import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Production site URL is configuration-driven via the SITE environment variable
  site: process.env.SITE || 'https://heartz.app',
  build: {
    format: 'directory'
  }
});
