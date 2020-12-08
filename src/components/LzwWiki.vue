
<!-- eslint-disable -->
<template>
<div
  class="body"
  v-vueresize:throttle.50="setWidth"
>

<h1>Lempel–Ziv–Welch algorithm&#128040;&#127794;&#127795;&#127796;&#127797;</h1>
<p>The LZW algorithm is a very common compression technique. It is the algorithm of the widely used Unix file compression utility compress, and is used in the GIF image format. It is lossless, meaning no data is lost when compressing. The algorithm is simple to implement and has the potential for very high throughput in hardware implementations.</p>
<p>The Idea relies on reoccurring patterns to save data space. LZW is the foremost technique for general purpose data compression due to its simplicity and versatility. It is the basis of many PC utilities that claim to “double the capacity of your hard drive”.</p>
<hr>

<div>
<h2>&#128040; How does it work?</h2>
<p>LZW compression works by reading a sequence of symbols, grouping the symbols into strings, and converting the strings into codes. Because the codes take up less space than the strings they replace, we get compression.</p>
 <ul>
  <li>LZW compression uses a code table, with 4096 as a common choice for the number of table entries. Codes 0-255 in the code table are always assigned to represent single bytes from the input file.</li>
  <li>When encoding begins the code table contains only the first 256 entries, with the remainder of the table being blanks. Compression is achieved by using codes 256 through 4095 to represent sequences of bytes.</li>
  <li>As the encoding continues, LZW identifies repeated sequences in the data, and adds them to the code table.</li>
  <li>Decoding is achieved by taking each code from the compressed file and translating it through the code table to find what character or characters it represents.</li>
</ul>

<iframe :width="videoSize.width" :height="videoSize.height" src="https://www.youtube.com/embed/j2HSd3HCpDs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<h3>&#127795; LZW Encoding</h3>
<div class="codeBlock">
<pre>
<code>*     PSEUDOCODE
 1     Initialize table with single character strings
 2     P = first input character
 3     WHILE not end of input stream
 4          C = next input character
 5          IF P + C is in the string table
 6            P = P + C
 7          ELSE
 8            output the code for P
 9          add P + C to the string table
 10           P = C
 11         END WHILE
 12    output code for P</code>
</pre>
</div>
<h3>&#127796; LZW Decoding</h3>
<div class="codeBlock">
<pre>
<code>*    PSEUDOCODE
 1    Initialize table with single character strings
 2    OLD = first input code
 3    output translation of OLD
 4    WHILE not end of input stream
 5        NEW = next input code
 6        IF NEW is not in the string table
 7               S = translation of OLD
 8               S = S + C
 9       ELSE
 10              S = translation of NEW
 11       output S
 12       C = first character of S
 13       OLD + C to the string table
 14       OLD = NEW
 15   END WHILE</code>
</pre>
</div>
</div>
<hr class="mt-5">

<div>
<h2>&#127797; Advantages of LZW over Huffman:</h2>
 <ul>
  <li>LZW requires no prior information about the input data stream.</li>
  <li>LZW can compress the input stream in one single pass.</li>
  <li>Another advantage of LZW its simplicity, allowing fast execution.</li>
</ul>
</div>

</div>
</template>

<script>
import resize from 'vue-resize-directive'
export default {
  directives: {
    vueresize: resize
  },
  data: () => ({
    width: 0
  }),
  computed: {
    videoSize () {
      const width = Math.min(this.width, 700)
      return {
        width: width,
        height: width / 1.777
      }
    }
  },
  methods: {
    setWidth (e) {
      this.width = e.clientWidth
    }
  }
}
</script>

<style scoped>
.body {
  background-color: #eee;
  font-family: Helvetica;
  color: #1F2421;
}
h1 {
  background-color: #216869;
  color: #DCE1DE;
  text-shadow: 1px 1px 0 #1F2421;
  padding-left: 8px;
  margin: 21.440px 0;
}
h2 {
  background-color: #49A078;
  color: #DCE1DE;
  text-shadow: 1px 1px 0 #216869;
  padding-left: 8px;
  margin: 19.920px 0;
}
h3 {
  background-color: #9CC5A1;
  color: #DCE1DE;
  text-shadow: 1px 1px 0 #49A078;
  padding-left: 8px;
  margin: 18.720px 0;
}
p {
  margin: 16px 0;
}
ol, ul {
  margin: 16px 0;
  padding-left: 40px;
}
hr {
  margin: 8px 0;
}
pre {
  overflow: auto;
}
code {
  min-width: 400px;
}
iframe {
  margin-top: 16px;
}
.codeBlock {
  border: 3px outset #9CC5A1;
  background-color: #eee;
  font-family: courier;
  width: 100%;
}
.v-application code {
    background-color: unset;
    color: unset;
    box-shadow: unset;
}
</style>
