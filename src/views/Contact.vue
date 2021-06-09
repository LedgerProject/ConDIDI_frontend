<template>
  <v-container fluid>
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12">
        <ContactSection></ContactSection>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ContactSection from "../components/landing/ContactSection";
export default {
  components: { ContactSection }
}
</script>