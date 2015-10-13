var context = new AudioContext();
var tuna = new Tuna(context);


var chorus = new tuna.Chorus({
    rate: 1.5,
    feedback: 0.2,
    delay: 0.0045,
    bypass: 0
});


var input = context.createGain();
var output = context.createGain();
input.connect(chorus);
chorus.connect(output);
