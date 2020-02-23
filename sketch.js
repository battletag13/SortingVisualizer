/** @type {Graph} */
let graph;
let graph2;
let graph3;
let graph4;

function setup() {
  createCanvas(1750, 1000);
  defaultColor = color(36, 78, 214);

  graph = new Graph(200, 1750, 200, 5);
  graph2 = new Graph(200, 1750, 200, 5, 210);
  graph3 = new Graph(200, 1750, 200, 5, 420);
  graph4 = new Graph(20, 1750, 200, 5, 630);

  let data = {
    graph: graph,
  };
  let data2 = {
    graph: graph2,
  };
  let data3 = {
    graph: graph3,
  };
  let data4 = {
    graph: graph4,
  };

  bubbleSort(data);
  quickSort(data2);
  mergeSort(data3);
  bogoSort(data4);
}

function draw() {
  background(255);

  graph.draw();
  graph2.draw();
  graph3.draw();
  graph4.draw();
}
