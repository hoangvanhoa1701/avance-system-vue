<template>
  <div id="register">
    <div class="register-box">
      <el-card>
        <h2>Register</h2>
        <el-form
          class="register-form"
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

          <el-form-item prop="fullname">
            <el-input
              v-model="ruleForm.fullname"
              placeholder="Your name"
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

          <el-form-item prop="password_confirmation">
            <el-input
              v-model="ruleForm.password_confirmation"
              placeholder="Password confirm"
              type="password"
              prefix-icon="el-icon-lock"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              class="register-button"
              type="primary"
              block
              @click="handleSubmitForm('ruleForm')"
              >Register</el-button
            >
          </el-form-item>

          <div class="register-box__register">
            I have an account
            <router-link to="/login">Login</router-link>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
  components: {},
  data: function () {
    let checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please input the email"));
      } else {
        callback();
      }
    };
    let checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please input the name"));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else {
        if (this.ruleForm.password_confirmation !== "") {
          this.$refs.ruleForm.validateField("password_confirmation");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password again"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        email: "",
        fullname: "",
        password: "",
        password_confirmation: "",
      },
      rules: {
        email: [{ validator: checkEmail, trigger: "blur" }],
        fullname: [{ validator: checkName, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        password_confirmation: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  computed: {},
  methods: {
    handleSubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.signup();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    signup() {
      const { email, fullname, password, password_confirmation } =
        this.ruleForm;
      axios
        .post("http://127.0.0.1:3000/api/v1/auth/register", {
          email,
          fullname,
          password,
          password_confirmation,
        })
        .then((resp) => {
          console.log(resp);
          // this.$router.push("/");
          this.$message({
            message: "Sign up successfully!",
            type: "success",
          });
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            message: "Sign up failed!",
            type: "error",
          });
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
#register {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .register-box {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    h2 {
      margin-bottom: 32px;
    }

    .register-button {
      width: 100%;
    }
    .register-form {
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
