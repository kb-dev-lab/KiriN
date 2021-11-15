function BezierPoint(c1x, c1y, c2x, c2y, ex, ey) {
  return {
    c1x,
    c1y,
    c2x,
    c2y,
    ex,
    ey,
  };
}

function QuadraticPoint(cx, cy, ex, ey) {
  return {
    cx,
    cy,
    ex,
    ey,
  };
}

function Point(x, y) {
  return { x, y };
}
