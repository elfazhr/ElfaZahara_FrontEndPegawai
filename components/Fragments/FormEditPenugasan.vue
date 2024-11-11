<template lang="">
    <div class='flex flex-col w-full'>
      <div class=" flex items-center justify-between p-4 md:p-5 border-b rounded-t">
        <h3 class="text-lg font-semibold text-gray-900 uppercase">
          Form Edit Data Penugasan
        </h3>
      </div>
      <form class='p-5 flex flex-col gap-4' @submit.prevent="updatePenugasan">
        <InputForm
          :type="'text'" :name="'Tempat_Tugas'" 
          :placeholder="'Jakarta'" 
          :judulLabel="'Nama Tempat Tugas'"
          :value="penugasan.Tempat_Tugas" :onChange="handleInputChange">
            <p class="text-red-600 text-xs">*</p>
        </InputForm>
        <InputForm
          :type="'text'" :name="'Unit_Kerja'" :placeholder="'Masukkan Unit Kerja'" :judulLabel="'Unit Kerja'"
          :value="penugasan.Unit_Kerja" :onChange="handleInputChange">
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
import { updatePenugasan } from '../../Fetching/penugasan.js';
import Swal from 'sweetalert2'; // Import SweetAlert2

export default {
  components: {
    InputForm,
    Button
  },
  props: {
    penugasan: Object // Receive jabatan data for editing
  },

  methods: {
    handleInputChange(event) {
      const { name, value } = event.target;
      this.penugasan[name] = value; // Update the jabatan object with the new value
    },
    
    async updatePenugasan() {
      // Check if any of the fields are empty before submitting
      if (!this.penugasan.Tempat_Tugas || !this.penugasan.Unit_Kerja) {
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
        const response = await updatePenugasan(this.penugasan); 
        console.log(response); 
        if (response) {
          await Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Penugasan updated successfully!',
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
            text: 'Terjadi kesalahan saat menyimpan penugasan.',
            confirmButtonText: 'OK'
          });
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error saving the penugasan.');
      }
    },
    
    clearForm() {
      this.penugasan.Tempat_Tugas = '';
      this.penugasan.Unit_Kerja = '';
    },
    
    closeModal() {
      this.$emit('close'); 
    },
  },
};
</script>
