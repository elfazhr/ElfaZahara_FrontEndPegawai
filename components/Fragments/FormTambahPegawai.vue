<template lang="">
  <div class="flex flex-col w-full">
    <div
      class="flex items-center justify-between p-4 md:p-5 border-b rounded-t"
    >
      <h3 class="text-lg font-semibold text-gray-900 uppercase">
        Form Tambah Data Pegawai
      </h3>
    </div>
    <form class="p-5 flex flex-row gap-4" @submit.prevent="submitForm">
      <div class="w-full space-y-4">
        <!-- Image Preview Section -->
        <div
          class="h-[200px] w-full bg-gray-100 rounded-md flex items-center justify-center relative"
        >
          <div
            v-if="Gambar"
            @click="deleteGambar"
            class="absolute top-2 right-2 px-4 py-2 rounded-md bg-red-100 cursor-pointer hover:bg-red-300"
          >
            <font-awesome-icon :icon="['fas', 'trash']" :color="'gray'" />
          </div>
          <div v-if="Gambar" class="h-full w-full">
            <img
              :src="Gambar"
              alt="Preview Gambar"
              class="h-full w-full object-cover rounded-md"
            />
          </div>
          <div v-else class="border-2 border-gray-400 rounded-md px-4 py-2">
            <label :for="'Gambar'" class="cursor-pointer">
              <input
                :type="'file'"
                :id="'Gambar'"
                :name="'Gambar'"
                :accept="'image/jpg, image/jpeg, image/png'"
                class="hidden"
                @change="handleGambarChange"
              />
              <font-awesome-icon :icon="['fas', 'fa-image']" :color="'gray'" />
            </label>
          </div>
        </div>

        <InputForm
          :type="'text'"
          :name="'NIP'"
          :placeholder="'Masukkan NIP'"
          :judulLabel="'NIP'"
          :value="NIP"
          :onChange="handleInputChange"
        >
          <p class="text-red-600 text-xs">*</p>
        </InputForm>
        <InputForm
          :type="'text'"
          :name="'Nama'"
          :placeholder="'Masukkan Nama'"
          :judulLabel="'Nama'"
          :value="Nama"
          :onChange="handleInputChange"
        >
          <p class="text-red-600 text-xs">*</p>
        </InputForm>
        <InputForm
          :type="'text'"
          :name="'Tempat_Lahir'"
          :placeholder="'Masukkan Tempat Lahir'"
          :judulLabel="'Tempat Lahir'"
          :value="Tempat_Lahir"
          :onChange="handleInputChange"
        >
          <p class="text-red-600 text-xs">*</p>
        </InputForm>
        <InputForm
          :type="'date'"
          :name="'Tanggal_Lahir'"
          :placeholder="'Masukkan Tanggal Lahir'"
          :judulLabel="'Tanggal Lahir'"
          :value="Tanggal_Lahir"
          :onChange="handleInputChange"
        >
          <p class="text-red-600 text-xs">*</p>
        </InputForm>
      </div>
      <div class="w-full space-y-6">
        <InputForm
          :type="'text'"
          :name="'Alamat'"
          :placeholder="'Masukkan Alamat'"
          :judulLabel="'Alamat'"
          :value="Alamat"
          :onChange="handleInputChange"
        >
          <p class="text-red-600 text-xs">*</p>
        </InputForm>
        <Label :name="'Jenis_Kelamin'"
          >Jenis Kelamin <span class="text-red-600">*</span></Label
        >
        <RadioButton v-model="Jenis_Kelamin" />
        <InputForm
          :type="'text'"
          :name="'Agama'"
          :placeholder="'Masukkan Agama'"
          :judulLabel="'Agama'"
          :value="Agama"
          :onChange="handleInputChange"
        >
          <p class="text-red-600 text-xs">*</p>
        </InputForm>
        <InputForm
          :type="'text'"
          :name="'NPWP'"
          :placeholder="'Masukkan NPWP'"
          :judulLabel="'NPWP'"
          :value="NPWP"
          :onChange="handleInputChange"
        >
          <p class="text-red-600 text-xs">*</p>
        </InputForm>
        <div>
          <Label :name="'Jabatan'"
            >Jabatan <span class="text-red-600">*</span></Label
          >
          <ComboBox
            :fetchURL="'/jabatanOption'"
            label="Jabatan"
            @update:selectedValue="handleJabatanSelection"
          />
        </div>

        <div>
          <Label :name="'Penugasan'"
            >Penugasan <span class="text-red-600">*</span></Label
          >
          <ComboBox
            fetchURL="/penugasanOption"
            label="Penugasan"
            @update:selectedValue="handlePenugasanSelection"
          />
        </div>

        <div class="w-full flex justify-end mt-8">
          <Button
            :bgColor="'h-9 px-6 font-normal text-sm bg-blue-600 hover:bg-blue-800 transition-colors'"
            :type="'submit'"
          >
            Simpan
          </Button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import InputForm from "../Elements/Input/InputForm.vue";
import Label from "../Elements/Input/Label.vue";
import Button from "../Elements/Button/index.vue";
import RadioButton from "../Elements/Input/RadioButton.vue";
import ComboBox from "../Elements/Input/ComboBox.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faImage, faTrash } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import api, { buildURL } from "../../../Fetching/api";

library.add(faImage, faTrash);

import Swal from "sweetalert2";

export default {
  components: {
    InputForm,
    Button,
    FontAwesomeIcon,
    RadioButton,
    Label,
    ComboBox,
  },
  data() {
    return {
      isClient: false,
      jabatan: "",
      penugasan: "",
      NIP: "",
      Nama: "",
      Tempat_Lahir: "",
      Tanggal_Lahir: "",
      Alamat: "",
      Jenis_Kelamin: "",
      Agama: "",
      NPWP: "",
      Foto: "",
      Gambar: "",
    };
  },
  mounted() {
    if (process.client) {
      this.isClient = true; // Menandakan bahwa kita di sisi klien
    }
  },

  methods: {
    handleJabatanSelection(selected) {
      this.jabatan = selected; // Simpan data jabatan pada state
    },

    handlePenugasanSelection(selected) {
      this.penugasan = selected;
    },
    handleInputChange(event) {
      const { name, value } = event.target;
      this[name] = value;
    },
    handleGambarChange(event) {
      const file = event.target.files[0];
      if (file && file.size <= 2 * 1024 * 1024) {
        this.Foto = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.Gambar = e.target.result; // Store the base64 image data
        };
        reader.readAsDataURL(file);
      } else if (file && file.size > 2 * 1024 * 1024) {
        Swal.fire({
          title: "Warning!",
          icon: "warning",
          text: "Ukuran gambar tidak boleh lebih dari 2 MB",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    deleteGambar() {
      if (!this.Gambar) {
        Swal.fire(
          "Error",
          "Pilih gambar terlebih dahulu sebelum menghapus",
          "error"
        );
      } else {
        Swal.fire({
          title: "Yakin ingin menghapus gambar?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Hapus",
        }).then((result) => {
          if (result.isConfirmed) {
            this.Gambar = ""; // Menghapus gambar yang sudah dipilih
          }
        });
      }
    },
    // Fungsi untuk menambahkan data Pegawai, Jabatan, dan Unit Kerja
    async submitForm() {
      // Validasi form
      if (
        !this.NIP ||
        !this.Nama ||
        !this.Tempat_Lahir ||
        !this.Tanggal_Lahir ||
        !this.Alamat ||
        !this.Jenis_Kelamin ||
        !this.Agama ||
        !this.NPWP ||
        !this.jabatan ||
        !this.penugasan ||
        !this.Foto
      ) {
        Swal.fire({
          icon: "error",
          title: "Data Tidak Boleh Kosong",
          text: "Mohon lengkapi semua data",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }

      try {
        // Menambahkan data pegawai
        // Siapkan data form
        const formData = new FormData();
        formData.append("NIP", this.NIP);
        formData.append("Nama", this.Nama);
        formData.append("Tempat_Lahir", this.Tempat_Lahir);
        formData.append("Tanggal_Lahir", this.Tanggal_Lahir);
        formData.append("Alamat", this.Alamat);
        formData.append("Jenis_Kelamin", this.Jenis_Kelamin);
        formData.append("Agama", this.Agama);
        formData.append("NPWP", this.NPWP);
        formData.append("Foto", this.Foto); // Kirim gambar sebagai file (bukan base
        const pegawaiResponse = await api.post(
          buildURL("/pegawai_add"),
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        // Jika pegawai berhasil ditambahkan, tambahkan jabatan dan unit kerja
        if (pegawaiResponse.data.status) {
          // Data jabatan
          const jabatanData = {
            kode_jabatan: this.jabatan,
            NIP: this.NIP, // id pegawai yang baru saja ditambahkan
          };
          const jabatanResponse = await api.post(
            buildURL("/pegawai_jabatan_add"),
            jabatanData
          );

          // Data unit kerja
          const unitKerjaData = {
            kode_unit: this.penugasan,
            NIP: this.NIP,
          };
          const unitKerjaResponse = await api.post(
            buildURL("/pegawai_penugasan_add"),
            unitKerjaData
          );

          if (jabatanResponse.data) {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Jabatan created successfully!",
              showConfirmButton: false,
              timerProgressBar: true,
              timer: 1500,
            });
            this.$emit("dataSaved"); 
            this.clearForm(); // Clear the form fields after successful submission
            this.closeModal(); // Close the modal after successful submission
          } else {
            Swal.fire(
              "Error",
              "Gagal menambahkan jabatan atau unit kerja",
              "error"
            );
          }
        } else {
          Swal.fire("Error", "Gagal menambahkan pegawai", "error");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        Swal.fire("Error", "Terjadi kesalahan saat menyimpan data", "error");
      }
    },

    // Fungsi untuk mereset form setelah berhasil submit
    clearForm() {
      this.Jabatan = '';
      this.Golongan = '';
      this.Eselon = '';
    },
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>
