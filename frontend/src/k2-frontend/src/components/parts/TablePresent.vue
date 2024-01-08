<script setup lang="ts">
import { FwbSpinner, FwbCheckbox } from 'flowbite-vue'
import { present } from '../../stores/present'

const presentStore = present()
presentStore.getPresentFunc()

</script>

<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        編集
                    </th>
                    <th scope="col" class="px-6 py-3">
                        年月
                    </th>
                    <th scope="col" class="px-6 py-3">
                        金額
                    </th>
                    <th scope="col" class="px-6 py-3">
                        備考
                    </th>
                </tr>
            </thead>
            <tbody>
                <FwbSpinner v-if="presentStore.isLoading" size="12" />
                <tr v-else v-for="present, i in presentStore.presents"
                    :class="{ 'bg-white border-b': i % 2 === 0, 'bg-gray-50 border-b': i % 2 !== 0 }"
                    :key="present.depositDate">
                    <td class="px-6 py-4">
                        <fwb-checkbox v-model="present.isEdit" />
                    </td>
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {{ Math.floor(present.depositDate / 100) + "-" + Math.floor(present.depositDate % 100) }}
                    </th>
                    <td class="px-6 py-4">
                        <input type="number" class="no-spin h-4" v-model="present.amount" :readonly="!present.isEdit">円
                    </td>
                    <td class="px-6 py-4">
                        <input class="h-4" v-model="present.note" :readonly="!present.isEdit">
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style scoped>
.no-spin::-webkit-inner-spin-button,
.no-spin::-webkit-outer-spin-button {
    -webkit-appearance: none !important;
    margin: 0 !important;
}
</style>
