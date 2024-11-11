<template>
    <div class="flex space-x-4">
      <!-- Laki-Laki Radio Button -->
      <label
        :class="[
          'cursor-pointer flex items-center space-x-2 py-2 w-full rounded-lg transition-colors',
          selectedGender === 'L' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-300'
        ]"
        :aria-checked="selectedGender === 'L' ? 'true' : 'false'"
        role="radio"
      >
        <input
          type="radio"
          name="Jenis_Kelamin"
          value="L"
          v-model="selectedGender"
          class="hidden"
          @change="updateGender"
          aria-label="Laki-laki"
        />
        <span
          class="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center"
          :class="selectedGender === 'L' ? 'bg-white' : 'bg-blue-500'"
        >
          <span v-if="selectedGender === 'L'" class="w-2 h-2 bg-blue-500 rounded-full"></span>
        </span>
        <span class="text-sm">Laki-laki</span>
      </label>
  
      <!-- Perempuan Radio Button -->
      <label
        :class="[
          'cursor-pointer flex items-center space-x-2 py-2 w-full rounded-lg transition-colors',
          selectedGender === 'P' ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-300'
        ]"
        :aria-checked="selectedGender === 'P' ? 'true' : 'false'"
        role="radio"
      >
        <input
          type="radio"
          name="Jenis_Kelamin"
          value="P"
          v-model="selectedGender"
          class="hidden"
          @change="updateGender"
          aria-label="Perempuan"
        />
        <span
          class="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center"
          :class="selectedGender === 'P' ? 'bg-white' : 'bg-pink-500'"
        >
          <span v-if="selectedGender === 'P'" class="w-2 h-2 bg-pink-500 rounded-full"></span>
        </span>
        <span class="text-sm">Perempuan</span>
      </label>
    </div>
  </template>
  
  <script>
  export default {
    props: ['modelValue'], // Changed to modelValue for better clarity
    data() {
      return {
        selectedGender: this.modelValue, // Bind the model from parent to internal data
      };
    },
    watch: {
      selectedGender(newValue) {
        this.$emit('update:modelValue', newValue); // Emit to parent using update:modelValue
      },
    },
    methods: {
      updateGender() {
        this.$emit('update:modelValue', this.selectedGender); // Update model value
      },
    },
  };
  </script>
  