<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
      <q-toolbar>
        <!-- <span class="dummy"></span> -->
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-separator dark vertical inset />

        <q-toolbar-title> kywi.us / kywi.ca / kywi.cc  </q-toolbar-title>
        <q-btn-dropdown flat>
          <template v-slot:label>
            <div class="row items-center no-wrap">
              <q-avatar size="40px">
                <img :src="userPhotoUrl" />
              </q-avatar>
            </div>
          </template>

          <q-item-label header>Account</q-item-label>

          <router-link to="/auth/signout" class="router-link-inactive">
            <q-item clickable v-close-popup>
              <q-item-section avatar>
                <q-avatar icon="exit_to_app" color="red" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Sign Out </q-item-label>
                <q-item-label caption>{{ userFullName }}</q-item-label>
              </q-item-section>
            </q-item>
          </router-link>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
      :width="240"
    >
      <q-list>
        <q-item-label header class="text-h6">Pricing Tool</q-item-label>

        <router-link to="/home" class="router-link-inactive">
          <q-item clickable>
            <q-item-section avatar> <q-icon name="house" /> </q-item-section>
            <q-item-section>
              Home
              <!-- <q-item-label caption>Caption</q-item-label> -->
            </q-item-section>
          </q-item>
        </router-link>

        <router-link to="/savedproposals" class="router-link-inactive">
          <q-item clickable>
            <q-item-section avatar> <q-icon name="api" /> </q-item-section>
            <q-item-section> Saved Proposals </q-item-section>
          </q-item>
        </router-link>

        <router-link to="/newproposal" class="router-link-inactive">
          <q-item clickable>
            <q-item-section avatar> <q-icon name="dns" /> </q-item-section>
            <q-item-section> New Proposal </q-item-section>
          </q-item>
        </router-link>

        <router-link to="/comps" class="router-link-inactive">
          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="donut_large" />
            </q-item-section>
            <q-item-section> Comps </q-item-section>
          </q-item>
        </router-link>

        <router-link to="/market" class="router-link-inactive">
          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="donut_large" />
            </q-item-section>
            <q-item-section> Market </q-item-section>
          </q-item>
        </router-link>

        <router-link to="/company" class="router-link-inactive">
          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="donut_large" />
            </q-item-section>
            <q-item-section> Company </q-item-section>
          </q-item>
        </router-link>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import Analytics from "@aws-amplify/analytics";

export default {
  // name: 'LayoutDefault',

  components: {
    //  EssentialLink,
    //  TraversalButtons
  },
  data() {
    return {
      leftDrawerOpen: false,
      profileDropDown: false,
      // userPhotoUrl: "",
      // userFullName: "",
      // essentialLinks: linksData,
    };
  },
  methods: {
    showProfileDropDown() {
      this.profileDropDown = !this.profileDropDown;
    },
    getProfile() {
      this.$http
        .get(this.profile_url)
        .then((res) => {
          if (res.data.count == 1) {
            this.$store.dispatch("setProfileExists", true);
            this.$store.dispatch("setProfile", res.data.result);
          }
        })
        .catch((err) => {
          this.$store.dispatch("setProfileExists", false);
          this.$store.dispatch("setProfile", err.message);
        });
    },
    pageTrack() {
      Analytics.autoTrack('pageView', {
          // REQUIRED, turn on/off the auto tracking
          enable: true,
          // OPTIONAL, the event name, by default is 'pageView'
          eventName: 'pageView',
          // OPTIONAL, the attributes of the event, you can either pass an object or a function 
          // which allows you to define dynamic attributes
          attributes: {
              // attr: 'attr'
          },
          // when using function
          // attributes: () => {
          //    const attr = somewhere();
          //    return {
          //        myAttr: attr
          //    }
          // },
          type: 'SPA',
          // OPTIONAL, the service provider, by default is the Amazon Pinpoint
          provider: 'AWSPinpoint',
          // OPTIONAL, to get the current page url
          getUrl: () => {
              // the default function
              return window.location.origin + window.location.pathname;
          }
      });
    },
    updatePinpointEndpoint() {
      var userEmail = this.$store.state.credentials.signInUserSession.idToken.payload.email;
      Analytics.updateEndpoint({
        address: userEmail, // The unique identifier for the recipient. For example, an address could be a device token, email address, or mobile phone number.
        attributes: {
          // Custom attributes that your app reports to Amazon Pinpoint. You can use these attributes as selection criteria when you create a segment.
          // hobbies: ["piano", "hiking"],

        },
        // channelType: "APNS", // The channel type. Valid values: APNS, GCM
        // demographic: {
        //   appVersion: "xxxxxxx", // The version of the application associated with the endpoint.
        //   locale: "xxxxxx", // The endpoint locale in the following format: The ISO 639-1 alpha-2 code, followed by an underscore, followed by an ISO 3166-1 alpha-2 value
        //   make: "xxxxxx", // The manufacturer of the endpoint device, such as Apple or Samsung.
        //   model: "xxxxxx", // The model name or number of the endpoint device, such as iPhone.
        //   modelVersion: "xxxxxx", // The model version of the endpoint device.
        //   platform: "xxxxxx", // The platform of the endpoint device, such as iOS or Android.
        //   platformVersion: "xxxxxx", // The platform version of the endpoint device.
        //   timezone: "xxxxxx", // The timezone of the endpoint. Specified as a tz database value, such as Americas/Los_Angeles.
        // },
        // location: {
        //   city: "xxxxxx", // The city where the endpoint is located.
        //   country: "xxxxxx", // The two-letter code for the country or region of the endpoint. Specified as an ISO 3166-1 alpha-2 code, such as "US" for the United States.
        //   latitude: 0, // The latitude of the endpoint location, rounded to one decimal place.
        //   longitude: 0, // The longitude of the endpoint location, rounded to one decimal place.
        //   postalCode: "xxxxxx", // The postal code or zip code of the endpoint.
        //   region: "xxxxxx", // The region of the endpoint location. For example, in the United States, this corresponds to a state.
        // },
        metrics: {
          // Custom metrics that your app reports to Amazon Pinpoint.
        },
        /** Indicates whether a user has opted out of receiving messages with one of the following values:
         * ALL - User has opted out of all messages.
         * NONE - Users has not opted out and receives all messages.
         */
        optOut: "ALL",
        // Customized userId
        // userId: this.userEmail,
        // User attributes
        userAttributes: {
          // interests: ["football", "basketball", "AWS"],
          // ...
        },
      }).then(() => { console.log("pinpoint endpint updated")});
    },
  },
  created() {
    this.updatePinpointEndpoint()
    this.pageTrack()

  },
  computed: {
    signedIn() {
      return this.$store.state.signedIn;
    },
    userFullName() {
      if (this.$store.state.credentials.signInUserSession)
        return this.$store.state.credentials.signInUserSession.idToken.payload
          .name;
      else return "";
    },

    userPhotoUrl() {
      var picture = this.$store.state.credentials.signInUserSession.idToken.payload.picture
        if (typeof picture === "string") {
          try { // facebook returns an object
            return JSON.parse(picture).data.url
          } catch { // google returns a string
            return picture
            }
          }else {
            return "https://cdn.quasar.dev/img/boy-avatar.png"
          }
          // this.getProfile()
        }
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
    }
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
  color: red;

  /* visibility: hidden; */
  padding-left: 30px;
  margin-left: 20px;
}

.router-link-active {
  color: rgb(14, 2, 2);
  text-decoration: none;
  font-weight: bold;
  background-color: yellow;
  z-index: 10000;
}

.router-link-inactive {
  /* color: rgb(13, 82, 139); */
  text-decoration: none;
  /* font-weight: bold; */
  position: relative;
  z-index: 10000;
}

.my-menu-link {
  color: white;
  background: #f2c037;
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
