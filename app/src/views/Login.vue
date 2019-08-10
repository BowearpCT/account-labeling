<template>
  <div>
    <br><br><br>
    <b-container>
      <b-row class="justify-content-md-center">
        <b-col cols="4">
          <FormLogin />
        </b-col>
      </b-row>
    </b-container>
  </div> 
</template>

<script>
import FormLogin from "@/components/FormLogin.vue";
export default {
  name: "login",
  components: {
    FormLogin
  }
};
</script>
