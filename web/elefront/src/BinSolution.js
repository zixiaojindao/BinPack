export default class BinSolution {
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
    let binSegCount = this.binData.length;
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
    for (let i = 0, leni = this.binData.length; i < leni; i++) {
      this.drawBin(ctx);
      let binSeg = this.binData[i].bin;
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
