import { defineStore } from 'pinia'
import { PresentData } from './interface'
import axios from 'axios'
import { Ref, ref } from 'vue';

interface State {
    aggregation: Ref<number>
    presents: Ref<PresentData[]>
    isLoading: Ref<boolean>
    postMessage: Ref<string>
}

interface GetPresentResponse {
    aggregation: number
    presentData: PresentData[]
}

export const present = defineStore({
    id: "present",
    state: (): State => {
        return {
            aggregation: ref(0),
            presents: ref<PresentData[]>([]),
            isLoading: ref(true),
            postMessage: ref(""),
        };
    },
    getters: {

    },
    actions: {
        async getPresentFunc() {
            const url = `http://${import.meta.env.VITE_BACKEND_URI}:60001/present`
            const response: GetPresentResponse = (await axios.get(url)).data
            this.presents = response.presentData
            this.aggregation = response.aggregation
            this.isLoading = false
        },
        // setFuturData(accountMaster: AccountMaster[]) {
        //     this.budget = []
        //     for (const master of accountMaster) {
        //         this.budget.push({ account: master.account_jp, amount: 0 })
        //     }
        // },
        // async postBudgetFunc(year: number, month: number) {
        //     try {
        //         const postData: PostData[] = []
        //         for (const budget of this.budget) {
        //             postData.push({
        //                 year: String(year),
        //                 month: String(month),
        //                 account: budget.account,
        //                 amount: budget.amount
        //             })
        //         }
        //         const url = `http://${import.meta.env.VITE_BACKEND_URI}:60001/budget`
        //         const response = await axios.post(url, postData)
        //         this.postMessage = String(response.status)
        //     } catch (e) {
        //         if (axios.isAxiosError(e)) {
        //             this.postMessage = e.message
        //         }
        //     }
        // }
    },
})