<script setup lang="ts">
import { TheCard } from 'flowbite-vue'
import { computed } from 'vue';

interface Props {
    title: string;
    content: number;
}
const props = defineProps<Props>();

const textColor = computed(
    () => {
        return props.content >= 0 ? 'text-gray-700' : 'text-red-500'
    }
)

</script>


<template>
    <the-card>
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{{ title }}</h5>
        <p :class="textColor" class="font-normal">
            {{ content }}円
        </p>
    </the-card>
</template>