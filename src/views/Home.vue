<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    style="width: 100%; max-width: 700px; height: 100%;"
    class="d-flex flex-wrap"
  >
    <v-flex
      v-for="(card, i) in filteredCards"
      :key="i"
      class="pa-2"
      xs12
      sm6
    >
      <v-responsive
        aspect-ratio="1"
      >
        <v-card
          :key="rerender"
          class="mx-auto"
          height="100%"
          outlined
        >
          <v-list-item style="height: 80%; align-items: start;">
            <v-list-item-content style="height:100%, display: block; align-self: start;">
              <div class="overline mb-4">
                {{ card.type }}
              </div>
              <v-list-item-title class="headline mb-1 font-weight-bold">
                {{ card.text }}
              </v-list-item-title>
              <v-list-item-subtitle
                class="mt-5"
                style="white-space: normal;"
                v-html="card.content"
              />
            </v-list-item-content>
            <v-list-item-avatar
              tile
              size="80"
              style="align-self: start;"
            >
              <v-icon size="80">
                {{ card.icon }}
              </v-icon>
            </v-list-item-avatar>
          </v-list-item>
          <v-card-actions style="height:20%">
            <v-btn
              color="#49A078"
              width="120px"
              class="ma-3 white--text"
              medium
              :to="card.to"
            >
              {{ card.action }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-responsive>
    </v-flex>
    <v-snackbar
      v-model="noResults"
      absolute
      top
      :timeout="0"
      color="error"
    >
      No search results for this query
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    search: { type: String, default: '' },
    rerender: { type: Number, default: 0 }
  },
  data: () => ({
    noResults: false,
    cards: [
      { type: 'Compression method #1', to: 'lzw', icon: 'mdi-zip-box', text: 'LZW', action: 'Read more', content: '<b>The LZW algorithm</b> is a very common compression technique. It is the algorithm of the widely used Unix file compression utility compress, and is used in the GIF image format. ...' },
      { type: 'Compression method #2', to: 'huffman', icon: 'mdi-zip-box-outline', text: 'Huffman', action: 'Read more', content: '<b>Huffman code</b> is a particular type of optimal prefix code that is commonly used for lossless data compression. It compresses data very effectively saving from 20% to 90% memory. ... ' },
      { type: 'Test lab #1', to: 'string', icon: 'mdi-text', text: 'Compress text', action: 'Try now', content: 'In this section you can enter your own string to compress and compare efficiency of <b>LZW</b> and <b>Huffman</b> compression methods.' },
      { type: 'Test lab #2', to: 'file', icon: 'mdi-file', text: 'Compress a file', action: 'Try now', content: 'In this section you can select a local file to compress and compare efficiency of <b>LZW</b> and <b>Huffman</b> compression methods.' }
    ]
  }),
  computed: {
    filteredCards () {
      return this.cards.filter(c => c.text.toLowerCase().includes(this.search.toLowerCase()) || c.content.toLowerCase().includes(this.search.toLowerCase()))
    }
  },
  watch: {
    filteredCards (v) {
      this.noResults = !v.length
    }
  }
}
</script>

<style>
</style>
