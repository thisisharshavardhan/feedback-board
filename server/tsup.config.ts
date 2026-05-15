import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts'],
  format: ['cjs'],
  outDir: 'dist',
  platform: 'node',
  external: [/^node:/],
  clean: true,
});
