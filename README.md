# Zetta-Water-Flow-Sensor-Driver

INSTALL

$ npm install Zetta-Water-Flow-Sensor-Driver --save

How To Use:

var zetta = require('zetta');
var LED = require('Zetta-Water-Flow-Sensor-Driver');

zetta()
  .name('Firstname-Lastname')
  .use(WaterFlowSensor,2)
  .listen(1337, function(){
     console.log('Zetta is running..');
});
