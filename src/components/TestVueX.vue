<template>
  <div class="test-vue-x">
    <p>{{ msg }}</p>
    <p>{{ post.name }}</p>
    <p>{{ user.name }}</p>
    <button @click="updateProfile()">Change</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "TestVueX",
  props: {
    msg: String,
  },
  data: function () {
    return {
      post: { name: "post TestVueX" },
      // privateState: { user: { name: "user TestVueX" } },
      // sharedState: store.state,
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    ...mapMutations(["setUser"]), // get clone function setUser from mutations store to this component
    ...mapActions(["updateProfile"]), // call action
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
