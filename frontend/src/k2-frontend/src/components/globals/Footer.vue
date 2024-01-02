<template>
    <footer class="p-4 bg-slate-900  shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
        <span class="text-sm text-gray-400 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/"
                class="hover:underline">K2-Account</a>. All Rights Reserved.
        </span>
        <ul class="flex flex-wrap items-center mt-3 text-sm text-gray-400 dark:text-gray-400 sm:mt-0">
            <li class="mr-4 hover:underline md:mr-6 ">
                <RouterLink :to="{ name: 'home' }">Home</RouterLink>
            </li>
            <li class="mr-4 hover:underline md:mr-6">
                <RouterLink :to="{ name: 'edit' }">Edit</RouterLink>
            </li>
            <li class="mr-4 hover:underline md:mr-6">
                <RouterLink :to="{ name: 'calcu' }">Calcu</RouterLink>
            </li>
        </ul>
    </footer>
</template>
<script lang="ts" setup>
import { RouterLink } from 'vue-router';
</script>