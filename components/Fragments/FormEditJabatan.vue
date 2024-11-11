<template lang="">
    <div class='flex flex-col w-full'>
      <div class=" flex items-center justify-between p-4 md:p-5 border-b rounded-t">
        <h3 class="text-lg font-semibold text-gray-900 uppercase">
          Form Edit Data Jabatan
        </h3>
      </div>
      <form class='p-5 flex flex-col gap-4' @submit.prevent="updateJabatan">
        <InputForm
          :type="'text'" :name="'Jabatan'" 
          :placeholder="'Staff Manager'" 
          :judulLabel="'Nama Jabatan'"
          :value="jabatan.Jabatan" :onChange="handleInputChange">
            <p class="text-red-600 text-xs">*</p>
        </InputForm>
        <InputForm
          :type="'text'" :name="'Golongan'" :placeholder="'Masukkan Golongan'" :judulLabel="'Golongan'"
          :value="jabatan.Golongan" :onChange="handleInputChange">
            <p class="text-red-600 text-xs">*</p>
        </InputForm>
        <InputForm
          :type="'text'" :name="'Eselon'" :placeholder="'Masukkan Eselon'" :judulLabel="'Eselon'"
          :value="jabatan.Eselon" :onChange="handleInputChange">
            <p class="text-red-600 text-xs">*</p>
        </InputForm>
        <div class='w-full flex justify-end'>
          <Button
            :bgColor="'h-9 px-6 font-normal text-sm bg-blue-600 hover:bg-blue-800 transition-colors'" :type="'submit'"
          > Simpan
          </Button>
        </div>
      </form>
    </div>
</template>

<script>
import InputForm from '../Elements/Input/InputForm.vue';
import Button from '../Elements/Button/index.vue';
import { updateJabatan } from '../../Fetching/jabatan.js';
import Swal from 'sweetalert2'; // Import SweetAlert2

export default {
  components: {
    InputForm,
    Button
  },
  props: {
    jabatan: Object // Receive jabatan data for editing
  },

  methods: {
    handleInputChange(event) {
      const { name, value } = event.target;
      this.jabatan[name] = value; // Update the jabatan object with the new value
    },
    
    async updateJabatan() {
      // Check if any of the fields are empty before submitting
      if (!this.jabatan.Jabatan || !this.jabatan.Golongan || !this.jabatan.Eselon) {
        // Show error alert if any field is empty
        await Swal.fire({
          icon: 'error',
          title: 'Data Tidak Boleh Kosong',
          text: 'Mohon lengkapi semua data',
          showConfirmButton: false,
          timer: 1500,
        });
        return; // Stop form submission
      }

      try {
        // Call the updateJabatan function to submit the form
        const response = await updateJabatan(this.jabatan); // Send the updated jabatan data
        console.log(response); // Log the response to check its structure
        // Handle success or error based on the response
        if (response) {
          // Show success alert with SweetAlert2
          await Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Jabatan updated successfully!',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1500,
          });
          this.$emit('dataSaved'); // Emit an event to refresh data or show a success message
          this.clearForm(); // Clear the form fields after successful submission
          this.closeModal(); // Close the modal after successful submission
        } else {
          // Show error alert
          await Swal.fire({
            icon: 'error',
            title: 'Gagal!',
            text: 'Terjadi kesalahan saat menyimpan jabatan.',
            confirmButtonText: 'OK'
          });
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error saving the jabatan.');
      }
    },
    
    clearForm() {
  
      this.jabatan.Jabatan = '';
      this.jabatan.Golongan = '';
      this.jabatan.Eselon = '';
    },
    
    closeModal() {
      this.$emit('close'); 
    },
  },
};
</script>
