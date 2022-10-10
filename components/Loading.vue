<template>
    <v-dialog
      v-model="dialog"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
        style="padding-top: 8px;"
      >
        <v-card-text class="subtitle-text" style="color: white !important;">
          {{ message }}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>
<script>
export default {
    name: 'Loading-Bar',
    props: ['dialog', 'message']
}
</script>