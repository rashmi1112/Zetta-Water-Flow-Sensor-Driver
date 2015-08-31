var util = require('util');
var AutoScout = require('zetta-auto-scout');
var WATERFLOWSENSOR = require('./waterFlowSensor_driver');

var EdisonScout = module.exports = function(pin) {
  AutoScout.call(this, 'waterFlowSensor', WATERFLOWSENSOR, pin);
};
util.inherits(EdisonScout, AutoScout);
