import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import typescript from '@rollup/plugin-typescript';
export default defineConfig({
  plugins: [react()],
  appType: 'custom',
  build: {
    lib: {
      entry: './src/LocationPicker.tsx',
      name: 'LocationPicker',
      fileName: 'LocationPicker',
    },
    rollupOptions: {
      external: [
        'react',
        'mapbox-gl',
        '@mapbox/mapbox-gl-geocoder',
        'react-map-gl',
      ],
      output: {
        globals: {
          react: 'React',
          ['mapbox-gl']: 'mapbox',
          ['@mapbox/mapbox-gl-geocoder']: 'MapboxGeocoder',
          ['react-map-gl']: 'Mapbox',
        },
      },
      plugins: [
        typescript({
          target: 'es2020',
          rootDir: './src',
          declaration: true,
          exclude: '**/*.stories.*',
          declarationDir: './dist',
        }),
      ],
    },
  },
});
