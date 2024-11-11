<template lang="">
    <div class='flex flex-col w-full'>
      <div class=" flex items-center justify-between p-4 md:p-5 border-b rounded-t">
        <h3 class="text-lg font-semibold text-gray-900 uppercase">
          Form Tambah Data Penugasan
        </h3>
      </div>
      <form class='p-5 flex flex-col gap-4' @submit.prevent="submitForm">
        <InputForm
        :type="'text'" :name="'Tempat_Tugas'" :placeholder="'Jakarta'" :judulLabel="'Nama Tempat Tugas'"
            :value="Tempat_Tugas" :onChange="handleInputChange">
            <p class="text-red-600 text-xs">*</p>
      </InputForm>
      <InputForm
        :type="'text'" :name="'Unit_Kerja'" :placeholder="'Masukkan Unit_Kerja'" :judulLabel="'Unit_Kerja'"
            :value="Unit_Kerja" :onChange="handleInputChange">
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
import { addPenugasan } from '../../Fetching/penugasan.js';
import Swal from 'sweetalert2'; 
export default {
  components: {
    InputForm,
    Button
  },
  data() {
    return {
      Tempat_Tugas: "",
      Unit_Kerja: "",
    };

  },

  methods: {
    handleInputChange(event) {
      const { name, value } = event.target;
      this[name] = value;
    },
    async submitForm() {
      // Check if any of the fields are empty before submitting
      if (!this.Tempat_Tugas || !this.Unit_Kerja) {
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

      // Prepare data to send to the backend
      const penugasanData = {
        Tempat_Tugas: this.Tempat_Tugas,
        Unit_Kerja: this.Unit_Kerja
      };

      try {
        // Call the createJabatan function to submit the form
        const response = await addPenugasan(penugasanData);

        // Handle success or error based on the response
        if (response.status) {
          // Show success alert with SweetAlert2
          await Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Penugasan created successfully!',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1500,
          });
          this.$emit('dataSaved'); // Optional: emit an event to refresh data or show a success message
          this.clearForm(); // Clear the form fields after successful submission
          this.closeModal(); // Close the modal after successful submission
        } else {
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
      this.Tempat_Tugas = '';
      this.Unit_Kerja = '';
    },
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>