function test(str1, callback) {
  console.log(str1);
  callback();
}

test("str1", function() {
  console.log("hello");
});
