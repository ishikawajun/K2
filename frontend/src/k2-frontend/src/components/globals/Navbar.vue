<script setup lang="ts">
import { NavbarLogo, NavbarCollapse } from 'flowbite-vue'
import Navbar from '../parts/NavbarBase.vue'
import { RouterLink } from 'vue-router';

interface IsActive {
    home: string;
    edit: string;
    calcu: string;
    [key: string]: string;
}
const activeColor = 'block py-2 pr-4 pl-3 rounded md:p-0 bg-blue-700 md:bg-transparent text-white md:text-blue-700'
const disactiveColr = 'block py-2 pr-4 pl-3 rounded md:p-0 text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700'
const active: IsActive = {
    home: activeColor,
    edit: disactiveColr,
    calcu: disactiveColr,
}

const onClick = (link: string): void => {
    for (const key in active) {
        active[key] = disactiveColr;
    }
    active[link] = activeColor;
}

</script>
<template>
    <Navbar>
        <template #logo>
            <RouterLink :to="{ name: 'home' }">
                <NavbarLogo alt="Flowbite logo" image-url="https://flowbite.com/docs/images/logo.svg">
                    K2-Account
                </NavbarLogo>
            </RouterLink>
        </template>
        <template #default="{ isShowMenu }">
            <NavbarCollapse :isShowMenu="isShowMenu">
                <RouterLink :to="{ name: 'home' }">
                    <li @click="onClick('home')" :class="active.home">Home</li>
                </RouterLink>
                <RouterLink :to="{ name: 'edit' }">
                    <li @click="onClick('edit')" :class="active.edit">Edit</li>
                </RouterLink>
                <RouterLink :to="{ name: 'calcu' }">
                    <li @click="onClick('calcu')" :class="active.calcu">Calcu</li>
                </RouterLink>
            </NavbarCollapse>
        </template>
    </Navbar>
</template>