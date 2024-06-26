<script setup lang="ts">
import { FwbButton } from 'flowbite-vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { FwbAlert } from 'flowbite-vue'
import { PresentData, ParamMasterBody } from '../../stores/interface';

type processFlag = 'Success' | 'Error' | 'None'
type CalucParam = {
    baseAccountAmount: number
    basePresentAmount: number
}

const getParam = async (): Promise<CalucParam> => {
    const url = `http://${import.meta.env.VITE_BACKEND_URI}:60001/param_master/account-calcu`
    const response = (await axios.get<ParamMasterBody>(url)).data
    const accountAmount = response.paramData.filter(value => value.key === "base-account-amount")[0]
    const presentAmount = response.paramData.filter(value => value.key === "base-present-amount")[0]
    return {
        baseAccountAmount: Number(accountAmount.value),
        basePresentAmount: Number(presentAmount.value)
    }
}

const inputBalance = ref(0)
let param: CalucParam = { baseAccountAmount: 0, basePresentAmount: 0 }
onMounted(async () => {
    param = await getParam()
    inputBalance.value = param.baseAccountAmount
})

const processStatus = ref<processFlag>('None')
const inputPresent = ref(0)
const inputCard = ref(0)
let message = ''


const calculation = async () => {
    const date = new Date
    const thisYear = String(date.getFullYear())
    const thisMonth = String(date.getMonth() + 1)
    const urlBL = `http://${import.meta.env.VITE_BACKEND_URI}:60001/aggregation?year=${thisYear}&month=${thisMonth}`
    const responseBL = await axios.get(urlBL)
    const balance = responseBL.data.balance

    const nextDate = new Date(date.getFullYear(), date.getMonth() + 1)
    const nextYear = String(nextDate.getFullYear())
    const nextMonth = String(nextDate.getMonth() + 1)
    const urlBG = `http://${import.meta.env.VITE_BACKEND_URI}:60001/aggregation?year=${nextYear}&month=${nextMonth}`
    const responseBG = await axios.get(urlBG)
    const budget = responseBG.data.budget

    const accountAmount = inputBalance.value - param.baseAccountAmount
    if (accountAmount > 0 && accountAmount - inputCard.value > 0) {

        const settingPresent = param.basePresentAmount
        const postPresent = settingPresent - inputPresent.value
        const postMoveAmount = balance + inputCard.value
        const postInvetment = accountAmount - budget - Math.max(postMoveAmount, 0) - Math.max(postPresent, 0)

        const postMessage = {
            'message': "\n 貯蓄口座移動代金：" + String(postMoveAmount) + "円\n プレゼント口座移動代金：" + String(postPresent) + "円\n 投資金額：" + String(postInvetment) + "円"
        }
        const urlLine = '/api/notify'
        const headers = {
            'Authorization': 'Bearer ' + import.meta.env.VITE_LINE_TOKEN,
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        const formattedDate = thisMonth.length === 2 ? Number(thisYear + thisMonth) : Number(thisYear + '0' + thisMonth)
        const presentData: PresentData = {
            depositDate: formattedDate,
            amount: postPresent
        }
        const urlPresent = `/proxy/present`
        try {
            await axios.post(urlLine, postMessage, { headers: headers })
            await axios.post(urlPresent, presentData)
            processStatus.value = 'Success'
        } catch (e) {
            if (axios.isAxiosError(e)) {
                message = e.message
                processStatus.value = 'Error'
            }
        }


    } else if (accountAmount > 0 && accountAmount - inputCard.value < 0) {
        message = `クレカ代を引くと${param.baseAccountAmount}円以下になります。`
        processStatus.value = 'Error'
    } else {
        message = `残高が${param.baseAccountAmount}円以上になるよう調整してください。`
        processStatus.value = 'Error'
    }

}

const onClose = (): void => {
    processStatus.value = 'None'
}
</script>

<template>
    <FwbAlert v-if="processStatus === 'Success'" type="success" @close="onClose()" closable>口座移動金額をLineに送信しました。
    </FwbAlert>
    <FwbAlert type="danger" v-else-if="processStatus === 'Error'" @close="onClose()" closable>{{ message }}</FwbAlert>
    <div class="container mx-auto">
        <div class="flex justify-center flex-col items-center p-8">
            <h1 class="mb-7 text-3xl font-extrabold leading-none tracking-tight text-gray-900">口座移動金額自動計算ツール</h1>
            <div class="m-2">
                <label for="balance" class="block mb-2 text-lg font-medium text-gray-900">口座残高</label>
                <input type="number" id="balance" v-model="inputBalance"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 no-spin">
            </div>
            <div class="m-2">
                <label for="present" class="block mb-2 text-lg font-medium text-gray-900">プレゼント代</label>
                <input type="number" id="present" v-model="inputPresent"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 no-spin">
            </div>
            <div class="m-2">
                <label for="card" class="block mb-2 text-lg font-medium text-gray-900">今月のクレカ代</label>
                <input type="number" id="card" v-model="inputCard"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 no-spin">
            </div>
            <div class="m-4">
                <FwbButton color="default" @click="calculation()">Send</FwbButton>
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