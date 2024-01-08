<script setup lang="ts">
import TablePresent from '../parts/TablePresent.vue'
import Card from '../parts/Card.vue'
import { present } from '../../stores/present'
import { FwbSpinner } from 'flowbite-vue'

const presentStore = present()

</script>

<template>
    <div class="container mx-auto">
        <div class="flex flex-row space-x-4 space-x overflow-x-auto p-2">
            <div class="py-5">
                <FwbSpinner v-if="presentStore.isLoading" size="8" />
                <Card v-else title="口座残高" :content="presentStore.aggregation" />
            </div>
        </div>
        <div class="flex flex-row flex-wrap">
            <div class="p-3 overflow-x-auto mb-5">
                <TablePresent />
            </div>
        </div>
    </div>
</template>