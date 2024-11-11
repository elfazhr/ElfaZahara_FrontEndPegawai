<template lang="">
    <div class='w-full flex bg-gray-100'>
        <div class='bg-white h-screen w-[16rem] max-w-[18rem] bg-opacity-70 shadow-[0_3px_7px_rgba(0,0,0,0.1)] 
        flex-col p-5 py-7'>
        <div class='mt-5 flex flex-col space-y-3 '>
                    <p class='px-3 font-semibold text-gray-600 text-md'>PAGES</p>
                    <ul>
                        <li class="text-gray-500 mb-1">
                            <router-link 
                            to="/jabatan" 
                            class="flex flex-row gap-3 items-center cursor-pointer p-3 rounded-lg text-sm"
                            :class="{ 'bg-slate-100 text-blue-600 font-semibold': isActive('/jabatan') }">
                            <FontAwesomeIcon :icon="['fas', 'database']" v-if="isClient" />
                            <div>Position Data</div>
                        </router-link>
                        </li>
                        <li class="text-gray-500 mb-1">
                            <router-link 
                            to="/penugasan" 
                            class="flex flex-row gap-3 items-center cursor-pointer p-3 rounded-lg text-sm"
                            :class="{ 'bg-slate-100 text-blue-600 font-semibold': isActive('/penugasan') }">
                            <FontAwesomeIcon :icon="['fas', 'database']" v-if="isClient" />
                            <div>Placements Data</div>
                        </router-link>
                        </li>
                        <li class="text-gray-500 mb-1">
                            <router-link 
                            to="/pegawai" 
                            class="flex flex-row gap-3 items-center cursor-pointer p-3 rounded-lg text-sm"
                            :class="{'bg-slate-100 text-blue-600 font-semibold': isActive('/pegawai') }">
                            <FontAwesomeIcon :icon="['fas', 'users']" v-if="isClient" />
                            <div>Employees</div>
                        </router-link>
                        </li>
                    
                    </ul>
                </div>
        </div>

        <main class="w-full h-screen overflow-auto">        
            <div class='sticky top-0 bg-white z-10'>
                <div class="flex justify-between items-center bg-blue-600 p-4 w-full px-7 shadow-lg h-full " >
                    <p class='text-white text-md font-semibold'> Employee Management System</p>
                     <!-- Logout Button with @click to trigger handleLogout method -->
                    <Button :bgColor="'bg-blue-500 text-blue hover:bg-blue-400 hover:font-semibold transition-colors text-sm border-none'" :onClick="handleLogout">Logout</Button>
                </div>
            </div> 
            
            <div>
                <slot></slot>
            </div>
        </main>
    </div>
</template>
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHouse, faUsers, faUserTie, faDatabase } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Button from '../Elements/Button/index.vue';
import { logout } from '../../Fetching/auth.js';

library.add(faHouse, faUsers, faUserTie, faDatabase);
export default {
    components: {
        FontAwesomeIcon,
        Button
    },
    data() {
        return {
            isClient: false,  // Menandakan bahwa kita belum di sisi klien
        };
    },
    mounted() {
        if (process.client) {
            this.isClient = true;  // Menandakan bahwa kita di sisi klien

            // Cek apakah ada token di localStorage
            const token = localStorage.getItem('access_token');
            if (!token) {
                // Jika tidak ada token, arahkan ke halaman login
                this.$router.push('/');
            }
        }

    },
    methods: {
        // Fungsi untuk menentukan jika rute aktif
        isActive(route) {
            return this.$route.path === route;
        },
        
        // Handle Logout
        async handleLogout() {
            try {
                const response = await logout(); // Call the logout function
                console.log('Logout successful', response);
                // After logout, redirect to login page
                this.$router.push('/');
            } catch (error) {
                console.error('Logout error', error);
            }
        }
    }
}
</script>