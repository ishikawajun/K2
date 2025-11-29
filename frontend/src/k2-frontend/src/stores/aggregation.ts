import { defineStore } from 'pinia'
import type { AggregationType } from './interface'
import axios from 'axios'

interface State {
    aggregation: AggregationType
    isLoading: boolean
}

export const aggregation = defineStore("aggregation", {
    state: (): State => ({
        aggregation: {
            budget: 0,
            consum: 0,
            balance: 0
        },
        isLoading: false
    }),
    actions: {
        async getAggregationFunc(year: number, month: number) {
            this.isLoading = true
            try {
                const url = `http://${import.meta.env.VITE_BACKEND_URI}:60001/aggregation?year=${year}&month=${month}`
                const { data } = await axios.get<AggregationType>(url)
                this.aggregation = data
            } catch (error) {
                this.aggregation = {
                    budget: 0,
                    consum: 0,
                    balance: 0
                }
                console.error(error)
            } finally {
                this.isLoading = false
            }
        }
    }
})