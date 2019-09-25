<template >
  <div>
    <span class="badge" >
      <img :src="image">
    </span>
  </div>
</template>

<script>
export default {
  date(){
    return {
      color:null,
      image:null
    }
  },
  props: {
    channel : String
  },
  created() {
    this.selectLink()
  },
  methods: {
    selectLink () {
      if (this.channel == "facebook"){
        this.image = "https://img.icons8.com/color/25/000000/facebook-new.png"
      } 
      else if (this.channel == "twitter") {
        this.image = "https://img.icons8.com/offices/12/000000/twitter.png"
      }
      else if (this.channel == "instagram") {
        this.image = "https://img.icons8.com/officexs/12/000000/instagram-new.png"
      }
      else if (this.channel == "youtube") {
        this.image = "https://img.icons8.com/color/12/000000/youtube-play.png"
      }
    }
  }
}
</script>

<style lang="scss" >
span{
  margin: 1px;
  color : white;
}
.badge{
  color: white 
}
</style>