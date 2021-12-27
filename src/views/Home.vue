<template>
  <div class="home nv-container">
    <h1 v-if="user">Welcome home page, {{ user.fullname }}!</h1>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {},
  computed: {
    ...mapGetters({ user: "auth/user" }),
  },
};
</script>

<style lang="scss" scope>
.home {
  padding: 16px 0;
  h1 {
    text-align: center;
  }
}
</style>
