import { defineStore } from 'pinia'

interface State {
    year: number,
    month: number
}

export const date = defineStore({
    id: "date",
    state: (): State => {
        const date = new Date
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1
        };
    },
    getters: {

    },
    actions: {
        setYear(year: number) {
            this.year = year
        },
        setMonth(month: number) {
            this.month = month
        }
    }
})