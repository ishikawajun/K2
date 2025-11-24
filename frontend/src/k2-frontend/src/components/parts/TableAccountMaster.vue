<script setup lang="ts">
import { FwbSpinner, FwbCheckbox, FwbButton, FwbAlert } from 'flowbite-vue'
import { master } from '../../stores/accountMaster'
import Modal from '../parts/Modal.vue'
import type { AccountMaster } from '../../stores/interface'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

const addMasterData = ref<AccountMaster>({ account_en: '', account_jp: '', isEdit: true })

const masterStore = master()
const { accountMaster, isLoading, postMessage } = storeToRefs(masterStore)

onMounted(() => {
    if (!accountMaster.value.length) {
        masterStore.getAccountMasterFunc()
    }
})

const pushStore = () => {
    if (!addMasterData.value.account_en || !addMasterData.value.account_jp) {
        return
    }
    accountMaster.value.push({
        account_en: addMasterData.value.account_en,
        account_jp: addMasterData.value.account_jp,
        isEdit: true
    })
    addMasterData.value = { account_en: '', account_jp: '', isEdit: true }
}

const onClose = (): void => {
    postMessage.value = ''
}

</script>

<template>
    <FwbAlert v-if="postMessage === '201'" type="success" closable @click="onClose()">勘定科目マスタテーブル更新成功
    </FwbAlert>
    <FwbAlert type="danger" v-else-if="postMessage !== ''" @click="onClose()" closable>勘定科目マスタテーブル更新失敗:{{
        postMessage }}</FwbAlert>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        編集
                    </th>
                    <th scope="col" class="px-6 py-3">
                        勘定科目(英)
                    </th>
                    <th scope="col" class="px-6 py-3">
                        勘定科目(日)
                    </th>
                </tr>
            </thead>
            <tbody>
                <FwbSpinner v-if="isLoading" size="12" />
                <tr v-else v-for="masterItem, i in accountMaster" class="bg-white border-b"
                    :key="masterItem.account_en">
                    <td class="px-6 py-4">
                        <fwb-checkbox v-model="masterItem.isEdit" />
                    </td>
                    <th class="px-6 py-4">
                        <input type="text" class="no-spin h-4" v-model="masterItem.account_en"
                            :readonly="!masterItem.isEdit">
                    </th>
                    <td class="px-6 py-4">
                        <input type="text" class="no-spin h-4" v-model="masterItem.account_jp"
                            :readonly="!masterItem.isEdit">
                    </td>
                </tr>
                <tr class="bg-white border-b">
                    <td class="px-6 py-4">
                        <FwbButton @click="pushStore">追加</FwbButton>
                    </td>
                    <th class="px-6 py-4">
                        <input type="text" class="no-spin h-4" v-model="addMasterData.account_en">
                    </th>
                    <td class="px-6 py-4">
                        <input type="text" class="no-spin h-4" v-model="addMasterData.account_jp">
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="p-2">
            <Modal v-on:postAccountData="masterStore.postAccountMasterFunc">Submit</Modal>
        </div>
    </div>
</template>
<style scoped>
.no-spin::-webkit-inner-spin-button,
.no-spin::-webkit-outer-spin-button {
    -webkit-appearance: none !important;
    margin: 0 !important;
}
</style>
