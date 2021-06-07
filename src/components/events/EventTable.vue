<template>
  <v-data-table
    :headers="headers"
    :items="events"
    :items-per-page.sync="itemsPerPage"
    :search="search"
    :sort-by="sortBy.toLowerCase()"
    :sort-desc="sortDesc"
    :page.sync="page"
    :loading="loading"
    :loading-text="$t('event.list.loading')"
    :no-data-text="$t('event.list.noData')"
    item-key="eventid"
    checkbox-color="primary"
    class="elevation-2"
  >
    <template v-slot:[`item.date`]="{ item }">
      <p>
        {{
          item.date instanceof Date
            ? getDateFormatted(item.date, $i18n.locale)
            : item.date
        }}
      </p>
    </template>
    <template v-slot:[`item.registration_deadline`]="{ item }">
      <p>
        {{
          item.registration_deadline instanceof Date
            ? getDateFormatted(
                new Date(item.registration_deadline),
                $i18n.locale
              )
            : item.registration_deadline
        }}
      </p>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "EventTable",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    page: 1,
  }),
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
    loading: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  computed: {
    headers() {
      const values = [];

      for (const item of this.keys) {
        if (!item.toLowerCase() !== "address") {
          values.push({
            text: item,
            value: item.toLowerCase(),
            sortable: false,
          });
        }
      }
      values.push({ text: "Actions", value: "actions", sortable: false });

      return values;
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    editItem(item) {
      this.$emit("edit-item", item);
    },

    deleteItem(item) {
      this.$emit("delete-item", item);
    },

    deleteItemConfirm() {
      // this.events.splice(this.editedIndex, 1);
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

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.events[this.editedIndex], this.editedItem);
      } else {
        // this.events.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style scoped></style>
