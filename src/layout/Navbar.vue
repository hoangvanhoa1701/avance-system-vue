<template>
  <div class="nv-navbar">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
      :default-active="$route.path"
    >
      <div class="nv-navbar__logo">
        <img
          alt="Vue logo"
          src="../assets/Hoang-Hoa-Profile-Official-Logo.png"
        />
      </div>

      <div class="nv-navbar__menu">
        <router-link tag="li" class="el-menu-item" to="/">Home</router-link>

        <router-link tag="li" class="el-menu-item" to="/about"
          >About</router-link
        >

        <div class="el-menu-item" v-if="user">
          <el-dropdown>
            <span class="el-dropdown-link el-dropdown-link__user">
              {{ user.fullname
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>Notifications</el-dropdown-item>
              <el-dropdown-item>Help</el-dropdown-item>
              <el-dropdown-item>Settings</el-dropdown-item>
              <el-dropdown-item divided @click.native="logout()"
                ><div>Logout</div></el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-menu>

    <slot />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navbar",

  data() {
    return {};
  },

  mounted() {},

  computed: {
    ...mapGetters({ user: "auth/user" }),
  },
  methods: {
    ...mapActions("auth", ["logout"]), // call action
  },
};
</script>

<style lang="scss" scoped>
.el-menu-item.router-link-exact-active.router-link-active {
  border-bottom: 2px solid #42b983;
}

.nv-navbar {
  .el-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    content: initial;
  }
  &__logo {
    padding: 8px 16px;
    img {
      max-width: 100px;
    }
  }

  &__menu {
    display: flex;
  }

  .el-dropdown-link__user {
    border-left: 1px solid #ebebeb;
    padding-left: 16px;
  }

  .el-menu-demo .el-menu--horizontal .el-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    content: initial;
  }

  .el-menu-item:focus,
  .el-menu-item:hover {
    outline: 0;
    background-color: transparent;
  }

  .el-menu::after,
  .el-menu::before {
    display: table;
    content: initial;
  }
}
</style>
