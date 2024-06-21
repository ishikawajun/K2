<script setup lang="ts">
import { FwbSpinner, FwbCheckbox, FwbButton, FwbAlert } from 'flowbite-vue'
import { master } from '../../stores/accountMaster'
import Modal from '../parts/Modal.vue'
import { AccountMaster } from '../../stores/interface'
import { ref } from 'vue'

const addMasterData = ref<AccountMaster>({ account_en: '', account_jp: '' })

const masterData = master()
masterData.getAccountMastergetFunc()

const pushStore = () => {
    addMasterData.value.isEdit = true
    masterData.accountMaster.push(addMasterData.value)
    addMasterData.value =
        { account_en: '', account_jp: '', isEdit: false }
}

const onClose = (): void => {
    masterData.postMessage = ''
}


</script>

<template>
    <FwbAlert v-if="masterData.postMessage === '201'" type="success" closable @click="onClose()">勘定科目マスタテーブル更新成功
    </FwbAlert>
    <FwbAlert type="danger" v-else-if="masterData.postMessage !== ''" @click="onClose()" closable>勘定科目マスタテーブル更新失敗:{{
        masterData.postMessage }}</FwbAlert>
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
                <FwbSpinner v-if="masterData.isLoading" size="12" />
                <tr v-else v-for="master, i in masterData.accountMaster" class="bg-white border-b"
                    :key="master.account_en">
                    <td class="px-6 py-4">
                        <fwb-checkbox v-model:model-value="master.isEdit" />
                    </td>
                    <th class="px-6 py-4">
                        <input type="text" class="no-spin h-4" v-model="master.account_en" :readonly="!master.isEdit">
                    </th>
                    <td class="px-6 py-4">
                        <input type="text" class="no-spin h-4" v-model="master.account_jp" :readonly="!master.isEdit">
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
            <Modal v-on:postAccountData="masterData.postAccountMasterFunc">Submit</Modal>
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
