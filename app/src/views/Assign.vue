<template>
  <div class="home">
    <Nav />
    <br /><br /><br />
    <b-container fluid>
      <b-row>
        <b-col offset="2" cols="8">
          <FormAssign />
        </b-col>
      </b-row>
    </b-container>    
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from "@/components/Nav.vue"
import FormAssign from "@/components/FormAssign.vue";

export default {
  name: "home",
  components: {
    FormAssign,
    Nav
  }
};
</script>
