<template>
  <div class="card" @click="goToLabelling" :style="background">
    <div class="card-avatar">
      <img :src="icon" height="80" width="80" />
    </div>
    <div class="card-details">
      <div class="card-about">
        <div class="row">
          <div class="item">
            <span class="value">category :</span>
            <span class="label">{{assignment.assignment.category}}</span>
          </div>
          <div class="item">
            <span class="value">assign to :</span>
            <span class="label">{{assignment.assignment.assignTo}}</span>
          </div>
          <div class="item">
            <span class="value">progress :</span>
            <span class="label">{{assignment.assignment.progress}}/{{assignment.assignment.total}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      background: "background-color: #b3ff99;",
      icon: null
    };
  },
  created() {
    this.progressColor();
    this.progressIcon();
  },
  props: {
    assignment: Object
  },
  computed: {},
  methods: {
    goToLabelling() {
      this.$store.dispatch("getAcoountBooking", assignment.assignment.id);
      this.$store.dispatch("labels", assignment.assignment.label.name);
      this.$router.push("/labelling");
    },
    progressIcon() {
      if (this.assignment.assignment.channel == "instagram") {
        this.icon =
          "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png";
      } else if (this.assignment.assignment.channel == "facebook") {
        this.icon =
          "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png";
      } else if (this.assignment.assignment.channel == "twitter") {
        this.icon =
          "https://cdn2.iconfinder.com/data/icons/minimalism/512/twitter.png";
      } else {
        this.icon =
          "https://www.stickpng.com/assets/images/580b57fcd9996e24bc43c545.png";
      }
    },
    progressColor() {
      if (
        this.assignment.assignment.total -
          this.assignment.assignment.progress !=
        0
      ) {
        this.background = "background-color: #ffff99;";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  cursor: pointer;
  width: 290px;
  height: 170px;
  margin: 0.9rem;
  border-radius: 0.75rem;
  box-shadow: 0 10px 20px 0px rgba(0, 0, 0, 0.56), 0 0 0 1px rgba(0, 0, 0, 0.3);

  background: #ffff99;

  display: grid;
  grid-template-columns: 40% auto;
  color: #999999;

  align-items: center;

  will-change: transform;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.04);
    box-shadow: 0 32px 80px 14px rgba(0, 0, 0, 0.36),
      0 0 0 1px rgba(0, 0, 0, 0.3);
  }
}

.card-details {
  padding: 1rem;
}

.name {
  font-size: 1.25rem;
}

.occupation {
  font-weight: 600;
  color: black;
}

.card-avatar {
  place-items: center;
}

svg {
  fill: white;
  width: 65%;
}

.card-about {
  margin-top: 1rem;
  display: grid;
  grid-auto-flow: column;
}

.item {
  flex-direction: row;
  margin-bottom: 0.5rem;

  .value {
    font-size: 1rem;
  }

  .label {
    margin-top: 0.15rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: bfbfbf;
  }
}

.skills {
  display: flex;
  flex-direction: column;
  margin-top: 0.75rem;

  .label {
    font-size: 1rem;
    font-weight: 600;
    color: var(--primary);
  }

  .value {
    margin-top: 0.15rem;
    font-size: 0.75rem;
    line-height: 1.25rem;
  }
}
</style>
