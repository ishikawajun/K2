<script setup lang="ts">
import { FwbCard } from 'flowbite-vue'

interface Props {
    id: string;
    title: string;
}
const props = defineProps<Props>();

interface Emits {
    (event: "showTable", id: string): string;
}
const emit = defineEmits<Emits>()

const showTable = () => {
    emit("showTable", props.id)
}

</script>


<template>
    <fwb-card @click="showTable">
        <div class="p-5">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{{ title }}</h5>
        </div>
    </fwb-card>
</template>