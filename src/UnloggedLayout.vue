<template>
  <q-layout view="hHh lpR fFf">

    <q-header reveal  class="bg-blue-3 text-black" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn flat icon="trending_up"></q-btn> Uniqin
        </q-toolbar-title>

        <q-tabs align="left">
          <q-route-tab to="/" label="Home" />
          <q-route-tab to="/product" label="Product" />
          <q-route-tab to="/about" label="About" />
        </q-tabs>
        <q-space />

        <q-btn v-if="!$store.state.signedIn" type="a" :href="signInURL" label="Sign In" push color="purple" />

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          Uniqin
        </q-toolbar-title>
        Copyright © 2021 uniqin.ai
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import awsconfig from "./aws-exports";

export default {
  name: 'UnloggedLayout',
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

  }
}
</script>

