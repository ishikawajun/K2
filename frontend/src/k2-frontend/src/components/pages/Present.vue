<script setup lang="ts">
import TablePresent from '../parts/TablePresent.vue'
import Card from '../parts/Card.vue'
import { present } from '../../stores/present'
import { FwbSpinner } from 'flowbite-vue'
import Modal from '../parts/Modal.vue'
import { FwbAlert } from 'flowbite-vue'

const presentStore = present()

const onClose = (): void => {
    presentStore.postMessage = ''
}

</script>

<template>
    <FwbAlert v-if="presentStore.postMessage === '201'" type="success" closable @click="onClose()">プレセントテーブル更新成功</FwbAlert>
    <FwbAlert type="danger" v-else-if="presentStore.postMessage !== ''" @click="onClose()" closable>プレゼントテーブル更新失敗:{{
        presentStore.postMessage }}
    </FwbAlert>
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
                <div class="p-2">
                    <Modal v-on:postAccountData="presentStore.putPresentFunc">Submit</Modal>
                </div>
            </div>
        </div>
    </div>
</template>