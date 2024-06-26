<template>
    <nav :class="navbarClasses">
        <div class="container flex flex-wrap justify-between items-center mx-auto">
            <slot name="logo" />
            <button @click="toggleMobileMenu()" type="button"
                class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                aria-controls="navbar-default" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <slot name="menu-icon">
                    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clip-rule="evenodd"></path>
                    </svg>
                </slot>
            </button>
            <slot name="default" :isShowMenu="isShowMenu" />
            <div v-if="slots['right-side']" class="flex md:order-2 md:flex">
                <slot name="right-side" />
            </div>
        </div>
    </nav>
</template>
<script lang="ts" setup>
import { useSlots, ref, computed } from 'vue'
import { breakpointsTailwind, useBreakpoints, useToggle } from '@vueuse/core'
import classNames from 'classnames'
const props = defineProps({
    sticky: {
        type: Boolean,
        default: false,
    },
    rounded: {
        type: Boolean,
        default: false,
    },
    solid: {
        type: Boolean,
        default: false,
    },
})
const slots = useSlots()
const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smaller('md')
const isShowMenuOnMobile = ref(false)
const toggleMobileMenu = useToggle(isShowMenuOnMobile)
const navbarBaseClasses = 'bg-cyan-200'
const navbarFloatClasses = 'fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600'
const navbarRoundedClasses = 'rounded'
const navbarSolidClasses = 'p-3 bg-gray-50 dark:bg-gray-800 dark:border-gray-700'
const navbarWhiteClasses = 'px-2 sm:px-4 py-2.5 dark:bg-gray-900'
const navbarClasses = computed(() => {
    return classNames(
        navbarBaseClasses,
        props.sticky ? navbarFloatClasses : '',
        props.rounded ? navbarRoundedClasses : '',
        props.solid ? navbarSolidClasses : navbarWhiteClasses,
    )
})
const isShowMenu = computed(() => {
    if (!isMobile) {
        return true
    } else {
        return isShowMenuOnMobile.value
    }
})
</script>