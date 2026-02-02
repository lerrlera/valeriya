/* Bar Chart */
var dataset = [200, 260, 220, 130, 50, 30, 20];
var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
var percents = [70, 100, 80, 50, 20, 11, 8];

var svgWidth = 500, svgHeight = 300, barPadding = 5;
var barWidth = svgWidth / dataset.length;

var barSvg = document.getElementById("bar-js");
barSvg.setAttribute("width", svgWidth);
barSvg.setAttribute("height", svgHeight);

for (var i = 0; i < dataset.length; i++) {
  var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("y", svgHeight - dataset[i]);
  rect.setAttribute("height", dataset[i]);
  rect.setAttribute("width", barWidth - barPadding);
  rect.setAttribute("fill", "#F4C8FB");
  rect.setAttribute("transform", "translate(" + (barWidth * i) + ",0)");
  barSvg.appendChild(rect);

  // % annotations
  var pctText = document.createElementNS("http://www.w3.org/2000/svg", "text");
  pctText.textContent = percents[i] + "%";
  pctText.setAttribute("x", barWidth * i + (barWidth - barPadding) / 2);
  pctText.setAttribute("y", svgHeight - dataset[i] - 8);
  pctText.setAttribute("text-anchor", "middle");
  pctText.setAttribute("font-size", "14px");
  pctText.setAttribute("fill", "#ffffff");
  barSvg.appendChild(pctText);
  // week days
  var dayText = document.createElementNS("http://www.w3.org/2000/svg", "text");
  dayText.textContent = days[i];
  dayText.setAttribute("x", barWidth * i + (barWidth - barPadding) / 2);
  dayText.setAttribute("y", svgHeight - 8);
  dayText.setAttribute("text-anchor", "middle");
  dayText.setAttribute("font-size", "14px");
  dayText.setAttribute("fill", "#564E79");
  barSvg.appendChild(dayText);
}

/* Creative SVG */
const svgNS = "http://www.w3.org/2000/svg";

const shapeSvg = document.getElementById("shape");
shapeSvg.setAttribute("width", 500);
shapeSvg.setAttribute("height", 500);

/* face */
const face = document.createElementNS(svgNS, "circle");
face.setAttribute("cx", 150);
face.setAttribute("cy", 170);
face.setAttribute("r", 100);
face.setAttribute("fill", "#FFECBD");
shapeSvg.appendChild(face);

/* ears function */
function ear(cx, cy) {
  const e = document.createElementNS(svgNS, "circle");
  e.setAttribute("cx", cx);
  e.setAttribute("cy", cy);
  e.setAttribute("r", 30);
  e.setAttribute("fill", "#FFECBD");
  shapeSvg.appendChild(e);
}

ear(80, 90);
ear(220, 90);

/* eyes function */
function eye(cx, cy) {
  const eye = document.createElementNS(svgNS, "circle");
  eye.setAttribute("cx", cx);
  eye.setAttribute("cy", cy);
  eye.setAttribute("r", 10);
  eye.setAttribute("fill", "#3E3E3E");
  shapeSvg.appendChild(eye);
}

eye(110, 155);
eye(190, 155);

/* blush function */
function blush(cx, cy) {
  const b = document.createElementNS(svgNS, "circle");
  b.setAttribute("cx", cx);
  b.setAttribute("cy", cy);
  b.setAttribute("r", 14);
  b.setAttribute("fill", "#F6A6A6");
  b.setAttribute("opacity", "0.6");
  shapeSvg.appendChild(b);
}

blush(90, 175);
blush(210, 175);

/* mouth curve */
const mouth = document.createElementNS(svgNS, "path");
mouth.setAttribute(
  "d",
  "M 130 185 Q 150 200 170 185"
);
mouth.setAttribute("fill", "none");
mouth.setAttribute("stroke", "#3E3E3E");
mouth.setAttribute("stroke-width", "4");
mouth.setAttribute("stroke-linecap", "round");
shapeSvg.appendChild(mouth);




