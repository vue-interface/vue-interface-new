import type { Meta, StoryObj } from '@storybook/vue3';
import './btn-group.css';
// type PagePropsAndCustomArgs = ComponentPropsAndSlots<typeof Page> & { footer?: string };
 
const meta = {
    title: 'Example/Btn-Group',
    tags: ['autodocs']
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>

export const ColorVariants = {
    name: 'Color Variants',
    parameters: {
        backgrounds: {
            options: {
                light: { name: 'Light', value: '#fff' },
                dark: { name: 'Dark', value: '#333' },
            },
        },
    },
    render: () => (
        <div class="flex gap-2">
            <button class="btn btn-primary">Primary</button>
            <button class="btn btn-secondary">Secondary</button>
            <button class="btn btn-success">Success</button>
            <button class="btn btn-danger">Danger</button>
            <button class="btn btn-warning">Warning</button>
            <button class="btn btn-info">Info</button>
            <button class="btn btn-light">Light</button>
            <button class="btn btn-dark">Dark</button>
        </div>
    ),
} satisfies Story;