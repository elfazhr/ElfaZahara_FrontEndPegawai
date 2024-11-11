<template>
    <div>
      <Label :name="name" class="flex gap-1">{{ judulLabel }} <slot></slot></Label>
      <Input 
        :type="type" 
        :name="name" 
        :placeholder="placeholder"
        :value="value"
        :onChange="onChange" 
      />
    </div>
  </template>
<script>
import Label from './Label.vue';
import Input from './Input.vue';
export default {
    components: {
    Label,
    Input
  },
  props: {
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    judulLabel: {
      type: String,
      default: '',
    },
    onChange: {
      type: Function,
      required: true,
    }
  }
};
</script>
<style lang="">

</style>