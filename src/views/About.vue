<template>
  <v-container class="fill-height pl-md-12 pr-md-12 ml-md-12 mr-md-12" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" md="6">
        <v-row>
          <v-col cols="12" class="text-start">
            <h1 class="text-h1 font-weight-black">ConDIDI</h1>
          </v-col>
          <v-col cols="12">
            <h2 class="text-h4"> Full lifecycle decentralized conference participant management </h2>
          </v-col>
          <v-col>
            <p class="text-h6 font-weight-light">ConDIDI will allow conference organisers to issue digital credentials of attendance to participants, building on the leading role the Technische Informationsbibliothek (TIB) is playing in Germany in introducing unique researcher, publication and conference IDs, and improving on the state of the art of digital credentials. This will allow the participants have digital proof of participation (participant, presenter, chair) and for the organiser to easily manage participation and credential issuing and revocation.</p>

            <p class="text-h6 font-weight-light">The MVP will be a frontend for managing the participant list and combined with a decentralized identity (DID) and credential issuing wallet backend, based on the pioneering work of Jolocom. Credentials issued will follow international standards like OpenBadges and thus be easily included into existing or future digital CV management systems.</p>

            <p class="text-h6 font-weight-light">Implementation of the full credential lifecycle of issuing and retraction as infrastructure will also benefit other areas and is not restricted to this application.</p>

            <p class="text-h6 font-weight-light">ConDIDI is developed at TIB in cooperation with Jolocom.</p>
            <v-row>
            <v-col cols="6">
            <a href="https://tib.eu/"><v-img
          src="img/TIB_Logo_en.png"
          layzy-src="img/TIB_Logo_en.png"
          alt="TIB logo"
          style="width: 200px"
          contain></v-img></a>
          </v-col>
          <v-col cols="6">
          <a href="https://jolocom.io/"><v-img
          src="img/jolocomlogob.png"
          layzy-src="img/jolocomlogob.png"
          alt="Jolocom logo"
          style="width: 200px"
          contain
        ></v-img></a>
        </v-col>
        </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6" class="d-none d-md-block text-left justify-start">
        <v-img
          src="img/clip-start-up.png"
          layzy-src="img/clip-start-up.png"
          alt="Man who flies into the sky with a jetpack"
          contain
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>
