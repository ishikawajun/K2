<script setup lang="ts">
import { FwbButton } from 'flowbite-vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { FwbAlert } from 'flowbite-vue'
import { ParamMasterBody, ParamMaster } from '../../stores/interface';

type processFlag = 'Success' | 'Error' | 'None'
type pramEdit = {
    baseAccount: ParamMaster
    basePresent: ParamMaster
}

const getParam = async (): Promise<pramEdit> => {
    const url = `http://${import.meta.env.VITE_BACKEND_URI}:60001/param_master/account-calcu`
    const response = (await axios.get<ParamMasterBody>(url)).data
    return {
        baseAccount: response.paramData.filter(value => value.key === "base-account-amount")[0],
        basePresent: response.paramData.filter(value => value.key === "base-present-amount")[0]
    }
}

const params = ref<pramEdit>(
    {
        baseAccount: {
            category: 'account-calcu',
            key: 'base-account-amount',
        }, basePresent: {
            category: 'account-calcu',
            key: 'base-present-amount',
        }
    }
)
onMounted(async () => {
    params.value = await getParam()
})

const processStatus = ref<processFlag>('None')
let message = ''

const submit = async () => {
    const url = `http://${import.meta.env.VITE_BACKEND_URI}:60001/param_master`

    const body: ParamMaster[] = []
    if (params.value?.baseAccount) body.push(params.value.baseAccount)
    if (params.value?.basePresent) body.push(params.value.basePresent)
    try {
        await axios.post(url, body)
        processStatus.value = 'Success'
    } catch (e) {
        if (axios.isAxiosError(e)) {
            message = e.message
            processStatus.value = 'Error'
        }
    }
}


const onClose = (): void => {
    processStatus.value = 'None'
}
</script>

<template>
    <FwbAlert v-if="processStatus === 'Success'" type="success" @close="onClose()" closable>パラメータマスタの更新に成功しました。
    </FwbAlert>
    <FwbAlert type="danger" v-else-if="processStatus === 'Error'" @close="onClose()" closable>{{ message }}</FwbAlert>
    <div class="container mx-auto">
        <div class="flex justify-center flex-col items-center p-8">
            <h1 class="mb-7 text-3xl font-extrabold leading-none tracking-tight text-gray-900">口座移動金額自動計算パレメータ編集</h1>
            <div class="m-2">
                <label for="account" class="block mb-2 text-lg font-medium text-gray-900">{{
                    params?.baseAccount.paramName
                }}</label>
                <input type="text" id="account" v-model="params.baseAccount.value"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 no-spin">
            </div>
            <div class="m-2">
                <label for="present" class="block mb-2 text-lg font-medium text-gray-900">{{
                    params?.basePresent.paramName
                }}</label>
                <input type="text" id="present" v-model="params.basePresent.value"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 no-spin">
            </div>
            <div class="m-4">
                <FwbButton color="default" @click="submit()">Send</FwbButton>
            </div>

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