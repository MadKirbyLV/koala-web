<template>
  <v-card
    :width="$vuetify.breakpoint.smAndUp ? '80%' : '100%'"
    color="#eee"
    outlined
  >
    <div class="mx-5">
      <v-btn
        color="#49A078"
        width="100%"
        outlined
        class="mt-3 mb-1 #49A078--text"
        large
        to="/"
      >
        Back to main menu
      </v-btn>
    </div>
    <lzw-wiki :style="$vuetify.breakpoint.smAndUp ? 'margin: 8px 20px;' : 'margin: -12px 6px;'" />
    <v-card-actions>
      <v-btn
        color="#49A078"
        width="150px"
        class="ma-3 white--text"
        large
        to="/"
      >
        Back
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  components: {
    LzwWiki: () => import('@/components/LzwWiki')
  }
}
</script>
