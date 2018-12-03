/*

*/
var math3d = require('math3d');
var Vector3f = math3d.Vector3;
var Quaternion = math3d.Quaternion;

Math.discretize = function(value, disc){
	var entDiv = Math.round(value / disc);
	return entDiv * disc;
}
	
var Transducer = function(root){
	/* CONSTRUCTOR */
	this.root = root;
	this.frequency = root.consts.TRANSDUCER.FREQUENCY;        // Hz
    this.apperture = root.consts.TRANSDUCER.APPERTURE;     // apperture (diameter) for directivity calculation
    this.power = root.consts.TRANSDUCER.POWER;           // Transducer power (from microphone measurments).
    
    this.name = 'Transducer 1';
    this.amplitude = 1; //from 0 to 1
    this.phase = 0; //in radians but divided by PI. That is, a phase of 2 means 2PI radians 
    this.phaseCorrection; //the deviation that this current transducer has in phase due to manufacturing, long wires or polarity.
    
    this.type = 0; //0=circle, 1=square... Unimplemented
    
	this.orderNumber;
	this.driverPinNumber; //in the driver board
    
    this.useGreyScale = false;
    this.useHeightRendering = false;
    this.lastHeight = 0;
	
	this.transform = {
		translation: new Vector3f(),
		rotation: new Quaternion(),
		scale: new Vector3f(1, 1, 1)
	}
}


Transducer.prototype = {
	calcRealDiscAmplitude: function(disc, discValue){
		if (disc){
            return (Math.discretize(this.amplitude, discValue) ) * this.power;
        }else{
            return this.amplitude * getPower();
        }
	},
	
	calcRealDiscPhase: function(disc, discValue){
		if (disc){
            return ( Math.discretize(this.phase, discValue) ) * Math.PI;
        }else{
            return this.phase * Math.PI;
        }
	}
}

module.exports = Transducer;