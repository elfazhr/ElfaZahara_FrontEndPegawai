<template>
    <form class="w-full flex flex-col gap-4" @submit.prevent="handleLogin">
        <InputForm :type="'email'" :name="'email'" :placeholder="'example@gmail.com'" :judulLabel="'Email'"
            :value="formData.email" :onChange="handleInputChange">
            <p class="text-red-600 text-xs">*</p>
        </InputForm>

        <div class="relative">
            <InputForm :type="showPassword ? 'text' : 'password'" :name="'password'" :placeholder="'****'"
                :judulLabel="'Password'" :value="formData.password" :onChange="handleInputChange">
                <p class="text-red-600 text-xs">*</p>
            </InputForm>

            <div class="bottom-2 right-3 absolute text-hijau cursor-pointer" @click="togglePasswordVisibility">
                <!-- Render hanya di client-side -->
                <font-awesome-icon v-if="isClient" :icon="showPassword ? ['fas', 'eye-slash'] : ['fas', 'eye']"
                    color="gray" />
            </div>
        </div>

        <Button :bgColor="'bg-blue-600 text-white hover:bg-blue-800 transition-colors text-sm mt-2'" :type="'submit'">
            {{ loading ? 'Loading...' : 'Sign In' }}
        </Button>
        <p v-if="errorMessage" class="text-red-500 text-center mt-5">{{ errorMessage }}</p>
    </form>
</template>

<script>
import InputForm from '../Elements/Input/InputForm.vue';
import Button from '../Elements/Button/index.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { login } from '../../Fetching/auth.js';

// Menambahkan ikon ke library
library.add(faEye, faEyeSlash);

export default {
    components: {
        InputForm,
        Button,
        FontAwesomeIcon
    },
    data() {
        return {
            isClient: false,
            showPassword: false,
            formData: {
                email: "",
                password: ""
            },
            errorMessage: '',  // Menyimpan pesan error
            loading: false  // Menyimpan status loading
        };
    },
    mounted() {
        if (process.client) {
            this.isClient = true; 
        }
    },
    methods: {
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
        handleInputChange(event) {
            const { name, value } = event.target;
            this.formData[name] = value;
        },
        async handleLogin() {
            try {
                this.errorMessage = '';  // Reset pesan error saat login dimulai
                this.loading = true;  // Set loading to true when request starts
                const response = await login(this.formData.email, this.formData.password);
                
                if (response.status) {
                    // Jika berhasil, arahkan ke halaman Penugasan
                    this.$router.push({ name: 'jabatan' });
                } else {
                    // Jika gagal, tampilkan pesan error dari backend
                    this.errorMessage = response.messages || 'Login gagal, silakan coba lagi!';
                }
            } catch (error) {
                
                if (error.response && error.response.data && error.response.data.messages) {
                    this.errorMessage = error.response.data.messages; // Menangkap pesan error dari backend
                } else {
                    this.errorMessage = 'Terjadi kesalahan saat menghubungi server. Silakan coba lagi.';
                }
                console.error(error);
            } finally {
                this.loading = false;  // Set loading to false when request finishes
            }
        }
    }
};
</script>


