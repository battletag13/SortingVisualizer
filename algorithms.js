let pivotColor;
let selectedColor;
let sortedColor;

let stepDelay = 50;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function swap(list, left, right) {
  let temp = list[left];
  list[left] = list[right];
  list[right] = temp;
}

async function mergeSort(/** @type {{graph: Graph}} */ data) {
  selectedColor = color(173, 45, 75);
  sortedColor = color(235, 164, 52);
  let temp = new Array(data.graph.bars.length);

  async function mergeSort_(arr, temp, leftStart, rightEnd) {
    if (leftStart >= rightEnd) return;
    let middle = Math.floor((leftStart + rightEnd) / 2);
    await mergeSort_(arr, temp, leftStart, middle);
    await mergeSort_(arr, temp, middle + 1, rightEnd);

    let leftEnd = middle;
    let rightStart = middle + 1;
    let size = rightEnd - leftStart + 1;

    let left = leftStart;
    let right = rightStart;
    let index = leftStart;
    while (left <= leftEnd && right <= rightEnd) {
      data.graph.setColor(left, selectedColor);
      data.graph.setColor(right, selectedColor);
      await delay(stepDelay);
      if (arr[left].height <= arr[right].height) {
        temp[index++] = arr[left++].height;
        data.graph.setColor(left - 1, defaultColor);
        data.graph.setColor(right, defaultColor);
      }
      else {
        temp[index++] = arr[right++].height;
        data.graph.setColor(right - 1, defaultColor);
        data.graph.setColor(left, defaultColor);
      }
    }

    while (left <= leftEnd) {
      temp[index++] = arr[left++].height;
    }
    while (right <= rightEnd) {
      temp[index++] = arr[right++].height;
    }

    for (let i = 0; i < size; ++i) {
      arr[i + leftStart].height = temp[i + leftStart];
    }
  }
  await mergeSort_(data.graph.bars, temp, 0, data.graph.bars.length - 1);
  for (let i = 0; i < data.graph.bars.length; ++i)
    data.graph.setColor(i, sortedColor);
}

async function quickSort(/** @type {{graph: Graph}} */ data) {
  selectedColor = color(173, 45, 75);
  sortedColor = color(235, 164, 52);
  pivotColor = color(161, 66, 245);

  async function quickSort_(arr, left, right) {
    if (left == right) {
      data.graph.setColor(right, sortedColor);
    }
    if (left < right) {
      let pivot = await (async (arr, left, right) => {
        let pivot_ = left;
        let i = left;
        while (i < right) {
          data.graph.setColor(pivot_, selectedColor);
          data.graph.setColor(i, selectedColor);
          data.graph.setColor(right, pivotColor);
          await delay(stepDelay);
          if (arr[i].height <= arr[right].height) {
            data.graph.swap(i, pivot_);
            ++pivot_;
            data.graph.setColor(pivot_ - 1, defaultColor);
          }
          ++i;
          data.graph.setColor(pivot_, defaultColor);
          data.graph.setColor(i - 1, defaultColor);
          data.graph.setColor(right, defaultColor);
        }
        data.graph.swap(pivot_, right);
        data.graph.setColor(pivot_, sortedColor);
        return pivot_;
      })(arr, left, right);
      await quickSort_(arr, left, pivot - 1);
      await quickSort_(arr, pivot + 1, right);
    }

    return arr;
  }
  quickSort_(data.graph.bars, 0, data.graph.bars.length - 1);
}

async function bubbleSort(/** @type {{graph: Graph}} */ data) {
  selectedColor = color(173, 45, 75);
  sortedColor = color(235, 164, 52);

  let sorted = 1;
  let swapped = false;

  do {
    swapped = false;

    for (let index = 0; index < data.graph.bars.length - sorted; ++index) {
      data.graph.setColor(index, selectedColor);
      data.graph.setColor(index + 1, selectedColor);
      await delay(stepDelay);
      if (data.graph.bars[index].height > data.graph.bars[index + 1].height) {
        data.graph.swap(index, index + 1);
        swapped = true;
      }
      data.graph.setColor(index, defaultColor);
      data.graph.setColor(index + 1, defaultColor);
    }
    data.graph.setColor(data.graph.bars.length - sorted, sortedColor);
    ++sorted;
  } while (swapped);

  for (; sorted < data.graph.bars.length + 1; ++sorted) {
    data.graph.setColor(data.graph.bars.length - sorted, sortedColor);
  }
}

async function bogoSort(/** @type {{graph: Graph}} */ data) {
  sortedColor = color(235, 164, 52);
  var shuffle = function(array) {
    var currentIndex = array.length;
    var temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };
  let done = false;
  while (!done) {
    done = true;
    await delay(stepDelay);
    let heights = [];
    for (let i = 0; i < data.graph.bars.length; ++i)
      heights.push(data.graph.bars[i].height);
    shuffle(heights);
    for (let i = 0; i < data.graph.bars.length; ++i)
      data.graph.bars[i].height = heights[i];
    for (let i = 1; i < data.graph.bars.length; ++i) {
      if (data.graph.bars[i].height < data.graph.bars[i - 1].height)
        done = false;
    }
  }
  for (let i = 0; i < data.graph.bars.length; ++i)
    data.graph.setColor(i, sortedColor);
}
