<template>
  <div
    style="width: 100%;"
    class="d-flex align-center justify-center"
    :class="[$vuetify.breakpoint.mdAndUp ? 'flex-row' : 'flex-column']"
  >
    <v-snackbar
      v-model="error"
      color="error"
    >
      File too large for our Huffman compression algorithm (other results still shown)
      <v-btn
        color="white"
        text
        @click="error = false"
      >
        Close
      </v-btn>
    </v-snackbar>
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

          <v-img
            v-if="imagePreview"
            contain
            max-height="200"
            :src="imagePreview"
            class="py-5"
          />

          <v-file-input
            ref="inputFile"
            v-model="inputFile"
            counter
            outlined
            background-color="#f5f5f5"
            color="primary"
            class="pt-3"
            label="Select a file to test compression"
            @change="fileData"
          >
            <template v-slot:selection="{ index, text }">
              <v-chip
                color="primary"
                dark
                label
                small
              >
                {{ text }}
              </v-chip>
            </template>
          </v-file-input>

          <v-textarea
            v-model="inputRaw"
            disabled
            auto-grow
            rows="1"
            label="Input string (file content)"
          />

          <div class="text--primary pt-2">
            <span class="font-weight-bold">Size: </span>{{ sizeRaw + ' bytes' }}
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
            <span class="font-weight-bold">Size: </span><span>{{ sizeLZW + ' bytes' }}</span>
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
            <span class="font-weight-bold">Size: </span><span>{{ sizeHoffman + ' bytes' }}</span>
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
    inputFile: null,
    imagePreview: '',

    inputRaw: '',
    outputLZW: '',
    outputHoffman: '',

    sizeRaw: 0,
    sizeLZW: 0,
    sizeHoffman: 0,

    error: false,

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
            data: [this.sizeRaw, this.sizeLZW, this.sizeHoffman]
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
        this.sizeLZW = this.getSize(out.join(''))
        this.outputLZW = this.shortLength(out.join(''))
      } else {
        this.outputLZW = ''
      }
    },
    compressHoffman (s) {
      if (s) {
        const output = this.getHuffmanCompressed(s)
        let hexString = ''
        for (let i = 0; i < (output.length) / 4; i++) {
          const piece = output.substr(4 * i, 4)
          hexString += parseInt(piece, 2).toString(16)
        }
        this.sizeHoffman = this.getSize(hexString)
        this.outputHoffman = this.shortLength(hexString)
      } else {
        this.outputHoffman = ''
      }
    },
    getSize (string) {
      if (!string) return 0
      return (new TextEncoder().encode(string)).length
    },
    shortLength (item) {
      if (item.length > 300) {
        return item.substring(0, 300) + '      ...(long content)'
      } else {
        return item
      }
    },
    fileData () {
      const file = this.inputFile
      if (file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = (evt) => {
          if (file.type.indexOf('image/') >= 0) {
            this.imagePreview = evt.target.result
          }
        }

        const readerText = new FileReader()
        readerText.readAsBinaryString(file)
        readerText.onloadend = (evt) => {
          this.inputRaw = evt.target.result
          this.sizeRaw = this.getSize(evt.target.result)
          this.compressLZW(this.inputRaw)
          this.compressHoffman(this.inputRaw)
          this.inputRaw = this.shortLength(this.inputRaw)
        }
      } else {
        this.imagePreview = ''
        this.inputRaw = ''
        this.outputLZW = ''
        this.outputHoffman = ''
        this.sizeRaw = 0
        this.sizeLZW = 0
        this.sizeHoffman = 0
      }
    }
  }
}
</script>
<style lang="scss" scoped>
 .col {
   padding: 0;
 }
  .v-textarea {
    max-height: 400px !important;
    overflow: hidden;
  }
</style>
