import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta = {
    title: 'Example/Test',
    tags: ['autodocs']
};

type Story = StoryObj<typeof meta>
export const BasicTest: Story = {
    render: () => (
        <button>Hello World</button>
)
};
