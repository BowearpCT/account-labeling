<template>
  <div class="assign">
    <Nav />
    <br />
    <br />
    <br />
    <b-container fluid>
      <b-row>
        <b-col offset-md="2" md="8">
          <Progress />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from "@/components/Nav.vue";
import Progress from "@/components/Progress.vue";
export default {
  name: "assign",
  components: {
    Nav,
    Progress
  }
};
</script>
