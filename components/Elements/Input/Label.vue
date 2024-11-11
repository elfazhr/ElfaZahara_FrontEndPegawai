<template lang="html">
    <label :for="name" class="block text-sm text-slate-700 font-bold mb-2">
      <slot></slot>
    </label>
  </template>
  
  <script>
  export default {
    props: {
      name: {
        type: String,
        default: "",
      },
    },
  };
  </script>
