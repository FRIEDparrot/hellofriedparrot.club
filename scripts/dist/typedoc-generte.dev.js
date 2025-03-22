"use strict";

var glob = require("glob");

var _require = require("child_process"),
    exec = _require.exec;

glob("./src/api/**/*.ts", function (err, files) {
  if (err) {
    console.error(err);
    return;
  }

  var entryPoints = files.join(" ");
  exec("typedoc --entryPoints ".concat(entryPoints, " --out docs/api"), function (error, stdout, stderr) {
    if (error) {
      console.error("Error: ".concat(error.message));
      return;
    }

    if (stderr) {
      console.error("stderr: ".concat(stderr));
      return;
    }

    console.log(stdout);
  });
});