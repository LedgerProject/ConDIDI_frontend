<template lang="pug">
  v-container(class="fill-height")
    v-row(class="fill-height" align="center" justify="center")
      v-col(cols="12" class="text-center")
        h1(class="text-h2") Oh now, the resource could not be found.
      v-col(cols="12" class="text-center")
        v-img(alt="Searching for route path" eager max-height="50vh" src="img/clip-2.png")
      v-col(cols="12" class="text-center")
        v-btn(@click="$router.back()" text)
          v-icon mdi-arrow-left
          | Back to previous page
</template>

<script>
export default {
  name: "NotFound",
};
</script>