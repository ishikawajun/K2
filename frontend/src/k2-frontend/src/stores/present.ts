import { defineStore } from 'pinia'
import { PresentData } from './interface'
import axios from 'axios'
import { Ref, ref } from 'vue'

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

interface PostPresentRequest {
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
            const url = `/proxy/present`
            const response: GetPresentResponse = (await axios.get(url)).data
            this.presents = response.presentData
            this.aggregation = response.aggregation
            this.isLoading = false
        },
        async putPresentFunc() {
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
                const url = `/proxy/present`
                const response = await axios.put(url, postPresentRequest)
                this.postMessage = String(response.status)
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    this.postMessage = e.message
                } else {
                    this.postMessage = String(e)
                }
            }
        }
    },
})