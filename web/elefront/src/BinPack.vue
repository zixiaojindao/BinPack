<template>
  <div style="display:flex" v-loading="loading">
    <div class="leftInput">
        <p style="text-align: center">请输入板材需求</p>
        <el-input class="rectPara" v-model="rwidth" placeholder="宽度"></el-input>
        <el-input class="rectPara" v-model="rheight" placeholder="高度"></el-input>
        <el-input class="rectPara" v-model="rnumber" placeholder="数量"></el-input>
        <el-button class="rectPara" type="primary" @click="addRect">添加</el-button>
         <el-table
    :data="rectTable"
    style="width: 100%"
    max-height="300">
     <el-table-column
      fixed
      prop="rid"
      label="序号"
      width="100">
    </el-table-column>
    <el-table-column
      fixed
      prop="rwidth"
      label="宽度(cm)"
      width="100">
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
import BinSolution from "./BinSolution";
export default {
  data() {
    return {
      rwidth: "",
      rheight: "",
      rnumber: "",
      bwidth: "190",
      bheight: "190",
      loading: false,
      rectTable: [
        {
          rid: "1",
          rwidth: "50",
          rheight: "30",
          rnumber: "2"
        },
        {
          rid: "2",
          rwidth: "50",
          rheight: "70",
          rnumber: "100"
        }
      ]
    };
  },
  methods: {
    reOrder() {
      for (let i = 0; i < this.rectTable.length; ++i) {
        this.rectTable[i].rid = (i + 1).toString();
      }
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
      this.reOrder();
    },
    addRect() {
      this.rectTable.push({
        rid: "",
        rwidth: this.rwidth,
        rheight: this.rheight,
        rnumber: this.rnumber
      });
      this.rwidth = "";
      this.rheight = "";
      this.rnumber = "";
      this.reOrder();
    },
    clearResult() {
      let c = document.getElementById("result");
      let ctx = c.getContext("2d");
      ctx.clearRect(0, 0, c.width, c.height);
      c.height = 0;
    },
    summit() {
      let self = this;
      self.loading = true;
      self.clearResult();
      axios
        .post("/api/binPack", {
          binRects: this.rectTable,
          bins: { bwidth: self.bwidth, bheight: self.bwidth }
        })
        .then(function(response) {
          console.log(response.data.binData);
          let binData = response.data.binData;
          let binSolution = new BinSolution(
            0,
            0,
            binData,
            parseInt(self.bwidth),
            parseInt(self.bheight)
          );
          binSolution.draw();
          self.loading = false;
        })
        .catch(function(error) {
          console.log(error);
          self.loading = false;
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
  margin-left: 200px;
}
</style>
