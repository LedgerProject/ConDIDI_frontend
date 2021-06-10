<template>
  <v-container class="fill-height pa-0" fluid>
    <v-row justify="center" align="center" class="fill-height pa-0">
      <v-col md="4" class="d-none d-md-block text-center banner" dark>
        <v-row justify="center" align="end" class="fill-height">
          <v-col cols="12" class="text-start pl-12 pr-12 ml-12 pt-0 mt-0">
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
            <v-col cols="12">
              <v-form @submit.prevent="onSignIn">
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
                    <v-col cols="12" class="text-start">
                      <router-link to="signUp"
                        >You do not have an account? Sign up</router-link
                      >
                    </v-col>
                    <v-col cols="12" class="text-start justify-start">
                      <v-btn
                        width="50%"
                        :large="!$vuetify.breakpoint.mdAndUp"
                        color="accent"
                        :block="$vuetify.breakpoint.mobile"
                        type="submit"
                        >Sign in</v-btn
                      >
                    </v-col>
                    <v-col cols="12">
                      <QRCodeDialog
                        dialog-title="Sign in with your Jolocom SmartWallet"
                        :show="dialogWallet"
                        :data="interactionToken"
                        @open="onSignInWithWallet"
                        @close="onSignInWithWalletCompleted"
                      ></QRCodeDialog>
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
import QRCodeDialog from "../components/qrcode/QRCodeDialog";
import router from "../router";

export default {
  components: { QRCodeDialog },
  data: () => ({
    dialogWallet: false,
    loading: false,
    interactionToken: "",
    email: "",
    password: "",
    showPassword: false,
    termsAndConditionsAccepted: false,
    termsAndConditionsLabel:
      "<p>Signing in with your accoutn means you’re okay with our <a href='/termsOfService'>Terms of Service</a>, <a href='privacyPolicy'>Privacy Policy</a>, and our default <a href='/notificationNotice'>Notification Settings</a>.</p>",
  }),
  methods: {
    ...mapActions({
      signIn: "users/signIn",
      signInWithJolocomSmartWallet: "users/signInWithJolocomSmartWallet",
      signInWithToken: "users/signInWithToken",
    }),
    async onSignIn() {
      this.loading = true;
      await this.signIn({ email: this.email, password: this.password });
      this.loading = false;
    },
    async onSignInWithWallet() {
      this.loading = true;
      this.dialogWallet = true;
      this.interactionToken = await this.signInWithJolocomSmartWallet();
      this.loading = false;
    },
    async onSignInWithWalletCompleted() {
      if (this.interactionToken) {
        await this.signInWithToken();
        await router.push("/user");
        this.dialogWallet = false;
      }
    },
  },
};
</script>

<style scoped>
.banner {
  height: 100%;
  width: 100%;
  background-color: #f78234;
}
</style>
