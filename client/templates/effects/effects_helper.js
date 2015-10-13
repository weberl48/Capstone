navigator.getUserMedia = (navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia);

window.AudioContext = (function() {
  return window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
})();


var audioContext;
navigator.getUserMedia({
    video: false,
    audio: true
  },
  effects(stream),
  function(error) {
    console.log(error);
  });

function effects(stream) {
  var lineIn = audioContext.createMediaStreamSource(stream);
  lineIn.connect(audioContext.destination)
}

var chorus = new tuna.Chorus({
  rate: 1.5, //0.01 to 8+
  feedback: 0.2, //0 to 1+
  delay: 0.0045, //0 to 1
  bypass: 0 //the value 1 starts the effect as bypassed, 0 or 1
});

var delay = new tuna.Delay({
  feedback: 0.45, //0 to 1+
  delayTime: 150, //how many milliseconds should the wet signal be delayed?
  wetLevel: 0.25, //0 to 1+
  dryLevel: 1, //0 to 1+
  cutoff: 2000, //cutoff frequency of the built in lowpass-filter. 20 to 22050
  bypass: 0
});

var phaser = new tuna.Phaser({
  rate: 1.2, //0.01 to 8 is a decent range, but higher values are possible
  depth: 0.3, //0 to 1
  feedback: 0.2, //0 to 1+
  stereoPhase: 30, //0 to 180
  baseModulationFrequency: 700, //500 to 1500
  bypass: 0
});

var overdrive = new tuna.Overdrive({
  outputGain: 0.5, //0 to 1+
  drive: 0.7, //0 to 1
  curveAmount: 1, //0 to 1
  algorithmIndex: 0, //0 to 5, selects one of our drive algorithms
  bypass: 0
});

var compressor = new tuna.Compressor({
  threshold: 0.5, //-100 to 0
  makeupGain: 1, //0 and up
  attack: 1, //0 to 1000
  release: 0, //0 to 3000
  ratio: 4, //1 to 20
  knee: 5, //0 to 40
  automakeup: true, //true/false
  bypass: 0
});
// var convolver = new tuna.Convolver({
//     highCut: 22050,                         //20 to 22050
//     lowCut: 20,                             //20 to 22050
//     dryLevel: 1,                            //0 to 1+
//     wetLevel: 1,                            //0 to 1+
//     level: 1,                               //0 to 1+, adjusts total output of both wet and dry
//     impulse: "impulses/impulse_rev.wav",    //the path to your impulse response
//     bypass: 0
// });

// var cabinet = new tuna.Cabinet({
//     makeupGain: 1,                                 //0 to 20
//     impulsePath: "impulses/impulse_guitar.wav",    //path to your speaker impulse
//     bypass: 0
// });
//

var tremolo = new tuna.Tremolo({
  intensity: 0.3, //0 to 1
  rate: 4, //0.001 to 8
  stereoPhase: 0, //0 to 180
  bypass: 0
});

var wahwah = new tuna.WahWah({
  automode: true, //true/false
  baseFrequency: 0.5, //0 to 1
  excursionOctaves: 2, //1 to 6
  sweep: 0.2, //0 to 1
  resonance: 10, //1 to 100
  sensitivity: 0.5, //-1 to 1
  bypass: 0
});

var moog = new tuna.MoogFilter({
  cutoff: 0.065, //0 to 1
  resonance: 3.5, //0 to 4
  bufferSize: 4096 //256 to 16384
});
