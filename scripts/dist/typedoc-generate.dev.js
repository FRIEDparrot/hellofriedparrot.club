"use strict";

var _child_process = require("child_process");

var _util = require("util");

var _glob = require("glob");

var execAsync = (0, _util.promisify)(_child_process.exec);

function generateDocs() {
  var files, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, file, _ref, stdout, stderr;

  return regeneratorRuntime.async(function generateDocs$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _glob.glob)("./src/api/**/*.ts"));

        case 2:
          files = _context.sent;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 6;
          _iterator = files[Symbol.iterator]();

        case 8:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 29;
            break;
          }

          file = _step.value;
          console.log("Generating docs for " + file);
          _context.prev = 11;
          _context.next = 14;
          return regeneratorRuntime.awrap(execAsync("typedoc --entryPoints ".concat(file, " --out docs/api --excludeExternals --exclude \"/src/components/**/*.ts\" \"/src/pages/**/*.ts\"")));

        case 14:
          _ref = _context.sent;
          stdout = _ref.stdout;
          stderr = _ref.stderr;

          if (!stderr) {
            _context.next = 20;
            break;
          }

          console.error("stderr: ".concat(stderr));
          return _context.abrupt("return");

        case 20:
          console.log(stdout);
          _context.next = 26;
          break;

        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](11);
          console.error("Failed to generate docs:", _context.t0);

        case 26:
          _iteratorNormalCompletion = true;
          _context.next = 8;
          break;

        case 29:
          _context.next = 35;
          break;

        case 31:
          _context.prev = 31;
          _context.t1 = _context["catch"](6);
          _didIteratorError = true;
          _iteratorError = _context.t1;

        case 35:
          _context.prev = 35;
          _context.prev = 36;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 38:
          _context.prev = 38;

          if (!_didIteratorError) {
            _context.next = 41;
            break;
          }

          throw _iteratorError;

        case 41:
          return _context.finish(38);

        case 42:
          return _context.finish(35);

        case 43:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 31, 35, 43], [11, 23], [36,, 38, 42]]);
}

generateDocs();