<template>
  <v-app
    id="koala"
    style="background-color: transparent;"
  >
    <!-- <v-parallax
      style="position: absolute; opacity: 0.8"
      :style="{ height: backgroundSize.height + 'px', width: backgroundSize.width + 'px' }"
      src="@/assets/background_v2.png"
    /> -->
    <v-img
      style="position: fixed; opacity: 0.8"
      :style="{ height: '100vh', width: '100%' }"
      src="@/assets/background_v2.png"
    />
    <v-app-bar
      app
      clipped-left
      color="green lighten-1"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <transition name="fade">
        <span
          v-if="!mobileSearch"
          class="title ml-3 mr-5"
        ><span class="font-weight-light">One&nbsp;Hundred&nbsp;</span>Koalas</span>
      </transition>
      <v-spacer />

      <v-text-field
        v-if="$vuetify.breakpoint.smAndUp"
        v-model="search"
        solo-inverted
        flat
        hide-details
        label="Search"
        prepend-inner-icon="mdi-magnify"
      />
      <div
        v-else
        style="position: absolute; right: 0"
        class="mx-1"
      >
        <transition name="slide-x-reverse-transition">
          <v-text-field
            v-if="mobileSearch"
            v-model="search"
            solo-inverted
            flat
            autofocus
            hide-details
            label="Search"
            prepend-inner-icon="mdi-magnify"
            append-icon="mdi-close"
            style="width: calc(100vw - 8px); background: white;"
            @click:append="mobileSearch = false; search=''"
          />
        </transition>
      </div>
      <v-spacer />
      <v-icon
        v-if="!$vuetify.breakpoint.smAndUp && !mobileSearch"
        @click="mobileSearch = true"
      >
        mdi-magnify
      </v-icon>
      <v-tooltip
        v-if="$vuetify.breakpoint.smAndUp"
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            class="mr-1 grey darken-3 "
            color="grey lighten-4"
            v-on="on"
          >
            <v-icon>
              mdi-account-group
            </v-icon>
          </v-btn>
        </template>
        <v-img
          src="@/assets/koala_basic.png"
          width="50"
          class="mb-1"
        />
        <div class="font-weight-bold">
          Project made by
        </div>
        <div class="overline">
          Raivis Ulsts
        </div>

        <div class="font-weight-bold mt-1">
          Collaborators
        </div>
        <div class="overline">
          Valters Sudmalis
        </div>
        <div class="overline">
          Aivars Kaminskis
        </div>
      </v-tooltip>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      color="grey lighten-4"
    >
      <v-img
        src="@/assets/koala.png"
      />
      <v-list
        dense
        class="grey lighten-4"
      >
        <template v-for="(item, i) in filteredItems">
          <v-row
            v-if="item.heading"
            :key="i"
            align="center"
          >
            <v-col
              cols="12"
              class="py-0"
            >
              <v-subheader
                v-if="item.heading"
                class="subtitle-1 font-weight-bold"
              >
                {{ item.heading }}
              </v-subheader>
            </v-col>
          </v-row>
          <v-divider
            v-else-if="item.divider"
            :key="i"
            dark
            class="my-4"
          />
          <v-list-item
            v-else
            :key="i"
            link
            :to="item.to"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <v-row v-if="filteredItems.length === 1">
          <v-col
            cols="12"
            class="py-0"
          >
            <v-subheader
              class="ml-2 subtitle-1 font-weight-bold grey-text"
            >
              No results found
            </v-subheader>
          </v-col>
        </v-row>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container
        fluid
        class="fill-height d-flex justify-center"
      >
        <router-view
          v-vueresize:debounce.50.initial="setHeight"
          :search="search"
          :rerender="rerender"
        />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import resize from 'vue-resize-directive'
import Mark from 'mark.js'

export default {
  directives: {
    vueresize: resize
  },
  data: () => ({
    drawer: null,
    search: '',
    height: 0,
    items: [
      { icon: 'mdi-home', text: 'Home', to: '/' },
      { divider: true },
      { heading: 'Compression algorithms' },
      { icon: 'mdi-zip-box', text: 'LZW', to: '/lzw' },
      { icon: 'mdi-zip-box-outline', text: 'Huffman', to: '/huffman' },
      { divider: true },
      { heading: 'Test lab' },
      { icon: 'mdi-text-short', text: 'Compress text', to: '/string' },
      { icon: 'mdi-file', text: 'Compress a file', to: '/file' }
    ],
    mobileSearch: false,
    rerender: 0
  }),
  computed: {
    filteredItems () {
      return this.search ? this.items.filter(i => i.text === 'Home' || i.text?.toLowerCase().includes(this.search.toLowerCase())) : this.items
    }
    // backgroundSize () {
    //   const height = Math.max(this.$vuetify.breakpoint.height, this.height)
    //   return {
    //     height: height,
    //     width: Math.min((height / 0.590) < this.$vuetify.breakpoint.width ? this.$vuetify.breakpoint.width : height / 0.590, this.$vuetify.breakpoint.width)
    //   }
    // }
  },
  watch: {
    $route () {
      this.$nextTick(() => this.highlight(this.search))
    },
    search (v) {
      this.$nextTick(() => this.highlight(v))
    },
    filteredItems () {
      this.rerender++
    }
  },
  methods: {
    setHeight (e) {
      this.height = e.clientHeight
    },
    highlight (text) {
      const markInstance = new Mark(document.querySelector('.v-content'))
      markInstance.unmark({ done: () => markInstance.mark(text, []) })

      const mark = document.querySelector('mark')
      if (mark) {
        mark.scrollIntoView({ block: 'center' })
      }
    }
  }
}
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none
}
.highlight {
  background-color: yellow;
}
</style>
