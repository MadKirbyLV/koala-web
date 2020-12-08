
<!-- eslint-disable -->
<template>
<div
  class="body"
  v-vueresize:throttle.50="setWidth"
>

  <h1>Huffman algorithm&#128040;&#127794;&#127795;&#127796;&#127797;</h1>
  <p><b>Huffman code</b> is a particular type of optimal prefix code that is commonly used for lossless data compression. It compresses data very effectively saving from 20% to 90% memory, depending on the characteristics of the data being compressed. We consider the data to be a sequence of characters. Huffman's greedy algorithm uses a table giving how often each character occurs (i.e., its frequency) to build up an optimal way of representing each character as a binary string. Huffman code was proposed by David A. Huffman in 1951.</p>
  <hr>

  <div>
    <h2>&#128040; How does it work?</h2>
    <iframe :width="videoSize.width" :height="videoSize.height" src="https://www.youtube.com/embed/0kNXhFIEd_w" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

    <h3>&#127795; Huffman Compression</h3>
    <p>The technique works by creating a binary tree of nodes. These can stored in a regular array, the size of which depends on the number of symbols, n. A node can either be a leaf node or an internal node. Initially all nodes are leaf nodes, which contain the symbol itself, its frequency and optionally, a link to its child nodes. As a convention, bit '0' represents left child and bit '1' represents right child. Priority queue is used to store the nodes, which provides the node with lowest frequency when popped.</p>
    <p><b>The process is described below:</b></p>
    <ol>
      <li>Create a leaf node for each symbol and add it to the priority queue.</li>
      <li>While there is more than one node in the queue:<ol>
            <li>Remove the two nodes of highest priority from the queue.</li>
            <li>Create a new internal node with these two nodes as children and with frequency equal to the sum of the two nodes' frequency.</li>
            <li>Add the new node to the queue.</li></ol></li>
      <li>The remaining node is the root node and the Huffman tree is complete.</li>
    </ol>
    <div class="codeBlock">
      <pre>
        <code>  // PSEUDOCODE
          Procedure Huffman(C):     // C is the set of n characters and related information
          n = C.size
          Q = priority_queue()
          for i = 1 to n
              n = node(C[i])
              Q.push(n)
          end for
          while Q.size() is not equal to 1
              Z = new node()
              Z.left = x = Q.pop
              Z.right = y = Q.pop
              Z.frequency = x.frequency + y.frequency
              Q.push(Z)
          end while
          Return Q</code>
      </pre>
    </div>
    <p>Although linear-time given sorted input, in general cases of arbitrary input, using this algorithm requires pre-sorting. Thus, since sorting takes <b>O(nlogn)</b> time in general cases, both methods have same complexity.</p>
    <p>Since n here is the number of symbols in the alphabet, which is typically very small number (compared to the length of the message to be encoded), time complexity is not very important in the choice of this algorithm.</p>
    <h3>&#127796; Huffman Decompression</h3>
    <p>The process of decompression is simply a matter of translating the stream of prefix codes to individual byte value, usually by traversing the Huffman tree node by node as each bit is read from the input stream. Reaching a leaf node necessarily terminates the search for that particular byte value. The leaf value represents the desired character. Usually the Huffman Tree is constructed using statistically adjusted data on each compression cycle, thus the reconstruction is fairly simple. Otherwise, the information to reconstruct the tree must be sent separately.</p>
    <div class="codeBlock">
      <pre>
        <code>  // PSEUDOCODE
          Procedure HuffmanDecompression(root, S):   // root represents the root of Huffman Tree
          n := S.length                              // S refers to bit-stream to be decompressed
          for i := 1 to n
              current = root
              while current.left != NULL and current.right != NULL
                  if S[i] is equal to '0'
                      current := current.left
                  else
                      current := current.right
                  endif
                  i := i+1
              endwhile
              print current.symbol
          endfor</code>
      </pre>
    </div>
  </div>

  <hr class="mt-5">

  <div>
    <h2>&#127797; Greedy Explanation</h2>
    <p>Huffman coding looks at the occurrence of each character and stores it as a binary string in an optimal way. The idea is to assign variable-length codes to input input characters, length of the assigned codes are based on the frequencies of corresponding characters. We create a binary tree and operate on it in bottom-up manner so that the least two frequent characters are as far as possible from the root. In this way, the most frequent character gets the smallest code and the least frequent character gets the largest code.</p>
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
  min-width: 800px;
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
