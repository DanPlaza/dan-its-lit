import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fileURLToPath } from 'url';
import {playwrightLauncher} from '@web/test-runner-playwright';
import image from '@rollup/plugin-image';
import { rollupAdapter } from '@web/dev-server-rollup';

const mode = process.env.MODE || 'dev';
if (!['dev', 'prod'].includes(mode)) {
  throw new Error(`MODE must be "dev" or "prod", was "${mode}"`);
}

const browsers = {
  // Local browser testing via playwright
  // ===========
  chromium: playwrightLauncher({product: 'chromium'}),
  firefox: playwrightLauncher({product: 'firefox'}),
  webkit: playwrightLauncher({product: 'webkit'}),
};

const noBrowser = (b) => {
  throw new Error(`No browser configured named '${b}'; using defaults`);
};

let commandLineBrowsers;
try {
  commandLineBrowsers = process.env.BROWSERS?.split(',').map(
    (b) => browsers[b] ?? noBrowser(b)
  );
} catch (e) {
  console.warn(e);
}

export default {
  rootDir: '.',
  files: ['test/**/*.test.ts', 'test/**/*.spec.ts'],
  plugins: [
    esbuildPlugin({
      ts: true,
      tsconfig: fileURLToPath(new URL('./tsconfig.json', import.meta.url)),
    }),
    rollupAdapter(image()),
  ],
  nodeResolve: {exportConditions: mode === 'dev' ? ['development'] : []},
  browsers: commandLineBrowsers ?? Object.values(browsers),
};