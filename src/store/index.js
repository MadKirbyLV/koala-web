import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function BinaryHeap (scoreFunction) {
  this.content = []
  this.scoreFunction = scoreFunction
}

BinaryHeap.prototype = {
  push: function (element) {
    // Add the new element to the end of the array.
    this.content.push(element)
    // Allow it to bubble up.
    this.bubbleUp(this.content.length - 1)
  },

  pop: function () {
    // Store the first element so we can return it later.
    var result = this.content[0]
    // Get the element at the end of the array.
    var end = this.content.pop()
    // If there are any elements left, put the end element at the
    // start, and let it sink down.
    if (this.content.length > 0) {
      this.content[0] = end
      this.sinkDown(0)
    }
    return result
  },

  remove: function (node) {
    var length = this.content.length
    // To remove a value, we must search through the array to find
    // it.
    for (var i = 0; i < length; i++) {
      if (this.content[i] !== node) continue
      // When it is found, the process seen in 'pop' is repeated
      // to fill up the hole.
      var end = this.content.pop()
      // If the element we popped was the one we needed to remove,
      // we're done.
      if (i === length - 1) break
      // Otherwise, we replace the removed element with the popped
      // one, and allow it to float up or sink down as appropriate.
      this.content[i] = end
      this.bubbleUp(i)
      this.sinkDown(i)
      break
    }
  },

  size: function () {
    return this.content.length
  },

  bubbleUp: function (n) {
    // Fetch the element that has to be moved.
    var element = this.content[n]; var score = this.scoreFunction(element)
    // When at 0, an element can not go up any further.
    while (n > 0) {
      // Compute the parent element's index, and fetch it.
      var parentN = Math.floor((n + 1) / 2) - 1
      var parent = this.content[parentN]
      // If the parent has a lesser score, things are in order and we
      // are done.
      if (score >= this.scoreFunction(parent)) { break }

      // Otherwise, swap the parent with the current element and
      // continue.
      this.content[parentN] = element
      this.content[n] = parent
      n = parentN
    }
  },

  sinkDown: function (n) {
    // Look up the target element and its score.
    var length = this.content.length
    var element = this.content[n]
    var elemScore = this.scoreFunction(element)

    while (true) {
      // Compute the indices of the child elements.
      var child2N = (n + 1) * 2; var child1N = child2N - 1
      // This is used to store the new position of the element,
      // if any.
      var swap = null
      // If the first child exists (is inside the array)...
      if (child1N < length) {
        // Look it up and compute its score.
        var child1 = this.content[child1N]
        var child1Score = this.scoreFunction(child1)
        // If the score is less than our element's, we need to swap.
        if (child1Score < elemScore) { swap = child1N }
      }
      // Do the same checks for the other child.
      if (child2N < length) {
        var child2 = this.content[child2N]
        var child2Score = this.scoreFunction(child2)
        if (child2Score < (swap == null ? elemScore : child1Score)) { swap = child2N }
      }

      // No need to swap further, we are done.
      if (swap == null) break

      // Otherwise, swap and continue.
      this.content[n] = this.content[swap]
      this.content[swap] = element
      n = swap
    }
  }
}

function HuffmanEncoding (str) {
  this.str = str

  var countChars = {}
  for (var i = 0; i < str.length; i++) {
    if (str[i] in countChars) { countChars[str[i]]++ } else { countChars[str[i]] = 1 }
  }

  var pq = new BinaryHeap(function (x) { return x[0] })
  for (var ch in countChars) { pq.push([countChars[ch], ch]) }

  while (pq.size() > 1) {
    var pair1 = pq.pop()
    var pair2 = pq.pop()
    pq.push([pair1[0] + pair2[0], [pair1[1], pair2[1]]])
  }

  var tree = pq.pop()
  if (!Array.isArray(tree[1])) {
    tree[1] = [tree[1]]
  }

  this.encoding = {}
  this._generate_encoding(tree[1], '')

  this.encoded_string = ''
  for (let i = 0; i < this.str.length; i++) {
    this.encoded_string += this.encoding[str[i]]
  }
}

HuffmanEncoding.prototype._generate_encoding = function (ary, prefix) {
  if (ary instanceof Array) {
    this._generate_encoding(ary[0], prefix + '1')
    this._generate_encoding(ary[1], prefix + '0')
  } else {
    this.encoding[ary] = prefix
  }
}

HuffmanEncoding.prototype.inspect_encoding = function () {
  for (var ch in this.encoding) {
    console.log("'" + ch + "': " + this.encoding[ch])
  }
}

export default new Vuex.Store({
  state: {
  },
  getters: {
    getHuffmanCompressed: () => (string) => {
      if (string) {
        const huff = new HuffmanEncoding(string)
        return huff.encoded_string
      } else {
        return ''
      }
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
