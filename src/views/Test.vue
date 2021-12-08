<template>
  <div class="home">
    <TestVueX msg="Welcome to TestVueX" />
  </div>
</template>

<script>
// @ is an alias to /src
import TestVueX from "@/components/TestVueX.vue";

export default {
  name: "Test",
  components: {
    TestVueX,
  },
};
</script>
