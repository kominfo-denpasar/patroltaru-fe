<template>
    <v-dialog
      v-model="dialog"
      hide-overlay
      persistent
      width="450"
    >
      <v-card
        color="error"
        dark
        style="padding: 16px;"
      >
        <v-card-title>
            Error
        </v-card-title>
        <v-card-subtitle class="subtitle-text" style="margin-top: 4px; color: white !important;">
            Sesi kamu habis, silahkan login kembali
        </v-card-subtitle>
        <v-card-actions style="margin-top: -8px;">
            <v-spacer></v-spacer>

            <v-btn 
                @click="logout()"
                color="white"
                class="black--text"
            >
                Logout
            </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
export default {
    name: 'Loading-Bar',
    props: {
        dialog: {
            default: false
        },
        message: {
            default: "",
        },
        closeDialog: Boolean
    },
    methods: {
        close() {
            this.$emit('update:dialog', false)
        },

        async logout() {
            await this.$auth.logout();
            window.location.reload();
        }
    },
}
</script>