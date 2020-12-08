<template>
  <div
    style="width: 100%;"
    class="d-flex align-center"
    :class="[$vuetify.breakpoint.mdAndUp ? 'flex-row' : 'flex-column']"
  >
    <v-btn
      v-if="!$vuetify.breakpoint.mdAndUp"
      color="#49A078"
      width="250px"
      outlined
      class="mx-5 mt-2 mb-3 #49A078--text"
      large
      to="/"
    >
      Back to main menu
    </v-btn>
    <v-col :cols="$vuetify.breakpoint.mdAndUp ? 2 : 0" />
    <v-col :cols="$vuetify.breakpoint.mdAndUp ? 6 : 12">
      <v-card
        :class="[$vuetify.breakpoint.mdAndUp ? 'pa-5 ma-5' : 'pa-1 ma-1']"
      >
        <v-card-text>
          <p class="display-1 text--primary">
            Input
          </p>

          <v-textarea
            v-model="inputRaw"
            label="Enter string to compress"
            clearable
            auto-grow
            rows="1"
            hint="Example: koala koala koala koala koala"
            @click:clear="outputLZW = ''"
            @input="compressLZW($event), compressHoffman($event)"
          />

          <div class="text--primary pt-2">
            <span class="font-weight-bold">Size: </span>{{ getSize(inputRaw) + ' bytes' }}
          </div>
        </v-card-text>

        <v-divider />

        <v-card-text>
          <span class="display-1 text--primary">
            Output
          </span>
          <span class="pl-3 font-weight-bold">
            LZW compressed
          </span>

          <v-textarea
            v-model="outputLZW"
            disabled
            auto-grow
            rows="1"
            label="Output string"
          />

          <div class="text--primary">
            <span class="font-weight-bold">Size: </span><span>{{ getSize(outputLZW) + ' bytes' }}</span>
          </div>
        </v-card-text>

        <v-divider />

        <v-card-text>
          <span class="display-1 text--primary">
            Output
          </span>
          <span class="pl-3 font-weight-bold">
            Huffman compressed
          </span>

          <v-textarea
            v-model="outputHoffman"
            disabled
            auto-grow
            rows="1"
            label="Output string (hexdecimal)"
          />

          <div class="text--primary">
            <span class="font-weight-bold">Size: </span><span>{{ getSize(outputHoffman) + ' bytes' }}</span>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col :cols="$vuetify.breakpoint.mdAndUp ? 3 : 12">
      <v-card
        style="height: 400px;"
        :class="[$vuetify.breakpoint.mdAndUp ? 'pa-5 ma-5' : 'pa-2 ma-1']"
      >
        <bar-chart
          :chart-data="chartData"
          :styles="styles"
          :options="options"
        />
      </v-card>
    </v-col>
    <v-col :cols="$vuetify.breakpoint.mdAndUp ? 1 : 0" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  components: {
    BarChart: () => import('@/components/BarChart')
  },
  data: () => ({
    inputRaw: '',
    outputLZW: '',
    outputHoffman: '',
    styles: {
      height: '100%',
      position: 'relative'
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      title: {
        display: true,
        text: 'File size in bytes'
      },
      legend: {
        display: false
      }
    }
  }),
  computed: {
    ...mapGetters(['getHuffmanCompressed']),
    chartData () {
      return {
        labels: ['Uncompressed', 'LZW', 'Huffman'],
        datasets: [
          {
            backgroundColor: ['#76FF03', '#FF5722', '#673AB7'],
            data: [this.getSize(this.inputRaw), this.getSize(this.outputLZW), this.getSize(this.outputHoffman)]
          }
        ]
      }
    }
  },
  methods: {
    compressLZW (s) {
      if (s) {
        var dict = {}
        var data = (s + '').split('')
        var out = []
        var currChar
        var phrase = data[0]
        var code = 256
        for (let i = 1; i < data.length; i++) {
          currChar = data[i]
          if (dict[phrase + currChar] != null) {
            phrase += currChar
          } else {
            out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0))
            dict[phrase + currChar] = code
            code++
            phrase = currChar
          }
        }
        out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0))
        for (let i = 0; i < out.length; i++) {
          out[i] = String.fromCharCode(out[i])
        }
        this.outputLZW = out.join('')
      } else {
        this.outputLZW = ''
      }
    },
    compressHoffman (s) {
      if (s) {
        const output = this.getHuffmanCompressed(s)
        this.outputHoffman = parseInt(output, 2).toString(16)
      } else {
        this.outputHoffman = ''
      }
    },
    getSize (string) {
      if (!string) return 0
      return (new TextEncoder().encode(string)).length
    }
  }
}
</script>
<style lang="scss" scoped>
 .col {
   padding: 0;
 }
</style>
