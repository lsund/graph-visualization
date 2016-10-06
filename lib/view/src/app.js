
var body = (
    <div>
        <h1>MinGrad</h1>
        <canvas width="960" height="500"></canvas>
    </div>
)

ReactDOM.render(body, document.getElementById('main'));

var canvas = d3.select("canvas");
var context = canvas.node().getContext("2d");
var width = canvas.property("width");
var height = canvas.property("height");
var radius = 32;
var ncircles = 10;

var circles = d3.range(ncircles).map(function(i) {
  return {
    index: i,
    x: Math.round(Math.random() * (width - radius * 2) + radius),
    y: Math.round(Math.random() * (height - radius * 2) + radius)
  };
});

var color = d3.scaleOrdinal()
    .range(d3.schemeCategory20);

function render() {
  context.clearRect(0, 0, width, height);
  for (var i = 0, n = circles.length, circle; i < n; ++i) {
    circle = circles[i];
    context.beginPath();
    context.moveTo(circle.x + radius, circle.y);
    context.arc(circle.x, circle.y, radius, 0, 2 * Math.PI);
    context.fillStyle = color(circle.index);
    context.fill();
    if (circle.active) {
      context.lineWidth = 2;
      context.stroke();
    }
  }
}

render();


