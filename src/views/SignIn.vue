<template>
  <v-container class="fill-height pa-0" fluid>
    <v-row justify="center" align="start" class="fill-height pa-0">
      <v-col md="4" class="d-none d-md-block text-center banner" dark>
        <v-row justify="center" align="end" class="fill-height">
          <v-col cols="12" class="text-start pl-12 pr-12 ml-12 pt-0 mt-0">
            <v-btn text @click="$router.push('/')" class="pb-6 ml-0 pl-0">
              <h3
                class="text-h5 font-weight-bold text-lowercase"
                :style="{ opacity: '0.6' }"
              >
                ConDIDI
              </h3>
            </v-btn>
            <h2 class="text-h4 font-weight-bold" :style="{ opacity: '0.6' }">
              Discover the world’s top Events.
            </h2>
          </v-col>
          <v-col cols="12">
            <v-img
              src="img/clip-working-from-home-1.png"
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
      <v-col cols="12" md="8">
        <v-container
          class="pa-md-12"
          :style="{ width: this.$vuetify.breakpoint.mobile ? '100%' : '50%' }"
        >
          <v-row>
            <v-col cols="12" class="text-end">
              <p>You do not have an account? <a href="/signUp">Sign Up</a></p>
            </v-col>
            <v-col cols="12">
              <v-form @submit="signIn">
                <v-container>
                  <v-row align="start" justify="center">
                    <v-col cols="12" class="test-start pb-12">
                      <h1 class="text-h4 text-md-h3">Sign in to ConDIDi</h1>
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
export default {
  data: () => ({
    email: "",
    password: "",
    showPassword: false,
    termsAndConditionsAccepted: false,
    termsAndConditionsLabel:
      "<p>Creating an account means you’re okay with our <a href='/termsOfService'>Terms of Service</a>, <a href='privacyPolicy'>Privacy Policy</a>, and our default <a href='/notificationNotice'>Notification Settings</a>.</p>",
  }),
  methods: {
    handleSubmit() {
      this.$axios.post("/").then((response) => {
        let is_admin = response.data.user.is_admin;
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("jwt", response.data.token);

        if (localStorage.getItem("jwt") != null) {
          this.$emit("loggedIn");
          if (this.$route.params.nextUrl != null) {
            this.$router.push(this.$route.params.nextUrl);
          } else {
            if (is_admin == 1) {
              this.$router.push("admin");
            } else {
              this.$router.push("dashboard");
            }
          }
        }
      });
    },
    signIn() {
      this.$router.push("/user");
    },
  },
};
</script>

<style scoped>
.banner {
  height: 100vh;
  width: 100vh;
  background-color: #f78234;
}
</style>
