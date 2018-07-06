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
      let binSeg = this.binData[i].bin;
      this.drawBin(this.binData[i], ctx);
      for (let j = 0, lenj = binSeg.length; j < lenj; j++) {
        let rect = binSeg[j];
        this.drawInnerRect(rect.x, rect.y, rect.width, rect.height, ctx);
      }
      this.startY += this.binHeight + this.sepHeight;
    }
  }

  drawTips(x, y, binDataItem, ctx) {
    x = (x + this.binWidth + 20 + this.startX) * this.scale;
    y = (y + this.binHeight + this.startY) * this.scale;
    let oldfont = ctx.font;
    ctx.font = "20px Georgia";
    ctx.fillText(binDataItem.count + "个", x, y);
    ctx.font = oldfont;
  }

  drawBin(binDataItem, ctx) {
    this.drawInnerRect(0, 0, this.binWidth, this.binHeight, ctx);
    this.drawTips(0, 0, binDataItem, ctx);
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
