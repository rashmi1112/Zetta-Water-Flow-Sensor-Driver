var Device = require('zetta-device');
var util = require('util');
var mraa = require('mraa-js');

var PUBLISH_INTERVAL = 1000; // 1000 milliseconds - 1 second
var READ_INTERVAL = 25;

function h() {
  console.log("HELLO!!!!")
}

var WaterFlowSensor = module.exports = function(pin) {
  Device.call(this);
  this.pin = pin || 2;
  this.flowStatus = 0;
  this._pin = new mraa.Gpio(this.pin);
  this._pin.dir(mraa.DIR_IN);
  this.litres = 0;
  this.pulses = 0;
  this.lastFlowRateTimer = 0;
  this.lastFlowPinStatus = 0;
  this.flowrate = 1000;
};

util.inherits(WaterFlowSensor, Device);

WaterFlowSensor.prototype.init = function(config) {
  config
  .state('undetermined')
  .type('waterFlowSensor')
  .name('G0.5WaterFlowSensor');

  var self = this;

  self._pin.isr(mraa.EDGE_BOTH, h);

  setInterval(function() {
    var WaterFlowSensorValue = self._pin.read();
    if (WaterFlowSensorValue === 0) {
      self.lastFlowRateTimer = self.lastFlowRateTimer + 1;
      return;
    }
    if (WaterFlowSensorValue === 1) {
      self.pulses = self.pulses + 1;
    }
    self.lastFlowPinStatus = value;
    self.flowrate = 1000.0;
    self.flowrate = self.flowrate / self.lastFlowRateTimer;
    self.lastFlowRateTimer = 0;
    self.lastFlowPinStatus = WaterFlowSensorValue;
  }, READ_INTERVAL);

  // Publish Data
  setInterval(function() {
    var litres = self.pulses;
    console.log("Pulses is :" + self.pulses);
    litres /= 7.5;
    litres /= 60;
    console.log('Litres of water consumed is ' + litres);
  }, PUBLISH_INTERVAL);

};
