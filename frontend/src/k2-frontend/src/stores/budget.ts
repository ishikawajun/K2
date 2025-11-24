import { defineStore } from 'pinia'
import type { Budget, AccountMaster } from './interface'
import axios from 'axios'

interface State {
    budget: Budget[]
    isLoading: boolean
    postMessage: string
}

interface PostData {
    year: string
    month: string
    account: string
    amount: number
}

export const budget = defineStore({
    id: 'budget',
    state: (): State => ({
        budget: [],
        isLoading: false,
        postMessage: ''
    }),
    actions: {
        async getBudgetFunc(year: number, month: number) {
            this.isLoading = true
            try {
                const url = `http://${import.meta.env.VITE_BACKEND_URI}:60001/budget?year=${year}&month=${month}`
                const { data } = await axios.get<Budget[]>(url)
                this.budget = data ?? []
            } catch (error) {
                this.budget = []
                console.error(error)
            } finally {
                this.isLoading = false
            }
        },
        setFutureData(accountMaster: AccountMaster[]) {
            this.budget = accountMaster.map((master) => ({
                account: master.account_jp,
                amount: 0
            }))
            this.isLoading = false
        },
        setFuturData(accountMaster: AccountMaster[]) {
            this.setFutureData(accountMaster)
        },
        async postBudgetFunc(year: number, month: number) {
            this.postMessage = ''
            try {
                const postData: PostData[] = this.budget.map((budget) => ({
                    year: String(year),
                    month: String(month),
                    account: budget.account,
                    amount: budget.amount
                }))
                if (!postData.length) {
                    return
                }
                const url = `http://${import.meta.env.VITE_BACKEND_URI}:60001/budget`
                const { status } = await axios.post(url, postData)
                this.postMessage = String(status)
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    this.postMessage = error.message
                } else {
                    this.postMessage = String(error)
                }
                console.error(error)
            }
        }
    }
})
