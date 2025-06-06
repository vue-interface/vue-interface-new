import { join, dirname } from "path";
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

/**
* This function is used to resolve the absolute path of a package.
* It is needed in projects that use Yarn PnP or are set up within a monorepo.
*/
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')))
}

/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  "stories": [
    "../packages/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-themes')
  ],
  "framework": {
    "name": getAbsolutePath('@storybook/html-vite'),
    "options": {}
  },
  viteFinal: async (config) => {
    config.css = config.css || {};
    config.css.postcss = {
      plugins: [
        tailwindcss(), 
        autoprefixer()
      ],
    };
    return config;
  }
};
export default config;