<template>
  <div class="register">
    <el-container>
      <el-main>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="Email" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="Your name" prop="fullname">
            <el-input v-model="ruleForm.fullname"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="Confirm" prop="password_confirmation">
            <el-input
              type="password"
              v-model="ruleForm.password_confirmation"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >Submit</el-button
            >
            <el-button @click="resetForm('ruleForm')">Reset</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
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
    submitForm(formName) {
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
