<template>
    <v-dialog
      v-model="dialog"
      hide-overlay
      persistent
      width="450"
    >
      <v-card
        color="primary"
        dark
        style="padding: 16px;"
      >
        <v-card-title>
            Info
        </v-card-title>
        <v-card-subtitle class="subtitle-text" style="margin-top: 4px; color: white !important;">
            {{ message }}
        </v-card-subtitle>
        <v-card-actions style="margin-top: -8px;">
            <v-spacer></v-spacer>

            <v-btn 
                @click="close()"
                text
            >
                Kembali
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
        }
    },
}
</script>