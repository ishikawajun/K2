import { defineStore } from 'pinia'
import type { PresentData } from './interface'
import axios from 'axios'

interface State {
    aggregation: number
    presents: PresentData[]
    isLoading: boolean
    postMessage: string
}

interface GetPresentResponse {
    aggregation: number
    presentData: PresentData[]
}

interface PostPresentRequest {
    presentData: PresentData[]
}

export const present = defineStore({
    id: "present",
    state: (): State => ({
        aggregation: 0,
        presents: [],
        isLoading: false,
        postMessage: "",
    }),
    actions: {
        async getPresentFunc() {
            this.isLoading = true
            try {
                const url = `/proxy/present`
                const { data } = await axios.get<GetPresentResponse>(url)
                this.presents = data.presentData ?? []
                this.aggregation = data.aggregation ?? 0
            } catch (error) {
                this.presents = []
                this.aggregation = 0
                console.error(error)
            } finally {
                this.isLoading = false
            }
        },
        async putPresentFunc() {
            this.postMessage = ""
            try {
                const postPresentRequest: PostPresentRequest = { presentData: [] }
                for (const present of this.presents) {
                    if (present.isEdit) {
                        postPresentRequest.presentData.push({
                            depositDate: present.depositDate,
                            amount: present.amount,
                            note: present.note
                        })
                        present.isEdit = false
                    }
                }
                if (!postPresentRequest.presentData.length) {
                    return
                }
                const url = `/proxy/present`
                const { status } = await axios.put(url, postPresentRequest)
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
    },
})