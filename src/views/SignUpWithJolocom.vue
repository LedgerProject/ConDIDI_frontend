<template>
  <v-container class="fill-height pa-0" fluid>
    <v-row justify="center" align="center" class="fill-height pa-0">
      <v-col md="4" class="d-none d-md-block text-center banner" dark>
        <v-row justify="center" align="start" class="fill-height">
          <v-col cols="12" class="text-start pl-12 pr-12 ml-12 pt-0 mt-0">
            <h2 class="text-h4 font-weight-bold" :style="{ opacity: '0.6' }">
              Discover the world’s top Events.
            </h2>
          </v-col>
          <v-col cols="8" class="align-center justify-center text-center">
            <v-img contain src="img/jolocom-home-white.svg"></v-img>
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
            <v-col cols="12" class="pt-12">
              <v-form @submit.prevent="signUp">
                <v-container>
                  <v-row align="start" justify="center">
                    <v-col cols="12" class="test-start">
                      <h1 class="text-h4 text-md-h3">Sign up to ConDIDi</h1>
                    </v-col>
                    <v-col cols="12">
                      <h2 class="text-h5">Create your Jolocom SmartWallet identity</h2>
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
                    <v-col cols="12">
                      <QRCodeDialog
                        btn-label="Sign up with Jolocom SmartWallet"
                        dialog-title="Sign up with your Jolocom SmartWallet"
                        :show="dialogWallet"
                        :data="interactionToken"
                        @open="oSignUpWithJolocomSmartWallet"
                        @close="onSignUpWithJolocomSmartWalletCompleted"
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

export default {
  components: { QRCodeDialog },
  data: () => ({
    dialogWallet: false,
    interactionToken: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    showPassword: false,
    termsAndConditionsAccepted: false,
    termsAndConditionsLabel:
      "<p>Creating an account means you’re okay with our <a href='/termsOfService'>Terms of Service</a> and <a href='data-protection'>Privacy Policy</a>.</p>",
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
    oSignUpWithJolocomSmartWallet() {
      this.dialogWallet = true;
      console.log("sign up");
    },
    onSignUpWithJolocomSmartWalletCompleted() {
      this.dialogWallet = false;
    },
  },
};
</script>

<style scoped>
.banner {
  height: 100%;
  width: 100%;
  background-color: black;
}
</style>
