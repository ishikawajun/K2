<script setup lang="ts">
import { Modal } from 'flowbite-vue'
import { ref } from 'vue'

interface Emits {
    (event: "postAccountData"): void
}
const emit = defineEmits<Emits>()

const isShowModal = ref(false)
function closeModal() {
    isShowModal.value = false
}
function showModal() {
    isShowModal.value = true
}

const onAccept = (): void => {
    emit('postAccountData')
    closeModal()
}
</script>
<template>
    <button @click="showModal" type="button"
        class="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Send
    </button>
    <Modal size="xs" v-if="isShowModal" @close="closeModal">
        <template #header>
            <div class="flex items-center text-lg">
                最終確認
            </div>
        </template>
        <template #body>
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                本当に更新しても大丈夫？
            </p>
        </template>
        <template #footer>
            <div class="flex justify-between">
                <button @click="closeModal" type="button"
                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                    Cancel
                </button>
                <button @click="onAccept" type="button"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    I accept
                </button>
            </div>
        </template>
    </Modal>
</template>