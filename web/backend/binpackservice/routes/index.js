var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

function GetInputString(binRects) {
  let res = "";
  for (let i = 0, leni = binRects.length; i < leni; i++) {
    let binRect = binRects[i];
    res +=
      binRect.rwidth +
      "," +
      binRect.rheight +
      "," +
      binRect.rnumber +
      "," +
      (i + 1) +
      "\n";
  }
  return res;
}

function ParseOutPut(foutpath) {
  var fs = require("fs");
  var lines = fs
    .readFileSync(foutpath)
    .toString()
    .split("\n");
  let length = parseInt(lines[0]);
  let index = 1;
  let binData = [];
  for (let i = 0; i < length; ++i) {
    let words = lines[index].split(",");
    let rcount = words[0]; //rectangles count
    let bcount = words[1]; //bin count
    index = index + 1;
    let binSeg = [];
    for (let j = 0; j < rcount; ++j) {
      words = lines[index].split(",");
      binSeg.push({
        x: parseInt(words[0]),
        y: parseInt(words[1]),
        width: parseInt(words[2]),
        height: parseInt(words[3]),
        rid: parseInt(words[4])
      });
      index += 1;
    }
    binData.push({ bin: binSeg, count: parseInt(bcount) });
  }
  return binData;
}

//user login
router.post("/binPack", function(req, res, next) {
  console.log(req.body.binRects);
  //console.log(req.body.bins);
  let inputString = GetInputString(req.body.binRects);
  console.log("res:" + inputString);
  var fs = require("fs");
  const uuidV4 = require("uuid/v4");
  let finpath = "data/" + uuidV4() + ".in";
  let foutpath = finpath + ".out";
  fs.writeFileSync(finpath, inputString);
  let binData = ParseOutPut("data/sample.out");
  console.log(binData);
  res.send({ binData: binData });
});

module.exports = router;
