Template.effectsTemplate.onRendered(function() {
  var audioContext = new AudioContext();
  var audioInput = null;
  var analyser
  var analyserMethod = "getByteTimeDomainData";
  var canvas = document.getElementById("visualizer");
  var canvasContext = canvas.getContext("2d");
  var canvasWidth = canvas.width;
  var canvasHeight = canvas.height;
  var dataArray;
  var tuna = new Tuna(audioContext);
  var currentEffects = [];
  console.log(audioContext);

  function createWahWah() {
    if (currentEffects.indexOf('w') === 0) {
      effects.wahwah.disconnect(audioContext.destination)
      currentEffects.splice("w")

    } else if (currentEffects.indexOf('w') === -1) {
      lineIn.connect(effects.wahwah)
      effects.wahwah.connect(audioContext.destination);
      currentEffects.push('w')
    }

  }

  function createChorus() {
    if (currentEffects.indexOf('c') === 0) {
      effects.chorus.disconnect(audioContext.destination)
      currentEffects.splice("c")

    } else if (currentEffects.indexOf('c') === -1) {
      lineIn.connect(effects.chorus)
      effects.chorus.connect(audioContext.destination);
      currentEffects.push('c')
    }
  }

  function createOverdrive() {
    if (currentEffects.indexOf('o') === 0) {
      effects.overdrive.disconnect(audioContext.destination)
      currentEffects.splice("o")
    } else if (currentEffects.indexOf('o') === -1) {
      lineIn.connect(effects.overdrive)
      effects.overdrive.connect(audioContext.destination);
      currentEffects.push('o')
    }
  }

  function createDelay() {
    if (currentEffects.indexOf('d') === 0) {
      effects.delay.disconnect(audioContext.destination)
      currentEffects.splice("d")
    } else if (currentEffects.indexOf('d') === -1) {
      lineIn.connect(effects.delay)
      effects.delay.connect(audioContext.destination);
      currentEffects.push('d')
    }
  }

  function createPhaser() {
    if (currentEffects.indexOf('p') === 0) {
      effects.phaser.disconnect(audioContext.destination)
      currentEffects.splice("p")
    } else if (currentEffects.indexOf('p') === -1) {
      lineIn.connect(effects.phaser)
      effects.phaser.connect(audioContext.destination);
      currentEffects.push('p')
    }
  }

  function createBitcrusher() {
    if (currentEffects.indexOf('b') === 0) {
      effects.bitcrusher.disconnect(audioContext.destination)
      currentEffects.splice("b")
    } else if (currentEffects.indexOf('b') === -1) {
      lineIn.connect(effects.bitcrusher)
      effects.bitcrusher.connect(audioContext.destination);
      currentEffects.push('b')
    }
  }

  function createCompressor() {
    if (currentEffects.indexOf('cm') === 0) {
      effects.compressor.disconnect(audioContext.destination)
      currentEffects.splice("cm")
    } else if (currentEffects.indexOf('cm') === -1) {
      lineIn.connect(effects.compressor)
      effects.compressor.connect(audioContext.destination);
      currentEffects.push('cm')
    }
  }

  function createTremolo() {
    if (currentEffects.indexOf('t') === 0) {
      effects.tremolo.disconnect(audioContext.destination)
      currentEffects.splice("t")
    } else if (currentEffects.indexOf('t') === -1) {
      lineIn.connect(effects.tremolo)
      effects.tremolo.connect(audioContext.destination);
      currentEffects.push('t')
    }
  }


  function gotStream(stream) {
    lineIn = audioContext.createMediaStreamSource(stream)
    analyser = audioContext.createAnalyser();

    lineIn.connect(audioContext.destination)
    lineIn.connect(analyser)

    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    canvasContext.lineWidth = 1;
    canvasContext.strokeStyle = 'rgba(0, 0, 0, 1)';

    function draw() {
      console.log("draw started");
      canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
      requestAnimationFrame(draw);
      analyser[analyserMethod](dataArray)
      for (var i = 0; i < bufferLength; i++) {
        canvasContext.beginPath();
        canvasContext.moveTo(i, 255);
        canvasContext.lineTo(i, 255 - dataArray[i]);
        canvasContext.closePath();
        canvasContext.stroke();
      }

    }




    document.getElementById('wahwah').addEventListener('mousedown', createWahWah)
    document.getElementById('chorus').addEventListener('mousedown', createChorus)
    document.getElementById('overdrive').addEventListener('mousedown', createOverdrive)
    document.getElementById('delay').addEventListener('mousedown', createDelay)
    document.getElementById('phaser').addEventListener('mousedown', createPhaser)
    document.getElementById('compressor').addEventListener('mousedown', createCompressor)
    document.getElementById('tremolo').addEventListener('mousedown', createTremolo)
    document.getElementById('bitcrusher').addEventListener('mousedown', createBitcrusher)
  draw()

  }

  function initAudio() {
    if (!navigator.getUserMedia)
      navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;


    navigator.getUserMedia({
      "audio": true
    }, gotStream, function(err) {
      console.log("The following error occured: " + err.name);
    });
  }








  effects = {
    'chorus': new tuna.Chorus({
      rate: 1.5,
      feedback: 0.2,
      delay: 0.0045,
      bypass: 0
    }),

    'overdrive': new tuna.Overdrive({
      outputGain: 0.5, //0 to 1+
      drive: 0.7, //0 to 1
      curveAmount: 1, //0 to 1
      algorithmIndex: 0, //0 to 5, selects one of our drive algorithms
      bypass: 0
    }),
    'delay': new tuna.Delay({
      feedback: 0.45, //0 to 1+
      delayTime: 150, //how many milliseconds should the wet signal be delayed?
      wetLevel: 0.25, //0 to 1+
      dryLevel: 1, //0 to 1+
      cutoff: 2000, //cutoff frequency of the built in lowpass-filter. 20 to 22050
      bypass: 0
    }),
    'phaser': new tuna.Phaser({
      rate: 1.2, //0.01 to 8 is a decent range, but higher values are possible
      depth: 0.3, //0 to 1
      feedback: 0.2, //0 to 1+
      stereoPhase: 30, //0 to 180
      baseModulationFrequency: 700, //500 to 1500
      bypass: 0
    }),
    'compressor': new tuna.Compressor({
      threshold: 0.5, //-100 to 0
      makeupGain: 1, //0 and up
      attack: 1, //0 to 1000
      release: 0, //0 to 3000
      ratio: 4, //1 to 20
      knee: 5, //0 to 40
      automakeup: true, //true/false
      bypass: 0
    }),
    'tremolo': new tuna.Tremolo({
      intensity: 0.3, //0 to 1
      rate: 4, //0.001 to 8
      stereoPhase: 0, //0 to 180
      bypass: 0
    }),
    'wahwah': new tuna.WahWah({
      automode: true, //true/false
      baseFrequency: 0.5, //0 to 1
      excursionOctaves: 2, //1 to 6
      sweep: 0.2, //0 to 1
      resonance: 10, //1 to 100
      sensitivity: 0.5, //-1 to 1
      bypass: 0
    }),
    'bitcrusher': new tuna.Bitcrusher({
      bits: 4, //1 to 16
      normfreq: 0.1, //0 to 1
      bufferSize: 4096 //256 to 16384
    })
  }



  initAudio()

})
