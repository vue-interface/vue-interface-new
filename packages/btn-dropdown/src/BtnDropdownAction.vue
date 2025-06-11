<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        expanded: {
            type: Boolean,
            default: false
        },
        id: {
            type: String,
            default: undefined
        },
        href: {
            type: String,
            default: undefined
        },
        to: {
            type: [String, Object],
            default: undefined
        }
    },
    computed: {
        is() {
            if(this.to) {
                return 'router-link';
            }

            if(this.href) {
                return 'a';
            }

            return 'button';
        },
    }
});
</script>

<template>
    <Component
        :is="is"
        :id="id"
        v-bind="to ? { to } : { href }"
        aria-haspopup="true"
        :aria-expanded="expanded"
        :type="is === 'button' ? 'button': undefined">
        <slot />
    </Component>
</template>