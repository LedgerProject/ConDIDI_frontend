<template>
  <v-container class="fill-height pa-0" fluid>
    <v-row justify="center" align="start" class="fill-height pa-0">
      <v-col md="4" class="d-none d-md-block text-center banner" dark>
        <v-row justify="center" align="end" class="fill-height">
          <v-col cols="12" class="text-start pl-12 pr-12 ml-12 pt-0 mt-0">
            <h2 class="text-h4 font-weight-bold" :style="{ opacity: '0.6' }">
              Discover the world’s top Events.
            </h2>
          </v-col>
          <v-col cols="12">
            <v-img
              src="img/clip-dancer.png"
              class="mx-auto my-auto banner-image"
            ></v-img>
          </v-col>
          <v-col cols="12" class="text-start pl-12 pr-12 ml-12 mr-12">
            <p :style="{ opacity: '0.6' }">
              Art by
              <a
                href="https://icons8.com/illustrations/illustration/clip-dancer"
                >icons8</a
              >
            </p>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="8" class="justify-center align-start">
        <v-container
          :style="{
            width: this.$vuetify.breakpoint.mobile ? '100%' : '50%',
            height: '100%',
          }"
        >
          <v-row class="align-start">
            <v-col cols="12" class="text-end">
              <p>Already have an account? <a href="/signIn">Sign In</a></p>
            </v-col>
            <v-col cols="12" class="pt-12">
              <v-form @submit.prevent="signUp">
                <v-container>
                  <v-row align="start" justify="center">
                    <v-col cols="12" class="test-start pb-12">
                      <h1 class="text-h4 text-md-h3">Sign up to ConDIDi</h1>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="firstName"
                        label="First Name"
                        type="text"
                        outlined
                        autofocus
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="lastName"
                        label="Last Name"
                        type="text"
                        outlined
                        autofocus
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="email"
                        label="Email"
                        type="email"
                        outlined
                        autofocus
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="pb-0">
                      <v-text-field
                        v-model="password"
                        label="Password"
                        :type="showPassword ? 'text' : 'password'"
                        hint="At least 8 characters"
                        outlined
                        :hide-details="$vuetify.breakpoint.xs"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPassword = !showPassword"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="pt-0">
                      <p v-html="termsAndConditionsLabel"></p>
                    </v-col>
                    <v-col cols="12" class="text-start justify-start">
                      <v-btn
                        width="50%"
                        :large="!$vuetify.breakpoint.mdAndUp"
                        color="accent"
                        :block="$vuetify.breakpoint.mobile"
                        type="submit"
                        >Create account</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    showPassword: false,
    termsAndConditionsAccepted: false,
    termsAndConditionsLabel:
      "<p>Creating an account means you’re okay with our <a href='/termsOfService'>Terms of Service</a>, <a href='privacyPolicy'>Privacy Policy</a>, and our default <a href='/notificationNotice'>Notification Settings</a>.</p>",
  }),
  methods: {
    ...mapActions({
      register: "users/signUp",
    }),
    signUp() {
      // TODO validation
      this.register({
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style scoped>
.banner {
  height: 100vh;
  width: 100vh;
  background-color: #fcf3a1;
}
</style>
