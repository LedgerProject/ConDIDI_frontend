<template lang="pug">
  v-container(class="fill-height")
    v-row(align="center" justify="center")
      v-col(cols="12" md="6" class="text-start")
        v-row
          v-col(cols="12" class="text-start")
            h1(class="text-h1") Oh no! Error 404
          v-col(cols="12" class="text-start")
            p(class="text-h5") The page you are looking for could not be found ...
          v-col(cols="12")
            v-btn(@click="$router.back()" text)
              v-icon mdi-arrow-left
              | Back to previous page
</template>

<script>
export default {
  name: "NotFound",
};
</script>