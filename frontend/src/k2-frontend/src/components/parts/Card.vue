<script setup lang="ts">
import { FwbCard } from 'flowbite-vue'
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
    <fwb-card>
        <div class="p-5">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{{ title }}</h5>
            <p :class="textColor" class="font-normal">
                {{ content }}円
            </p>
        </div>
    </fwb-card>
</template>