<template lang="">
    <div>
            <div class='fixed inset-0 z-40  bg-black bg-opacity-50' >
                <div class="fixed z-50 flex w-full h-full justify-center items-center p-4" >
                    <div class='bg-white flex flex-col rounded-lg p-4 w-full max-w-4xl max-h-full shadow '>
                        <div class='w-full flex justify-end mb-2'>
                            <div class='text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 inline-flex justify-center items-center' 
                            @click="closeModal">
                                <font-awesome-icon v-if="isClient" :icon="['fas', 'xmark']"
                                color="black" />
                            </div>
                        </div>
                        <div class='flex flex-col md:flex-row space-x-2 w-full justify-between overflow-y-auto overflow-x-hidden scrollbar scrollbar-thumb-gray-300  scrollbar-track-gray-100 scrollbar-thin'>
                           <slot></slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faXmark);
export default {
    components: {
        FontAwesomeIcon
    },
    data () {
        return {
            isClient: false,  // Menandakan bahwa kita belum di sisi klien
        };
    },
    mounted() {
        if (process.client) {
            this.isClient = true;  // Menandakan bahwa kita di sisi klien
        }
    },
    methods: {
        closeModal() {
            this.$emit('close');
        }
    }
}
</script>
<style lang="">
    
</style>