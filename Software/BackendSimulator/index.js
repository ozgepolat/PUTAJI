/*

*/
var math3d = require('math3d');
var Vector3f = math3d.Vector3;

var Transducer = require('./app/Simulation/Transducer.js');

/* Simulation CONSTs */
var root = {
	consts:{
		TRANSDUCER: {
			FREQUENCY: 40000, //40 KHZ
			APPERTURE: 0.009, // apperture (diameter) for directivity calculation
			POWER: 2.53	// Transducer power (from microphone measurments).
		},
		SIMULATION:{
			minSize: 0.001,
			mediumSpeed: 346,
			mediumDensity: 1.2,
			particleSpeed: 2600,
			particleDensity: 25
		}
	}
};



//root.simulation = 
root.transducers = [];
root.transducers.push(new Transducer(root));


function calcFieldAt(p){ //p is the vector3f
	var discAmp = true; // mf.miscPanel.isAmpDiscretizer();
	var discPhase = true; // mf.miscPanel.isPhaseDiscretizer();
	var ampDiscStep = 1.0 / 1; //mf.miscPanel.getAmpDiscretization();
	var phaseDiscStep = 1.0 / 1; //mf.miscPanel.getPhaseDiscretization();
		
	var field = new Vector3f(0,0,0);
   
	var mSpeed = root.consts.SIMULATION.mediumSpeed;//mf.simForm.getMediumSpeed();
	
	for(var i in root.transducers){
		var t = root.transducers[i];
		
		var temp = t.transform.translation;
		var tPos = new Vector3f( temp.x, temp.y, temp.z );
		var nor = t.transform.rotation.mulVector3(new Vector3f(0,1,0));
		var diffVec = p.sub(tPos);
		
		var dist = diffVec.magnitude;
		var nn = nor.magnitude;
		diffVec = diffVec.mulScalar(1/dist);
		
		var angle = Math.acos(diffVec.dot(nor) / nn);
		var ap = t.apperture;
		var omega = Math.TWO_PI * t.frequency; //angular frequency
		var k = omega / mSpeed; //wavenumber
		var dum = ap * 0.5 * k * Math.sin(angle);
		var directivity = Math.sinc(dum);
		var ampDirAtt = t.calcRealDiscAmplitude(discAmp, ampDiscStep ) * directivity / dist;
		var kdPlusPhase = k * dist + t.calcRealDiscPhase(discPhase, phaseDiscStep);
		field = field.add(new Vector3f(ampDirAtt * Math.cos(kdPlusPhase), ampDirAtt * Math.sin(kdPlusPhase), 0));
		
	}
	console.log(field);
	
	return field;
}

Math.TWO_PI = 2 * Math.PI;

Math.sinc = function(dum) {
	if (dum == 0) {
		return 1;
	} else {
		return Math.sin(dum) / dum;
	}
}


calcFieldAt(new Vector3f(0, 0.5, 0));