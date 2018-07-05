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

//user login
router.post("/binPack", function(req, res, next) {
  console.log(req.body.binRects);
  //console.log(req.body.bins);
  let inputString = GetInputString(req.body.binRects);
  console.log("res:" + inputString);
  var fs = require("fs");
  const uuidV4 = require("uuid/v4");
  let fpath = "data/" + uuidV4() + ".in";
  fs.writeFileSync(fpath, inputString);

  res.send({ name: "hello world" });
});

module.exports = router;
