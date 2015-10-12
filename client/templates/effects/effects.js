Template.effects.helpers({
  WahWah: function () {
  var AudioContext = window.AudioContext || window.webkitAudioContext;
    var context = new AudioContext()
    var source = context.createMediaStreamSource(localMediaStream)
            var   tuna = new Tuna(context);
    var wahwah = new tuna.WahWah({
                   automode: true, //true/false
                   baseFrequency: 0.5, //0 to 1
                   excursionOctaves: 3, //1 to 6
                   sweep: 0, //0 to 1
                   resonance: 2, //1 to 100
                   sensitivity: 1, //-1 to 1
                   bypass: 0
               });
               function createWahWah() {
                 console.log("HIT");
                osc = context.createOscillator();
                osc.type = 3; // triangle wave
                osc.frequency.value = freq
                osc.connect(wahwah.input);
                wahwah.connect(context.destination);
                osc.noteOn(0);
                console.log('created');
            }
            createWahWah()

  }


})
