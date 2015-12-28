$(function(){

  $('#theme').click(function(){
    theme(getTempoModifier(), getFreq());
  })

  $('#counter').click(function(){
    counterMelody(getTempoModifier(), getFreq());
  })

  $('#bass').click(function(){
    bass(getTempoModifier(), getFreq());
  })

  $('#theme-and-counter').click(function(){
    theme(getTempoModifier(), getFreq());
    counterMelody(getTempoModifier(), getFreq());
  })

  $('#bass-and-counter').click(function(){
    bass(getTempoModifier(), getFreq());
    counterMelody(getTempoModifier(), getFreq());
  })

  $('#bass-and-theme').click(function(){
    bass(getTempoModifier(), getFreq());
    theme(getTempoModifier(), getFreq());
  })

  $('#all-parts').click(function(){
    theme(getTempoModifier(), getFreq());
    counterMelody(getTempoModifier(), getFreq());
    bass(getTempoModifier(), getFreq());
  })

})

var keyFrequencies = {
  'a': 440,
  'a#': 466.16,
  'bb': 466.16,
  'b': 493.88,
  'b#': 523.25,
  'c': 523.25,
  'c#': 554.37,
  'db': 554.37,
  'd': 587.33,
  'd#': 622.25,
  'eb': 622.25,
  'e': 659.25,
  'fb': 659.25,
  'e#': 698.46,
  'f': 698.46,
  'f#': 739.99,
  'gb': 739.99,
  'g': 783.99,
  'g#': 830.61,
  'ab': 830.61
}

var audioContext = new AudioContext()

function play (delay, pitch, duration, second, freq) {
  var startTime = audioContext.currentTime + delay * second;
  var endTime = startTime + duration * second;
  var oscillator = audioContext.createOscillator()
  oscillator.frequency.value = (freq / 4) * Math.pow(2, pitch / 12)
  oscillator.type = 'sawtooth'
  oscillator.connect(audioContext.destination)
  oscillator.start(startTime)
  oscillator.stop(endTime)
}

function theme(q, freq){
  play(0, 24, 1, q, freq);
  play(1, 23, 1, q, freq);
  play(2, 24, 1, q, freq);
  play(3, 19, 1, q, freq);
  play(4, 20, 1.5, q, freq);
  play(5.5, 19, .25, q, freq)
  play(5.75, 17, .25, q, freq)
  play(6, 19, 2, q, freq);
}

function counterMelody(q, freq){
  play(0, 27, 1, q, freq);
  play(1, 26, 1, q, freq);
  play(2, 27, 1, q, freq);
  play(3, 29, 1, q, freq);
  play(4, 31, 1, q, freq);
  play(5, 24, 1, q, freq);
  play(6, 26, 1, q, freq);
  play(7, 23, 1, q, freq);
}

function bass(q, freq){
  play(0, 12, 3, q, freq);
  play(3, 14, 1, q, freq);
  play(4, 11, 1.5, q, freq);
  play(5.5, 12, .5, q, freq);
  play(6, 14, 2, q, freq);
}

function getTempoModifier(){
  var bpm = $('#bpm').val();
  return 60 / bpm;
}

function getFreq(){
  var freq = $('#tonic').val().toLowerCase();
  return keyFrequencies[freq];
}
