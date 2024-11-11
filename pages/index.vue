<template>
  <AuthLayouts :image="'../img/login.png'"
    :tagline="'Employee Management System'" :taglineDesc="'Manage your employees with ease and efficiency'" :title="'Sign In'"
    :titleDesc="'Enter your credentials and access your account'">
    <FormLogin/>
  </AuthLayouts>
</template>

<script>
import AuthLayouts from '../components/Layouts/AuthLayouts.vue';
import FormLogin from '../components/Fragments/FormLogin.vue';
export default {
  components: {
    AuthLayouts,
    FormLogin
  },
  methods: {

  }
}
</script>