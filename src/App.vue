<template>
  <div id="app">
    <component :is="layout">
      <transition mode="out-in" name="fade-down">
        <router-view v-loading="routerLoading" />
      </transition>
    </component>
  </div>
</template>

<script>
import Basic from "/src/layout/Basic";
import Empty from "/src/layout/Empty";
import Navbar from "/src/layout/Navbar";

import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    Basic,
    Empty,
    Navbar,
  },
  data() {
    return {
      routerLoading: false,
    };
  },
  computed: {
    layout() {
      return `${this.$route.meta.layout || "Empty"}`;
    },
  },
  created() {
    this.me();

    //  hook the progress bar to start before we move router-view
    this.$router.beforeResolve((to, from, next) => {
      next();
    });
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach(() => {});
  },
  methods: {
    ...mapActions("auth", ["me"]),
  },
};
</script>

<style lang="scss">
#app,
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

/* You can add global styles to this file, and also import other style files */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  height: 100%;
  box-sizing: border-box;
  -ms-overflow-style: scrollbar;
}

*,
*::before,
*::after {
  -webkit-box-sizing: inherit;
  box-sizing: inherit;
}

body {
  font-size: 16px;
  margin: 0;
  min-height: 100%;
  padding: 0;
  width: 100%;

  a:not([href]):not([class]) {
    color: #415050;
    text-decoration: none;

    &:hover {
      color: #128ec8;
    }
  }

  a {
    color: #415050;
  }
}

img {
  vertical-align: middle;
  border-style: none;
  display: block;
  max-width: 100%;
  object-fit: cover;
}

// *********** style common app *********** //

// Margin: 4 8 16 24 32 px
// Padding: 4 8 16 24 32 px
// Border radius: 8 10 16 px
// Border: 1 px

// ---------------------- color
$nv-color-black: #180825;
$nv-color-white: #ffffff;
$nv-color-black-hover: #46606e;
$nv-color-red: #e53e3e;
$nv-color-earth: #533f03;
$nv-color-blue-white: #f2f9ff;

$nv-color-primary: #128ec8;
$nv-color-secondary: #7e7e7e;
$nv-color-success: #48a500;
$nv-color-danger: #ea6060;
$nv-color-warning: #d3b201;
$nv-color-info: #baddef;
$nv-color-dark: #212529;
$nv-color-mode-dark: #202124;

// ---------------------- typography
$nv-text-headline: 24px;
$nv-text-title: 20px;
$nv-text-sub-title: 16px;
$nv-text-body: 14px;
$nv-text-caption: 12px;

// ---------------------- page layout and common
::-webkit-scrollbar {
  border-radius: 8px;
  width: 8px;
  height: 8px;
  display: block;
  background-color: rgba(18, 142, 200, 0.5);
}

::-webkit-scrollbar-corner {
  border-radius: 8px;
}

::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: rgba(18, 142, 200, 0.5);
}

::-webkit-scrollbar-track {
  box-shadow: none;
  border-radius: 8px;
  background-color: rgb(238, 238, 238);
}

.nv-root {
}

.nv-page-layout-content {
  //min-height: calc(100vh - 96px);
  min-height: 100vh;
  display: flex;
  align-items: center;

  &__auth {
    display: flex;
    justify-content: center;
    flex: 1 1 auto;
    flex-direction: column;
    padding: 16px 0;
  }
}

.nv-page-layout-content-horizontal {
  min-height: calc(100vh - 96px);
  display: flex;
  align-items: center;
}

.nv-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.nv-text-center {
  text-align: center;
}

.nv-container-fluid {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

.nv-container {
  max-width: 760px;
  margin: 0 auto;
}

//@media (min-width: 576px) {
//  .nv-container {
//    max-width: 540px;
//  }
//}
//
//@media (min-width: 768px) {
//  .nv-container {
//    max-width: 720px;
//  }
//}
//
//@media (min-width: 992px) {
//  .nv-container {
//    max-width: 960px;
//  }
//}
//
//@media (min-width: 1200px) {
//  .nv-container {
//    max-width: 1140px;
//  }
//}

.nv-container--lg {
  max-width: 960px;
}

.nv-container--xl {
  max-width: 1140px;
  padding: 0 16px;
}

.nv-container-tight {
  width: 100%;
  padding-right: 8px;
  padding-left: 8px;
  margin-right: auto;
  margin-left: auto;
  max-width: 430px;
}

.nv-row {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.nv-row::after {
  content: "";
  clear: both;
  display: table;
}

[class*="nv-col-"] {
  float: left;
  padding: 15px;
}

/* For mobile phones: */
[class*="nv-col-"] {
  width: 100%;
}

@media only screen and (min-width: 576px) {
  /* For tablets: */
  .nv-col-s-1 {
    width: 8.33%;
  }

  .nv-col-s-2 {
    width: 16.66%;
  }

  .nv-col-s-3 {
    width: 25%;
  }

  .nv-col-s-4 {
    width: 33.33%;
  }

  .nv-col-s-5 {
    width: 41.66%;
  }

  .nv-col-s-6 {
    width: 50%;
  }

  .nv-col-s-7 {
    width: 58.33%;
  }

  .nv-col-s-8 {
    width: 66.66%;
  }

  .nv-col-s-9 {
    width: 75%;
  }

  .nv-col-s-10 {
    width: 83.33%;
  }

  .nv-col-s-11 {
    width: 91.66%;
  }

  .nv-col-s-12 {
    width: 100%;
  }
}

@media only screen and (min-width: 768px) {
  /* For desktop: */
  .nv-col-1 {
    width: 8.33%;
  }

  .nv-col-2 {
    width: 16.66%;
  }

  .nv-col-3 {
    width: 25%;
  }

  .nv-col-4 {
    width: 33.33%;
  }

  .nv-col-5 {
    width: 41.66%;
  }

  .nv-col-6 {
    width: 50%;
  }

  .nv-col-7 {
    width: 58.33%;
  }

  .nv-col-8 {
    width: 66.66%;
  }

  .nv-col-9 {
    width: 75%;
  }

  .nv-col-10 {
    width: 83.33%;
  }

  .nv-col-11 {
    width: 91.66%;
  }

  .nv-col-12 {
    width: 100%;
  }
}

.nv-box-shadow {
  box-shadow: rgba(18, 142, 200, 0.3) 0 4px 16px;
}

.nv-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(101, 109, 119, 0.16);
  border-radius: 8px;
  box-shadow: #232e3c0a 0 2px 4px 0;
}

.nv-card-body {
  padding: 32px;
  flex: 1 1 auto;
}

.nv-background-img {
  background-size: cover;
}

.nv-border-primary {
  border-color: $nv-color-black;
}

.nv-fixed-bottom {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
}

.nv-block {
  display: block !important;
}

.nv-none {
  display: none !important;
}

.nv-flex {
  display: flex !important;
}

.nv-hidden {
  overflow: hidden;
}

.nv-relative {
  position: relative;
}

.nv-absolute {
  position: absolute;
}

.nv-h-auto {
  height: auto;
}

.nv-w-auto {
  width: auto;
}

.nv-pointer {
  cursor: pointer;
}

.nv-line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  max-width: 100%;
  word-break: break-all;
}

.nv-line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  max-width: 100%;
  word-break: break-all;
}

// ---------------------- button
.nv-btn {
  cursor: pointer;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  //padding: 0.375rem 0.75rem;
  font-size: 16px;
  line-height: 1.5;
  border-radius: 8px;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &--lg {
    height: 48px;
    padding: 0 24px;
  }

  &--sm {
    height: 32px;
    font-size: 14px;
    line-height: 0;
    min-width: 90px;
    padding: 0 24px;
  }
}

.nv-btn-block {
  width: 100%;
  display: inline-block;
}

.nv-btn-primary {
  color: $nv-color-white;
  background-color: $nv-color-primary;

  &:hover {
    color: $nv-color-white;
    background-color: $nv-color-black-hover;
  }
}

.nv-btn-outline-primary {
  color: $nv-color-primary;
  background-color: $nv-color-white;
  border: 1px solid $nv-color-primary;

  &:hover {
    color: $nv-color-black-hover;
    background-color: $nv-color-white;
  }
}

.nv-btn-black {
  color: $nv-color-white;
  background-color: $nv-color-black;

  &:hover {
    color: $nv-color-white;
    background-color: $nv-color-black-hover;
  }
}

// ---------------------- icon
.nv-btn-icon {
  i-feather.nv-icon {
    svg {
      margin-inline-start: 0;
    }
  }
}

i-feather.nv-icon {
  width: 16px;
  height: 16px;
  //margin-right: 0.25rem;
  svg {
    width: 16px;
    height: 16px;
  }
}

// ---------------------- image
@mixin nv-image($width, $height, $border-radius) {
  position: relative;
  width: $width;
  height: $height;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  vertical-align: bottom;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background: #f1f3f8 no-repeat center/cover;
  border-radius: $border-radius;
  object-fit: cover;
}

.nv-image-250-140-3 {
  @include nv-image(250px, 140px, 3px);
}

.nv-image-40-40-0 {
  @include nv-image(40px, 40px, 0);
}

.nv-image-60-60-3 {
  @include nv-image(60px, 60px, 3px);
}

.nv-image-72-72-100 {
  @include nv-image(72px, 72px, 100%);
}

.nv-image-102-102-3 {
  @include nv-image(102px, 102px, 3px);
}

.nv-bg-dummy-img {
  //background-image: url('./assets/dummy_image.png');
  background-size: cover;
}

.nv-image-logo {
  width: 180px;
  margin: 20px 0;
}

// ---------------------- form and label
.nv-form-item {
  margin-bottom: 16px;

  .ng-invalid:not(form) {
    border-left: 5px solid $nv-color-primary;
  }
}

.nv-form-check {
  position: relative;
  display: block;
  padding-left: 32px;

  .nv-form-check-label {
    margin-bottom: 0;
    font-size: 14px;
  }

  .nv-form-check-input {
    position: absolute;
    width: 20px;
    height: 20px;
    margin-left: -32px;
  }
}

.nv-form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 14px;
  color: $nv-color-black;
}

.nv-form-control {
  display: block;
  width: 100%;
  height: 40px;
  padding: 0.375rem 0.75rem;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 8px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:focus-visible {
    outline: 3px dashed $nv-color-info;
  }

  &--sm {
    height: 32px;
    font-size: 12px;
  }
}

.nv-title-form {
  color: $nv-color-black;
}

.nv-form-footer {
  //margin-top: 32px;
}

// ---------------------- alert and notice
.nv-alert {
  position: relative;
  padding: 8px 16px;
  margin: 16px 0;
  border: 1px solid transparent;
  border-radius: 8px;
}

.nv-alert-warning {
  color: #856404;
  background-color: #fff3cd;
  border-color: #ffeeba;

  .nv-alert-link {
    font-weight: 700;
    color: #533f03;
    text-decoration: underline;
  }
}

.nv-alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}

.nv-alert-success {
  color: #3c763d;
  background-color: #dff0d8;
  border-color: #d6e9c6;
}
</style>
