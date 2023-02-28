var color;
(function (color) {
    color[color["red"] = 2] = "red";
    color[color["blue"] = 1] = "blue";
    color[color["green"] = 6] = "green";
})(color || (color = {}));
;
var backgroundColor = color.blue;
