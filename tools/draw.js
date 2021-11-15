const applyChaikin = (points, factor) => {
  const result = [];

  result.push(points[0]);

  for (let i = 1; i < points.length - 1; i++) {
    result.push({
      x: points[i - 1].x * 0.75 + points[i].x * 0.25,
      y: points[i - 1].y * 0.75 + points[i].y * 0.25,
    });

    result.push({
      x: points[i - 1].x * 0.25 + points[i].x * 0.75,
      y: points[i - 1].y * 0.25 + points[i].y * 0.75,
    });
  }

  result.push(points[points.length - 1]);

  if (factor > 0) {
    return applyChaikin(result, factor - 1);
  }

  return result;
};

const Drawer = {
  /**
   * @type {HTMLCanvasElement}
   */
  _canvas: null,

  /**
   * @type {RenderingContext}
   */
  _context: null,

  /**
   * @type {HTMLCanvasElement}
   */
  _hiddenCanvas: null,

  /**
   * @type {RenderingContext}
   */
  _hiddenContext: null,

  addLine: (x, y, x2, y2) => {
    Drawer._hiddenContext.beginPath();
    Drawer._hiddenContext.moveTo(x, y);
    Drawer._hiddenContext.lineTo(x2, y2);
    Drawer._hiddenContext.stroke();
  },

  /**
   * Draw a smooth line with the Chakin Algorithm
   * (see http://graphics.cs.ucdavis.edu/education/CAGDNotes/Chaikins-Algorithm/Chaikins-Algorithm.html)
   * @param {Array<Point>} points
   * @param {number} smoothFactor - number of iterations of the smooth algorithm
   */
  addSmoothLine: (points, smoothFactor) => {
    Drawer._hiddenContext.beginPath();

    const smoothLine = applyChaikin(points, smoothFactor);

    Drawer._hiddenContext.moveTo(smoothLine[0].x, smoothLine[0].y);

    for (let i = 1; i < smoothLine.length; i++) {
      Drawer._hiddenContext.lineTo(smoothLine[i].x, smoothLine[i].y);
    }

    Drawer._hiddenContext.stroke();
  },

  drawCurve: (startX, startY, ...points) => {
    Drawer._hiddenContext.beginPath();
    Drawer._hiddenContext.moveTo(startX, startY);

    points.forEach((point) => {
      Drawer._hiddenContext.bezierCurveTo(
        point.c1x,
        point.c1y,
        point.c2x,
        point.c2y,
        point.ex,
        point.ey
      );
    });

    Drawer._hiddenContext.stroke();
  },

  drawQuadraticCurve: (startX, startY, ...points) => {
    Drawer._hiddenContext.beginPath();
    Drawer._hiddenContext.moveTo(startX, startY);

    points.forEach((point) => {
      Drawer._hiddenContext.quadraticCurveTo(
        point.cx,
        point.cy,
        point.ex,
        point.ey
      );
    });

    Drawer._hiddenContext.stroke();
  },

  background: (color) => {
    Drawer._hiddenContext.fillStyle = color;
    Drawer._hiddenContext.fillRect(
      0,
      0,
      Drawer._canvas.width,
      Drawer._canvas.height
    );
  },

  rect: () => {
    Drawer._hiddenContext.fillStyle = "green";
    Drawer._hiddenContext.fillRect(10, 10, 100, 100);
  },

  render: () => {
    Drawer._context.drawImage(Drawer._hiddenCanvas, 0, 0);
  },

  /**
   * Set the main canvas
   * @param {HTMLCanvasElement} canvas
   */
  setCanvas: (canvas) => {
    Drawer._canvas = canvas;
    Drawer._context = canvas.getContext("2d");

    Drawer._hiddenCanvas = document.createElement("canvas");
    Drawer._hiddenCanvas.width = canvas.width;
    Drawer._hiddenCanvas.height = canvas.height;

    Drawer._hiddenContext = Drawer._hiddenCanvas.getContext("2d");
  },

  setStroke: (color) => {
    Drawer._hiddenContext.strokeStyle = color;
  },
};
