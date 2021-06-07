<template>
  <v-container fluid>
    <v-data-iterator
      :items="events"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      item-key="eventid"
      hide-default-footer
    >
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.eventid"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <EventCard :item="item"></EventCard>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="`pagination-${index}`"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span class="mr-4 grey--text">
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import EventCard from "./EventCard";
export default {
  name: "EventTableCards",
  components: { EventCard },
  data() {
    return {
      filter: {},
      page: 1,
    };
  },
  props: {
    events: {
      type: Array,
      required: true,
      default: () => [],
    },
    search: {
      type: String,
      required: true,
      default: "",
    },
    sortBy: {
      type: String,
      required: true,
      default: "name",
    },
    sortDesc: {
      type: Boolean,
      required: true,
      default: false,
    },
    keys: {
      type: Array,
      required: true,
      default: () => [],
    },
    itemsPerPageArray: {
      type: Array,
      required: true,
      default: () => [],
    },
    itemsPerPage: {
      type: Number,
      required: true,
      default: 4,
    },
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.events.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "Name");
    },
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.$emit("updateItemsPerPage", number);
    },
  },
};
</script>
