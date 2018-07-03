$(document).ready(function() {
  class BinSolution {
    // constructor
    constructor(startX, startY, binData, binWidth, binHeight) {
      this.binData = binData;
      this.binWidth = binWidth;
      this.binHeight = binHeight;
      this.sepHeight = 30;
      this.startX = startX;
      this.startY = startY;
      this.scale = 2;
    }

    init() {
      let binSegCount = binData.length;
      this.canvasWidth = window.innerWidth;
      this.canvasHeight =
        binSegCount * (this.binHeight + this.sepHeight) * this.scale + 300;
    }

    draw() {
      this.init();
      let c = document.getElementById("result");
      let ctx = c.getContext("2d");
      c.width = this.canvasWidth;
      c.height = this.canvasHeight;
      for (let i = 0, leni = binData.length; i < leni; i++) {
        this.drawBin(ctx);
        let binSeg = binData[i].bin;
        for (let j = 0, lenj = binSeg.length; j < lenj; j++) {
          let rect = binSeg[j];
          this.drawInnerRect(rect.x, rect.y, rect.width, rect.height, ctx);
        }
        this.startY += this.binHeight + this.sepHeight;
      }
    }

    drawBin(ctx) {
      this.drawInnerRect(0, 0, this.binWidth, this.binHeight, ctx);
    }

    drawInnerRect(x, y, width, height, ctx) {
      x = (x + this.startX) * this.scale;
      y = (y + this.startY) * this.scale;
      width = width * this.scale;
      height = height * this.scale;
      ctx.rect(x, y, width, height);
      ctx.stroke();
    }
  }

  let binData = new Array();
  let binSeg = new Array(
    { x: 0, y: 0, width: 100, height: 50, rid: 5 },
    { x: 0, y: 50, width: 100, height: 30, rid: 1 }
  );
  binData.push({ bin: binSeg, count: 1 });

  binSeg = new Array(
    { x: 0, y: 0, width: 70, height: 70, rid: 4 },
    { x: 70, y: 0, width: 30, height: 30, rid: 3 },
    { x: 70, y: 30, width: 30, height: 30, rid: 6 }
  );
  binData.push({ bin: binSeg, count: 1 });

  binSeg = new Array({ x: 0, y: 0, width: 40, height: 60, rid: 2 });
  binData.push({ bin: binSeg, count: 1 });

  let binSolution = new BinSolution(500, 20, binData, 100, 100);
  binSolution.draw();
});
// 3;
// 2, 1;
// 0, 0, 100, 50, 5;
// 0, 50, 100, 30, 1;
// 3, 1;
// 0, 0, 70, 70, 4;
// 70, 0, 30, 30, 3;
// 70, 30, 30, 30, 6;
// 1, 1;
// 0, 0, 40, 60, 2;
