<template lang="">
    <div class='flex flex-col w-full px-6 '>
        <div  class='flex flex-wrap py-4 items-center justify-between w-full gap-0'>
        <p  class='text-xl uppercase px-1 '>{{title}}</p>
        <div  class="flex flex-row space-x-3">
          <Button
            :bgColor="'bg-blue-600 hover:bg-blue-500 font-normal text-sm h-9 px-6 '"
            :onClick="onClick" 
          > + {{titleButton}}
          </Button>
        </div>
      </div>
      <div class='bg-white rounded-md my-3 mb-8 p-4'>
        <slot></slot>
      </div>
    </div>
</template>
<script>
import Button from '../Elements/Button/index.vue';

export default {
    components: {
       
        Button
    }, 
    props: {
        title: {
            type: String,
            default: ""
        },
        titleButton: {
            type: String,
            default: ""
        },
        openModal: {
            type: Function,
            default: () => {}
        },
        onSearchChange: {
            type: Function,
            default: () => {}
        },
        onClick : {
            type: Function,
            default: () => {}
        }
    }
}
</script>
<style lang="">

</style>