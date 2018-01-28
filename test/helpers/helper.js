global.sinon = require("sinon");

var chai = require("chai");
chai.use(require("sinon-chai"));
chai.use(require("chai-as-promised"));

global.expect = chai.expect;
global.assert = chai.assert;

