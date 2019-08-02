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
// @ is an alias to /src
import Nav from "@/components/Nav.vue";
import FormLogin from "@/components/FormLogin.vue";
export default {
  name: "home",
  components: {
    FormLogin,
    Nav
  }
};
</script>
