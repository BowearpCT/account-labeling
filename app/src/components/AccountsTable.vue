<template>
  <div>
    <table class="table table-hover table-striped">
      <thead>
        <tr>
          <th v-for="(item, index) in fields" :key="index" scope="col">{{item}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(account, index) in accountLabelling" :key="index" v-show="CheckFilter(account.account.channel.channel_name, account.account.like_count)">
          <td>{{account.account.account_id}}</td>
          <td>{{account.account.account_name}}</td>
          <td>
            <tagSocial :channel="account.account.channel.channel_name"></tagSocial>
          </td>
          <td>{{account.account.like_count}}</td>
          <td >
            <tagLabel
            v-for="(accountLabellings, index) in account.account_labellings"
            :key="index" :labelName="accountLabellings.label.name"
            :level="accountLabellings.label.category_group"></tagLabel>
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
      fields: ["account id", "account name", "channel", "liked count", "labels"],
    }
  },
  created(){
    this.fetchAccounts();
  },
  components: {
    tagSocial,
    tagLabel
  },
  props:{
    channel:String,
    like:Number
  },
  computed:{
    accountLabelling(){
      return this.$store.getters.accountLabelling;
    }
  },
  methods:{
    fetchAccounts(){
      this.$store.dispatch("fetchAccounts")
    },
    CheckFilter(accountChannel, accountLike) {
      let render = true
      if(this.channel && this.like){
        if(this.channel != accountChannel || accountLike < this.like) render = false
      }
      else if(this.channel) {
        if(this.channel != accountChannel) render = false;
      }
      else if(this.like){
        if(accountLike < this.like) render = false;
      } 
      return render
    }
  }
}
</script>
<style lang="scss" scope>

</style>