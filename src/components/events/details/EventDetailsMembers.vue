<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="text-h2">Participants</h2>
      </v-col>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="participants"
          sort-by="calories"
          class="elevation-1"
          loading-text="Loading participants"
          :loading="loading"
          item-key="participantid"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-spacer></v-spacer>
              <v-dialog
                v-model="dialog"
                max-width="500px"
                :fullscreen="$vuetify.breakpoint.mobile"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    New Item
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.firstName"
                            label="First name"
                            autofocus
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.lastName"
                            label="Last name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.email"
                            label="Email"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog
                v-model="dialogConfirmParticipation"
                max-width="800px"
                :fullscreen="$vuetify.breakpoint.mobile"
              >
                <v-card>
                  <v-card-title class="text-h5"
                    >Confirm participation?
                    <v-spacer></v-spacer>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs"
                          v-on="on"
                          icon
                          @click="closeParticipationConfirmation"
                          ><v-icon>mdi-close</v-icon></v-btn
                        >
                      </template>
                      <span>Close</span>
                    </v-tooltip>
                  </v-card-title>
                  <v-card-text>
                    Participant has the following email:
                    <strong> {{ editedItem.email }}</strong>
                    <br />
                    This action can not be undone.
                    <br />
                  </v-card-text>
                  <v-card-text class="text-center justify-center align-center">
                    <QRCode :data="qrCodeData"></QRCode>
                  </v-card-text>
                </v-card>
              </v-dialog>
              <v-dialog
                v-model="dialogDelete"
                max-width="800px"
                :fullscreen="$vuetify.breakpoint.mobile"
              >
                <v-card>
                  <v-card-title class="text-h5"
                    >Remove participant from event?
                    <v-spacer></v-spacer>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs"
                          v-on="on"
                          icon
                          @click="closeDelete"
                          ><v-icon>mdi-close</v-icon></v-btn
                        >
                      </template>
                      <span>Close</span>
                    </v-tooltip>
                  </v-card-title>
                  <v-card-text>
                    Participant has the following email:
                    <strong> {{ editedItem.email }}</strong>
                    <br />
                    This action can not be undone.
                    <br />
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="deleteItemConfirm" color="primary"
                      >Confirm</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-bind="attrs"
                  v-on="on"
                  small
                  @click="deleteItem(item)"
                >
                  mdi-delete
                </v-icon>
              </template>
              <span>Remove participant from event</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-bind="attrs"
                  v-on="on"
                  small
                  @click="confirmParticipation(item)"
                  class="ml-4"
                >
                  mdi-pencil
                </v-icon>
              </template>
              <span>Confirm the attendance of the participant</span>
            </v-tooltip>
          </template>
          <!--          <template v-slot:no-data>-->
          <!--            <v-btn color="primary" @click="initialize"> Reset </v-btn>-->
          <!--          </template>-->
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import QRCode from "../../qrcode/QRCode";

export default {
  name: "EventDetailsMembers",
  components: { QRCode },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    dialogConfirmParticipation: false,
    id: "",
    headers: [
      {
        text: "Email",
        align: "start",
        value: "email",
      },
      { text: "First name", value: "firstName" },
      { text: "Last name", value: "lastName" },
      { text: "Accepted", value: "accepted" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      firstName: "",
      lastName: "",
      email: "",
      verified: false,
    },
    defaultItem: {
      firstName: "",
      lastName: "",
      email: "",
      verified: false,
    },
    qrCodeData: "",
  }),

  computed: {
    ...mapGetters({
      participants: "participants/getParticipants",
      loading: "participants/getLoading",
    }),
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
    $route: "fetchData",
  },

  mounted() {
    this.id = this.$router.currentRoute.params.id;
    this.fetchData(this.id);
  },

  methods: {
    ...mapActions({
      fetchData: "participants/fetch",
      addParticipant: "participants/addParticipant",
      removeParticipant: "participants/deleteParticipant",
      createQRCodeForParticipant: "participants/createQRCodeForParticipant",
    }),
    editItem(item) {
      this.editedIndex = this.participants.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.participants.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async confirmParticipation(item) {
      this.editedItem = Object.assign({}, item);
      this.qrCodeData = await this.createQRCodeForParticipant({
        participant: this.editedItem,
        eventid: this.id,
      });
      this.dialogConfirmParticipation = true;
    },

    async deleteItemConfirm() {
      await this.removeParticipant({
        participant: this.editedItem,
        eventid: this.id,
      });
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

    closeParticipationConfirmation() {
      this.dialogConfirmParticipation = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        // Object.assign(this.participants[this.editedIndex], this.editedItem);
      } else {
        // this.participants.push(this.editedItem);
        this.addParticipant({ eventid: this.id, participant: this.editedItem });
      }
      this.close();
    },
  },
};
</script>

<style scoped></style>
