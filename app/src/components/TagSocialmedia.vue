<template >
  <div>
    <span class="badge" :style="color">
      <img :src="image">{{channel}}
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
        this.color = "background-color:#3b5998;"
        this.image = "https://img.icons8.com/officexs/12/000000/facebook-new.png"
      } 
      else if (this.channel == "twitter") {
        this.color = "background-color:#00acee;"
        this.image = "https://img.icons8.com/offices/12/000000/twitter.png"
      }
      else if (this.channel == "instagram") {
        this.color = "background-color:#C13584;"
        this.image = "https://img.icons8.com/officexs/12/000000/instagram-new.png"
      }
      else if (this.channel == "youtube") {
        this.color = "background-color:#FF0000"
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