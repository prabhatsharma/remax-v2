<template>
  <div>

    <UnloggedLayout v-if="!signedIn" />
    <Layout v-if="signedIn" />
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";

import Layout from "./Layout";

import UnloggedLayout from "./UnloggedLayout";

export default {
  components: {
    Layout, UnloggedLayout
  },
  created() {
    Auth.currentAuthenticatedUser()
      .then((creds) => {
        this.$store.dispatch("setCredentials", creds);
        this.$store.dispatch("setSignedIn", true);
        // this.getProfile()
      })
      .catch(() => {
        this.$store.dispatch("setSignedIn", false);
      });
  },
  computed: {
    signInURL() {
      var client_id = awsconfig.aws_user_pools_web_client_id;

      var justUrl = awsconfig.oauth.domain
      var cognitoUrl =
        "https://" + justUrl + "/login?response_type=code&client_id=" +
        client_id +
        "&redirect_uri=";
      var baseURL = window.location.origin + "/auth/signin/";

      return cognitoUrl + baseURL;
    },
    signedIn() {
      return this.$store.state.signedIn;
    },
    userName() {
      if (this.$store.state.credentials.signInUserSession)
        return this.$store.state.credentials.signInUserSession.idToken.payload
          .name;
      else return "";
    },
    userEmail() {
      if (this.$store.state.credentials.signInUserSession)
        return this.$store.state.credentials.signInUserSession.idToken.payload
          .email;
      else return "";
    },
    profile_url() {
      return this.$store.state.API_URL[process.env.VUE_APP_ENV] + "/me";
    },
    sub() {
      return this.$store.state.credentials.signInUserSession.idToken.payload
        .sub;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* #nav {
  padding: 30px;
} */

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: black;
  background-color: rgb(0, 174, 255);
}

.main-menu {
  float: left;
}

.content {
  margin: 20px;
}

.app-menu {
  /* margin-top: 30px; */
  /* margin: 5px; */
  width: 150px;
  border-radius: 0%;
  border: 1px solid lightgray;
  color: #004d99;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.header {
  overflow: hidden;
  background-color: #008080;
  padding: 2px 4px;
}

.header a {
  float: left;
  color: #f5f5dc;
  text-align: left;
  padding: 12px;
  text-decoration: none;
  font-size: 15px;
  line-height: 15px;
  border-radius: 2px;
}

.header a.logo {
  font-size: 25px;
  font-weight: bold;
}

.header a:hover {
  background-color: #ddd;
  color: black;
}

.header a.active {
  background-color: dodgerblue;
  color: white;
}

.header-right {
  float: right;
}

.app-sidebar {
  height: 100%;
  width: 200px;
  background-color: #fff;
  position: fixed !important;
  z-index: 1;
  overflow: auto;
}

.app-light-grey,
.app-hover-light-grey:hover,
.app-light-gray,
.app-hover-light-gray:hover {
  color: #000 !important;
  background-color: #f1f1f1 !important;
}

.app-bar-block .app-dropdown-hover,
.app-bar-block .app-dropdown-click {
  width: 100%;
}

.app-bar-block .app-dropdown-hover .app-dropdown-content,
.app-bar-block .app-dropdown-click .app-dropdown-content {
  min-width: 100%;
}

.app-bar-block .app-dropdown-hover .app-button,
.app-bar-block .app-dropdown-click .app-button {
  width: 100%;
  text-align: left;
  padding: 8px 16px;
}

.app-bar-block .app-bar-item {
  width: 100%;
  display: block;
  padding: 8px 16px;
  text-align: left;
  border: none;
  white-space: normal;
  float: none;
  outline: 0;
}

.app-bar-block.app-center .app-bar-item {
  text-align: center;
}

.app-block {
  display: block;
  width: 100%;
}
.signout {
  color: white;
}

.drawer-uniqin {
  color: red;
  padding-left: 10px;
}
.dummy {
  color: white;
  visibility: hidden;
  padding-right: 30px;
}

@media screen and (max-width: 500px) {
  .header a {
    float: none;
    display: block;
    text-align: left;
  }

  .header-right {
    float: none;
  }
}
</style>
