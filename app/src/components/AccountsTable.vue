<template>
  <div>
    <table class="table table-hover table-striped">
      <thead>
        <tr>
          <th v-for="(item, index) in fields" :key="index" scope="col">{{item}}</th>
        </tr>
      </thead>
      <tbody>
        <tr >
          <td>1321321302103</td>
          <td>thairath</td>
          <td>
            <tagSocial :channel="channel"></tagSocial>
          </td>
          <td>14,232</td>
          <td>
            <tagLabel :labelName="label" :level="level"></tagLabel>
            <tagLabel :labelName="label" :level="level"></tagLabel>
            <tagLabel :labelName="label" :level="level"></tagLabel>
          </td>
        </tr>
        
      </tbody>
    </table>
  </div>
</template>
<script>
import tagSocial from "../components/TagSocialmedia.vue"
import tagLabel from "../components/Label.vue"
export default {
  data() {
    return{
      label: "abc",
      level: 3,
      channel : "instagram",
      fields: ["account id", "account name", "channel", "liked count", "labels"],
    }
  },
  components: {
    tagSocial,
    tagLabel
  },
  computed:{
    accounts(){

    }
  }
}
</script>
<style lang="scss" scope>

</style>