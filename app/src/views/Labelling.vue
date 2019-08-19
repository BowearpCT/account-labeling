<template>
  <div>
    <Nav />
    <br />
    <br />
    <br />
    <b-container fluid>
      <b-row>
        <b-col offset-md="2" md="8">
          <FormLabelling />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from "@/components/Nav.vue";
import FormLabelling from "@/components/FormLabelling.vue";
export default {
  components: {
    Nav,
    FormLabelling
  }
};
</script>
