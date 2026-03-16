import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

let svg;
let circle;

const width = 800;
const height = 600;
const duration = 800;
const clickFrameCount = 5;

// make sure the number of circles does not exceed 10
const maxCircleCount = 10;

async function prepareVis() {

  svg = d3
  .select("#canvas")
  .append("svg")
  .attr("width", width)
  .attr("height", height);
}

async function drawVis() {

  circle = svg
    .append("circle")
    .attr("r", 15)
    .attr("fill", "black")
    .attr("cx", 55)
    .attr("cy", 25)
    .on("click", playAnimation);

  svg.on("click", addCircle);
}

function addCircle(event) {
  const circleCount = svg.selectAll("circle").size();

  if (circleCount >= maxCircleCount) {
    return;
  }

  const [x,y] = d3.pointer(event);
  svg
    .append("circle")
    .attr("cx",x)
    .attr("cy",y)
    .attr("r", 15)
    .attr("fill", "#" + Math.floor(Math.random()*16777215).toString(16))
}

async function playAnimation() {

  let index = 0;

  const interval = setInterval(() => {

    let randomX = Math.random() * width;
    let randomY = Math.random() * height;
    let randomR = Math.random() * 25 + 5;

    circle
      .transition()
      .duration(duration)
      .attr("cx", randomX)
      .attr("cy", randomY)
      .attr("r", randomR);

    index++;

    if (index >= clickFrameCount) {
      clearInterval(interval);
    }

  }, duration);
}

async function runApp() {

  await prepareVis();
  await drawVis();

}

runApp();