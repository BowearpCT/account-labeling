<template>
  <div>
    <span class="badge" :style="color">
      {{labelName}}
    </span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      color : null,
      colorList : [
        "background-color:#f38333;",
        "background-color:#f27f93;",
        "background-color:#9cca33;",
        "background-color:#f3cf33;",
        "background-color:#3381af;",
        "background-color:#ba0020;"
      ]
    }
  },
  props: {
    labelName: String,
    level: Number
  },
  created(){
    this.AddLabelColor()
  },
  methods:{
    AddLabelColor() {
      this.color = this.colorList[this.level]
    }
  },

}
</script>

<style lang="scss">

</style>

