<template>
    <div
      class="fb-page"
      data-tabs="timeline"
      :data-href="url"
      data-width="380"
      data-hide-cover="false"
    ></div>
</template>
<script>
export default {
  data() {
    return {
      url: "https://www.facebook.com/" + this.accountId
    };
  },
  props: {
    accountId: String
  },
  computed: {},
  methods: {}
};
</script>