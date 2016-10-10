
window.GLOBALS = window.GLOBALS || {};

var body = (
    <div>
    <h1>MinGrad</h1>
    <canvas width="960" height="500"></canvas>
    </div>
)

ReactDOM.render(body, document.getElementById('main'));

var points = window.GLOBALS.response_data.points;
var bonds = window.GLOBALS.response_data.bonds;

points.map(function(point) {
    console.log(point);
});

var canvas = d3.select("canvas");
var context = canvas.node().getContext("2d");
var width = canvas.property("width");
var height = canvas.property("height");
var radius = 20;

var circles = d3.range(points.length).map(function(i) {
    return {
        index: i,
        x: Math.round(points[i].x * (width - radius * 2) + radius),
        y: Math.round(points[i].y * (height - radius * 2) + radius)
    };
});

function render() {
    context.clearRect(0, 0, width, height);
    context.strokeStyle = d3.color(d3.rgb(0, 0, 0));
    context.fillStyle = d3.color(d3.rgb(100, 100, 100));
    context.lineWidth = 2;
    for (var i = 0; i < bonds.length; i++) {
        var fstId = bonds[i].fst;
        var sndId = bonds[i].snd;
        var fst = circles[fstId];
        var snd = circles[sndId];
        context.moveTo(fst.x, fst.y);
        context.lineTo(snd.x, snd.y); 
        context.stroke();
    }
    for (var i = 0, n = circles.length, circle; i < n; ++i) {
        circle = circles[i];
        context.beginPath();
        context.moveTo(circle.x + radius, circle.y);
        context.arc(circle.x, circle.y, radius, 0, 2 * Math.PI);
        context.fill();
        context.stroke();
        context.font = "16px serif";
        context.strokeText(i, circle.x - (radius / 2), circle.y);
    }
}

render();


