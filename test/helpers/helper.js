global.sinon = require("sinon");

const chai = require("chai");
chai.use(require("sinon-chai"));
chai.use(require("chai-as-promised"));

global.chai = chai;
global.expect = chai.expect;
global.assert = chai.assert;
