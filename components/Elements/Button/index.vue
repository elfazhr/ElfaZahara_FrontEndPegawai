<template>
    <button 
      :class="`rounded-lg border h-10 px-6 text-md text-white ${bgColor}`"
      :type="type"
      @click="onClick">
      <slot></slot>
    </button>
  </template>
  
  <script>
  export default {
    props: {
      bgColor: {
        type: String,
        default: "bg-blue-500 text-white font-semibold hover:bg-blue-700"
      },
      type: {
        type: String,
        default: "button"
      },
      onClick: {
        type: Function,
        default: () => {}
      }
    }
  }
  </script>
  