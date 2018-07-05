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

console.log(ParseOutPut("data/fd3b05c5-7c1f-4a20-9774-c09b676cf9b7.in.out"));
