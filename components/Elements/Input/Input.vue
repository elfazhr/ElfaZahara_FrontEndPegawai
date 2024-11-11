<template lang="">
    <input
      :type="type"
      class='rounded-md border p-2 placeholder:opacity-50 text-slate-700 text-sm w-full outline-blue-600'
      :placeholder="placeholder"
      :name="name"
      :id="name"
      :value="value"
      @input="onChange"
    />
</template>
<script>
export default {
    props: {
        type: {
            type: String,
            default: "text"
        },
        placeholder: {
            type: String,
            default: ""
        },
        name: {
            type: String,
            default: ""
        },
        value: {
            type: String,
            default: ""
        },
        onChange: {
            type: Function,
            default: () => {}
        }
    }
}
</script>
<style lang="">
    
</style>