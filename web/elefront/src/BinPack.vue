<template>
  <div>
    <div class="leftInput">
        <p style="text-align: center">请输入板材需求</p>
        <el-input class="rectPara" v-model="rwidth" placeholder="宽度"></el-input>
        <el-input class="rectPara" v-model="rheight" placeholder="高度"></el-input>
        <el-input class="rectPara" v-model="rnumber" placeholder="数量"></el-input>
        <el-button class="rectPara" type="primary" @click="addRect">添加</el-button>
         <el-table
    :data="rectTable"
    style="width: 100%"
    max-height="250">
    <el-table-column
      fixed
      prop="rwidth"
      label="宽度(cm)"
      width="150">
    </el-table-column>
    <el-table-column
      prop="rheight"
      label="高度(cm)"
      width="120">
    </el-table-column>
    <el-table-column
      prop="rnumber"
      label="数量"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, rectTable)"
          type="text"
          size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
      <p style="text-align: center; margin-top:100px">标准板材规格</p>
      <div class="rectPara">宽度(cm)<el-input class="rectPara" v-model="bwidth" prefix="宽度"></el-input></div>
      <div class="rectPara">高度(cm)<el-input class="rectPara" v-model="bheight" prefix="高度"></el-input></div>
      <el-button class="rectPara" type="primary" @click="summit">获取分割方案</el-button>
    </div>

    <div class="result">
      <canvas id="result"></canvas>
    </div>
  </div>
</template>

<script>
import axios from "axios";
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
export default {
  data() {
    return {
      rwidth: "",
      rheight: "",
      rnumber: "",
      bwidth: "190",
      bheight: "190",
      rectTable: [
        {
          rwidth: "50",
          rheight: "30",
          rnumber: "2"
        }
      ]
    };
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    addRect() {
      this.rectTable.push({
        rwidth: this.rwidth,
        rheight: this.rheight,
        rnumber: this.rnumber
      });
      rwidth = "";
      rheight = "";
      rnumber = "";
    },
    summit() {
      let self = this;
      axios
        .post("/api/binPack", {
          binRects: this.rectTable,
          bins: { bwidth: self.bwidth, bheight: self.bwidth }
        })
        .then(function(response) {
          console.log(response.data.binData);
          let binData = response.data.binData;
          let binSolution = new BinSolution(
            500,
            20,
            binData,
            parseInt(self.bwidth),
            parseInt(self.bheight)
          );
          binSolution.draw();
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style>
.leftInput {
  width: 600px;
  margin-left: 50px;
}
.rectPara {
  margin-bottom: 10px;
}
label {
  /* Other styling.. */
  text-align: right;
  clear: both;
  float: left;
  margin-right: 15px;
}
.result {
  position: absolute;
  top: 0px;
}
</style>
