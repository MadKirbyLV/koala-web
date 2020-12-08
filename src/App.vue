<template>
  <v-app style="background: transparent;">
    <layout />
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
    Layout: () => import('@/Layout')
  }
}
</script>
