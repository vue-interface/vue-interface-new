/** @type { import('@storybook/html-vite').Preview } */
import '../css/colors.css';
import '../css/sizes.css';
import '../packages/btn/btn.css';

const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;