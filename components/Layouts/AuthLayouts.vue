<template lang="">
    <div class='flex min-h-screen justify-center'>
      <div class='hidden w-full bg-blue-800 md:flex md:flex-col md:items-center md:justify-center'>
        <img :src="image" alt="" class='h-56' />
        <p class='text-white text-2xl font-semibold mt-3'>{{tagline}}</p>
        <p class='text-gray-300 text-md mt-2'>{{taglineDesc}}</p>
      </div>
      
      <div class='flex justify-center items-center gap-x-20 w-full'>
        <div class='max-w-xs md:max-w-sm w-full flex flex-col gap-3'>
          <p class='text-3xl font-semibold text-gray-800'>{{title}}</p>
          <p class='text-sm text-gray-500 mb-2'>{{titleDesc}}</p>
          <slot></slot>
        </div>
      </div>
    </div>
</template>
<script>
export default {
    props: {
        tagline: {
            type: String,
            default: ""
        },
        taglineDesc: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            default: ""
        },
        titleDesc: {
            type: String,
            default: ""
        },
        image: {
            type: String,
            default: ""
        },
    }
}
</script>
<style lang="">

</style>