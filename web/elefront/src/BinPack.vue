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
      <div class="rectPara">宽度(cm)<el-input class="rectPara" v-model="swidth" prefix="宽度"></el-input></div>
      <div class="rectPara">高度(cm)<el-input class="rectPara" v-model="swidth" prefix="宽度"></el-input></div>
      <el-button class="rectPara" type="primary" @click="summit">获取分割方案</el-button>
    </div>

     
    <canvas id="result"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rwidth: "",
      rheight: "",
      rnumber: "",
      swidth: "190",
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
    summit() {}
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
</style>
