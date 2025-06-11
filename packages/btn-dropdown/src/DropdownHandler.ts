import { createPopper, Placement } from '@popperjs/core';
import { Btn } from '@vue-interface/btn';
import { BtnGroup } from '@vue-interface/btn-group';
import { DropdownMenu } from '@vue-interface/dropdown-menu';
import { defineComponent } from 'vue';
import BtnDropdownAction from './BtnDropdownAction.vue';

export default defineComponent({

    components: {
        BtnDropdownAction,
        BtnGroup,
        DropdownMenu
    },

    extends: Btn,

    props: {

        /**
         * Display the dropdown menu aligned left or right
         *
         * @property String
         */
        align: {
            type: String,
            default: 'left',
            validate(value: any) {
                return ['left', 'right'].indexOf(value.toLowerCase()) !== -1;
            }
        },

        /**
         * Should animate the dropdown opening.
         *
         * @property {Boolean}
         */
        animated: {
            type: Boolean,
            default: true
        },

        /**
         * Additional button classes.
         * 
         * @property {Object|String}
         */
        buttonClass: [Object, String],

        /**
         * Show the caret.
         *
         * @property {Boolean}
         */
        caret: {
            type: Boolean,
            default: true
        },

        /**
         * Should display the toggle button as a circle.
         *
         * @property Boolean
         */
        
        // circle: {
        //     type: Boolean,
        //     default: false
        // },

        /**
         * Display as a dropup instead of a dropdown.
         *
         * @property Boolean
         */
        dropup: {
            type: Boolean,
            default: false
        },

        /**
         * Display as a dropright instead of a dropdown.
         *
         * @property Boolean
         */
        dropright: {
            type: Boolean,
            default: false
        },

        /**
         * Display as a dropleft instead of a dropdown.
         *
         * @property Boolean
         */
        dropleft: {
            type: Boolean,
            default: false
        },

        /**
         * The action height.
         *
         * @property {String}
         */
        height: String,

        /**
         * The href action.
         *
         * @property {String}
         */
        href: String,

        /**
         * Is the dropdown a nav item?
         *
         * @property {Boolean}
         */
        nav: Boolean,

        /**
         * The toggle button's label. If not defined as an attribute,
         * you can override with the component's slot (inner html).
         *
         * @property {String}
         */
        label: String,

        offset: {
            type: Number,
            default: 5,
        },

        /**
         * Should rotate the toggle button when opened.
         *
         * @property {Boolean}
         */
        rotate: {
            type: Boolean,
            default: false
        },

        /**
         * Display the dropdown button with a split toggle button.
         *
         * @property {Boolean}
         */
        split: {
            type: Boolean,
            default: false
        },

        /**
         * The "to" path, used for vue-router.
         *
         * @property {String|Object}
         */
        to: [String, Object],

        /**
         * The button type attribute.
         *
         * @property {String}
         */
        type: {
            type: String,
            default: 'button'
        },

        /**
         * The action width.
         *
         * @property {String}
         */
        width: String,

    },

    emits: [
        'click-toggle',
        'show',
        'hide',
        'toggle'
    ],

    data() {
        return {
            popper: null,
            triggerAnimation: false,
            expanded: false
        };
    },

    computed: {
        scope() {
            return {
                // Pass the computed props.
                placement: this.placement,
                variantClassPrefix: this.variantClassPrefix,
                sizeableClassPrefix: this.sizeableClassPrefix,
                classes: this.classes,
                actionClasses: this.actionClasses,
                toggleStyle: this.toggleStyle,
                toggleClasses: this.toggleClasses,
                
                // Pass the methods                
                focus: this.focus,
                queryFocusable: this.queryFocusable,
                isFocusable: this.isFocusable,
                toggle: this.toggle,
                show: this.show,
                hide: this.hide,
                onBlur: this.onBlur,
                onClickItem: this.onClickItem,
                onClickToggle: this.onClickToggle,
                expanded: this.expanded
            };
        },

        placement() {
            if(this.dropup) {
                return 'top';
            }

            if(this.dropleft) {
                return 'left';
            }

            if(this.dropright) {
                return 'right';
            }

            return 'bottom';
        },

        variantClassPrefix() {
            return 'btn' + (this.outline ? '-outline' : '');
        },

        sizeableClassPrefix() {
            return 'btn';
        },

        classes() {
            return {
                'dropdown': this.dropup && this.dropright && this.dropleft,
                'dropup': this.dropup,
                'dropright': this.dropright,
                'dropleft': this.dropleft,
                'icon-only': !this.nav && !this.split && !!this.$slots.icon && !this.$slots.label,
                'hide-caret': !this.caret,
                'expanded': this.expanded,
                'rotate-90': !this.nav && this.split && this.rotate && this.expanded,
            };
        },

        actionClasses() {
            return Object.assign({
                'btn': !this.nav,
                [this.variantClass]: !this.nav && !!this.variant,
                [this.sizeableClass]: !!this.size,
            }, typeof this.buttonClass === 'object' ? this.buttonClass : {
                [this.buttonClass]: !!this.buttonClass
            });
        },

        toggleStyle() {
            return {
                width: this.width,
                height: this.height,
            };
        },

        toggleClasses() {
            return Object.assign({
                'active': this.active,
                'btn': !this.nav,
                'btn-block': !!this.block,
                'nav-link': !!this.nav,
                'rotate-90': !this.split && this.rotate && this.expanded,
                'dropdown-toggle': true,
                'dropdown-toggle-split': !this.nav && this.split,
                [this.variantClass]: !this.nav && !!this.variant,
                [this.sizeableClass]: !!this.size,
            }, typeof this.buttonClass === 'object' ? this.buttonClass : {
                [this.buttonClass]: !!this.buttonClass
            });
        }
    },

    watch: {
        expanded(value: any) {
            this.$nextTick(() => {
                this.$emit(value ? 'show' : 'hide');
                this.$emit('toggle', value);
            });
            
            setTimeout(() => {
                if(value) {
                    document.addEventListener('click', this.onClickDocument);
                }
                else {
                    document.removeEventListener('click', this.onClickDocument);
                }
            });
        }
    },

    beforeUnmount() {
        this.popper && this.popper.destroy();
    },

    methods: {

        /**
         * Focus on the the dropdown toggle button
         *
         * @return void
         */
        focus() {
            this.$el?.querySelector('.dropdown-toggle').focus();
        },

        /**
         * Focus on the the dropdown toggle button
         *
         * @return void
         */
        queryFocusable() {
            return this.$el?.querySelector('.dropdown-menu').querySelectorAll('label, input, select, textarea, [tabindex]:not([tabindex="-1"])');
        },

        /**
         * Method to check if the given element is focusable.
         *
         * @return void
         */
        isFocusable(element: any) {
            const nodes = this.queryFocusable();

            for(const i in nodes) {
                if(element === nodes[i]) {
                    return true;
                }
            }

            return false;
        },

        /**
         * Toggle the dropdown menu
         *
         * @return void
         */
        toggle() {
            !this.expanded ? this.show() : this.hide();
        },

        /**
         * Show the dropdown menu
         *
         * @return void
         */
        show() {
            this.expanded = true;

            const target = this.$refs.split && this.$refs.split?.$el || this.$el;

            if(!this.nav && !this.popper) {
                this.popper = createPopper(target, this.$refs.menu?.$el, {
                    placement: <Placement> `${this.placement}-${this.align === 'left' ? 'start' : 'end'}`,
                    onFirstUpdate: () => {
                        this.triggerAnimation = this.animated;
                    },
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, !this.nav ? this.offset : 1]
                                // offset: ['.125rem', !this.nav ? 4 : 1],
                            },
                        },
                    ]
                });
            }
            else if(this.popper) {
                this.popper.update();
            }
        },

        /**
         * Hide the dropdown menu
         *
         * @return void
         */
        hide() {
            this.expanded = false;
        },

        /**
         * A callback function for the `blur-item` event.
         *
         * @return void
         */
        onBlur(e: any) {
            if(this.$refs.menu && !this.$refs.menu?.$el.contains(e.relatedTarget) || !this?.$el.contains(e.relatedTarget)) {
                this.hide();
            }
        },

        onClickDocument(e: Event) {
            if(!this?.$el.contains(e.target)) {
                this.hide();
            }
        },

        /**
         * A callback function for the `click-item` event.
         *
         * @return void
         */
        onClickItem(e: any) {
            if(!this.isFocusable(e.target)) {
                this.hide();
            }
        },

        /**
         * A callback function for the `click-toggle` event.
         *
         * @return void
         */
        onClickToggle(e: any) {
            e.target.dispatchEvent(new Event('focus', e));
            
            this.$emit('click-toggle', e);

            if(!e.defaultPrevented) {
                this.toggle();
            }
        },

        onKeydown(e: any) {
            if(e.target.parentElement.lastElementChild === e.target) {
                this.hide();
            }
        }

    }

});