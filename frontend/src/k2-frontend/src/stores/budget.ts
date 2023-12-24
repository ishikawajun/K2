import { defineStore } from 'pinia'
import { Budget, AccountMaster } from './interface'
import axios from 'axios'

interface State {
    budget: Budget[];
    isLoading: boolean;
    postMessage: string;
}

interface PostData {
    year: string;
    month: string;
    account: string;
    amount: number
}

export const budget = defineStore({
    id: "budget",
    state: (): State => {
        return {
            budget: [],
            isLoading: true,
            postMessage: ""
        };
    },
    getters: {

    },
    actions: {
        async getBudgetFunc(year: number, month: number) {
            const url = `http://${import.meta.env.VITE_BACKEND_URI}:60001/budget?year=${year}&month=${month}`
            const response = await axios.get(url)
            this.budget = response.data
            this.isLoading = false
        },
        setFuturData(accountMaster: AccountMaster[]) {
            this.budget = []
            for (const master of accountMaster) {
                this.budget.push({ account: master.account_jp, amount: 0 })
            }
        },
        async postBudgetFunc(year: number, month: number) {
            try {
                const postData: PostData[] = []
                for (const budget of this.budget) {
                    postData.push({
                        year: String(year),
                        month: String(month),
                        account: budget.account,
                        amount: budget.amount
                    })
                }
                const url = `http://${import.meta.env.VITE_BACKEND_URI}:60001/budget`
                const response = await axios.post(url, postData)
                this.postMessage = String(response.status)
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    this.postMessage = e.message
                }
            }
        }
    },
})