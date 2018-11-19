/*

*/
var Vector3 = math3d.Vector3;

var Transducer = require('./lib/Transducer.js');

/* Simulation CONSTs */
var root = {
	consts:{
		TRANSDUCER: {
			FREQUENCY: 40000, //49 KHZ
			apperture: 0.009, // apperture (diameter) for directivity calculation
			POWER:
		}
	}
};

root.transducers = [];
root.transducers.push(new Transducer(root));