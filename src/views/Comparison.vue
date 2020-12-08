<template>
  <div
    style="width: 100%;"
    class="d-flex flex-column align-center justify-center"
  >
    <v-card
      style="width: 50%; height: 400px;"
      class="pa-5 ma-5"
    >
      <bar-chart
        :chart-data="chartData"
        :styles="styles"
        :options="options"
      />
    </v-card>

    <v-card
      style="width: 50%; height: 400px;"
      class="pa-5 ma-5"
    >
      <bar-chart
        :chart-data="chartData"
        :styles="styles"
        :options="options"
      />
    </v-card>
  </div>
</template>
<script>
export default {
  components: {
    BarChart: () => import('@/components/BarChart')
  },
  data: () => ({
    chartData: {
      labels: ['Huffman', 'LZW', 'ZIP', 'PNG', 'JPEG'],
      datasets: [
        {
          label: 'Compression ratio',
          backgroundColor: '#f87979',
          data: [40, 20, 12, 39, 10]
        },
        {
          label: 'Compression ratio after',
          backgroundColor: 'green',
          data: [30, 10, 2, 29, 5]
        }
      ]
    },
    styles: {
      height: '100%',
      position: 'relative'
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  })
}
</script>
