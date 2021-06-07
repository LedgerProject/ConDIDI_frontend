<template>
  <v-container :class="contentArea" fluid>
    <v-row justify="center" align="start">
      <v-col cols="12" class="text-start pb-0">
        <h1 class="text-h3">Events list</h1>
      </v-col>
      <v-col cols="12" class="pt-0">
        <p class="text-h6 pl-1 font-weight-light">
          Here you will see all events
        </p>
      </v-col>
      <v-col cols="12">
        <v-toolbar dark color="primary" class="mb-1">
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-sort"
              label="Sort by"
              class="pl-4"
            ></v-select>
            <v-btn-toggle v-model="sortDesc" mandatory class="ml-4">
              <v-btn large depressed color="secondary" :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn large depressed color="secondary" :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
            <v-tooltip bottom>
              <v-spacer></v-spacer>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  @click="tableView = !tableView"
                  v-bind="attrs"
                  v-on="on"
                  class="ml-4"
                >
                  <v-icon :color="tableView ? 'secondary' : 'grey lighten-3'"
                    >mdi-table</v-icon
                  >
                </v-btn>
              </template>
              <span>Table view</span>
            </v-tooltip>
            <v-spacer></v-spacer>
          </template>
          <CreateEventDialog></CreateEventDialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </v-col>
      <v-col v-if="tableView" cols="12">
        <EventTable
          :events="getEvents"
          :items-per-page="itemsPerPage"
          :search="search"
          :sort-by="sortBy"
          :sort-desc="sortDesc"
          :items-per-page-array="itemsPerPageArray"
          :keys="keys"
          :loading="getLoading"
          @edit-item="editItem"
          @delete-item="deleteItem"
        ></EventTable>
      </v-col>
      <v-col v-else cols="12">
        <EventTableCards
          :events="getEvents"
          :search="search"
          :sort-by="sortBy"
          :sort-desc="sortDesc"
          :keys="keys"
          :items-per-page-array="itemsPerPageArray"
          :items-per-page="itemsPerPage"
          @updateItemsPerPage="updateItemsPerPage"
        ></EventTableCards>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EventTable from "../../../components/events/EventTable";
import EventTableCards from "../../../components/events/EventTableCards";
import { mapActions, mapGetters } from "vuex";
import { format, parseISO } from "date-fns";
import CreateEventDialog from "../../../components/events/creation/CreateEventDialog";
export default {
  components: { CreateEventDialog, EventTableCards, EventTable },
  data() {
    return {
      tableView: false,
      events: [],
      search: "",
      sortBy: "Name",
      keys: ["Name", "Subject", "Type", "Registration_Deadline", "Date"],
      sortDesc: false,
      itemsPerPageArray: [4, 8, 12],
      itemsPerPage: 8,
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      dateMenu1: false,
      dateMenu2: false,
      editedItem: {
        name: "",
        subject: "",
        type: "",
        registration_deadline: format(
          parseISO(new Date().toISOString()),
          "yyyy-MM-dd"
        ),
        date: format(parseISO(new Date().toISOString()), "yyyy-MM-dd"),
      },
      defaultItem: {
        name: "",
        subject: "",
        type: "",
        registration_deadline: format(
          parseISO(new Date().toISOString()),
          "yyyy-MM-dd"
        ),
        date: format(parseISO(new Date().toISOString()), "yyyy-MM-dd"),
      },
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    // call again the method if the route changes
    $route: "fetchData",
  },
  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions("events", ["addEvent", "deleteEvent", "fetchEvents"]),

    fetchData() {
      this.fetchEvents();
    },

    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },

    editItem(item) {
      this.editedIndex = this.events.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedItem = item;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteEvent(this.editedItem);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
  computed: {
    ...mapGetters("events", ["getEvents", "getLoading"]),
    contentArea() {
      return this.$vuetify.breakpoint.mdAndUp ? "contentArea" : "";
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    computedDateFormattedDatefns() {
      return this.editedItem.date
        ? format(parseISO(this.editedItem.date), "EEEE, MMMM do yyyy")
        : "";
    },
  },
};
</script>

<style scoped>
.contentArea {
  padding-top: 5rem;
  padding-left: 5rem;
  padding-right: 5rem;
}
.contentAreaMobile {
}
</style>
