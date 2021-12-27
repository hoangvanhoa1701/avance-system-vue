<template>
  <div id="login">
    <div class="login-box">
      <el-card>
        <h2>Login</h2>
        <el-form
          class="login-form"
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
        >
          <el-form-item prop="email">
            <el-input
              v-model="ruleForm.email"
              placeholder="Email"
              prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              placeholder="Password"
              type="password"
              prefix-icon="el-icon-lock"
            ></el-input>
          </el-form-item>

          <el-form-item prop="remember">
            <div class="remember__item">
              <el-checkbox v-model="ruleForm.remember">Remember me</el-checkbox>

              <router-link to="/">Forgot password</router-link>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button
              class="login-button"
              type="primary"
              block
              :disabled="status.loggingIn"
              @click="handleSubmitForm('ruleForm')"
              >Login</el-button
            >
          </el-form-item>

          <div class="login-box__register">
            Don’t have an account yet?
            <router-link to="/register">Register</router-link>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Login",
  components: {},
  data: function () {
    let checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please input the email"));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        email: "",
        password: "",
        remember: false,
      },
      rules: {
        email: [{ validator: checkEmail, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapState("auth", ["status"]),
  },
  methods: {
    ...mapActions("auth", ["login"]),
    handleSubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch("auth/login", this.ruleForm);
        } else {
          console.log("Error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
body {
  margin: 0;
  padding: 0;
  background: #102a43;
  background-size: contain;
}
$teal: rgb(0, 124, 137);
#login {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .login-box {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    h2 {
      margin-bottom: 32px;
    }

    .login-button {
      width: 100%;
    }
    .login-form {
      width: 290px;
    }

    .el-input__inner:hover {
      border-color: $teal;
    }

    .el-input__prefix {
      background: rgb(238, 237, 234);
      left: 0;
      height: calc(100% - 2px);
      left: 1px;
      top: 1px;
      border-radius: 3px;
      .el-input__icon {
        width: 30px;
      }
    }

    .el-input input {
      padding-left: 35px;
    }

    .el-card {
      padding-top: 30px;
      padding-bottom: 30px;
    }

    a {
      color: $teal;
      text-decoration: none;
      &:hover,
      &:active,
      &:focus {
        color: lighten($teal, 7);
      }
    }
    .el-card {
      width: 340px;
      display: flex;
      justify-content: center;
    }

    .remember__item {
      display: flex;
      justify-content: space-between;
    }
    &__register {
      font-size: 14px;
    }
  }
}

.el-button--primary {
  background: $teal;
  border-color: $teal;
  color: #fff;

  &:hover,
  &.active,
  &:focus {
    background: lighten($teal, 7);
    border-color: lighten($teal, 7);
  }
}
</style>
