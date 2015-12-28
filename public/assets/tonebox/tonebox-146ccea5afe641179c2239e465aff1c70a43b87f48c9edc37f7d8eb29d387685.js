(function() {
    var audioCtx = new (AudioContext || webkitAudioContext)();
    var rowOneNotesByKeyCode = {
      90: { noteName: 'a3', frequency: 440 / 2, keyName: 'z' },
      88: { noteName: 'a#3', frequency: 466.16 / 2, keyName: 'x' },
      67: { noteName: 'b3', frequency: 493.88 / 2, keyName: 'c' },
      86: { noteName: 'c3', frequency: 523.25 / 2, keyName: 'v' },
      66: { noteName: 'c#3', frequency: 554.37 / 2, keyName: 'b' },
      78: { noteName: 'd3', frequency: 587.33 / 2, keyName: 'n' },
      77: { noteName: 'd#3', frequency: 622.25 / 2, keyName: 'm' },
      188: { noteName: 'e3', frequency: 659.25 / 2, keyName: ',' }
    }
    var rowTwoNotesByKeyCode = {
      65: { noteName: 'd3', frequency: 587.33 / 2, keyName: 'a' },
      83: { noteName: 'd#3', frequency: 622.25 / 2, keyName: 's' },
      68: { noteName: 'e3', frequency: 659.25 / 2, keyName: 'd' },
      70: { noteName: 'f3', frequency: 698.46 / 2, keyName: 'f' },
      71: { noteName: 'f#3', frequency: 739.99 / 2, keyName: 'g' },
      72: { noteName: 'g3', frequency: 783.99 / 2, keyName: 'h' },
      74: { noteName: 'g#3', frequency: 830.61 / 2, keyName: 'j' },
      75: { noteName: 'a4', frequency: 440, keyName: 'k' }
    }
    var rowThreeNotesByKeyCode = {
      81: { noteName: 'g3', frequency: 783.99 / 2, keyName: 'q' },
      87: { noteName: 'g#3', frequency: 830.61 / 2, keyName: 'w' },
      69: { noteName: 'a4', frequency: 440, keyName: 'e' },
      82: { noteName: 'a#4', frequency: 466.16, keyName: 'r' },
      84: { noteName: 'b4', frequency: 493.88, keyName: 't' },
      89: { noteName: 'c4', frequency: 523.25, keyName: 'y' },
      85: { noteName: 'c#4', frequency: 554.37, keyName: 'u' },
      73: { noteName: 'd4', frequency: 587.33, keyName: 'i' }
    }
    var rowFourNotesByKeyCode = {
      49: { noteName: 'c4', frequency: 523.25, keyName: '1' },
      50: { noteName: 'c#4', frequency: 554.37, keyName: '2' },
      51: { noteName: 'd4', frequency: 587.33, keyName: '3' },
      52: { noteName: 'd#4', frequency: 622.25, keyName: '4' },
      53: { noteName: 'e4', frequency: 659.25, keyName: '5' },
      54: { noteName: 'f4', frequency: 698.46, keyName: '6' },
      55: { noteName: 'f#4', frequency: 739.99, keyName: '7' },
      56: { noteName: 'g4', frequency: 783.99, keyName: '8' }
    }
    function Key(noteName, keyName, frequency) {
        var keyHTML = document.createElement('div');
        var keySound = new Sound(frequency, 'triangle');
        keyHTML.className = 'key';
        keyHTML.innerHTML = noteName + '<br><span>' + keyName + '</span>';
        return {
            html: keyHTML,
            sound: keySound
        };
    }
    function Sound(frequency, type) {
        this.osc = audioCtx.createOscillator();
        this.pressed = false;
        if(typeof frequency !== 'undefined') {
            this.osc.frequency.value = frequency;
        }
        this.osc.type = type || 'triangle';
        this.osc.start(0);
    };
    Sound.prototype.play = function() {
        if(!this.pressed) {
            this.pressed = true;
            this.osc.connect(audioCtx.destination);
        }
    };
    Sound.prototype.stop = function() {
        this.pressed = false;
        this.osc.disconnect();
    };
    function createKeyboard(notes, containerId) {
        var sortedKeys = [];
        var waveFormSelector = document.getElementById('soundType');
        for(var keyCode in notes) {
            var note = notes[keyCode];
            note.key = new Key(note.noteName, note.keyName, note.frequency);
            sortedKeys.push(notes[keyCode]);
        }
        sortedKeys = sortedKeys.sort(function(note1, note2) {
            if (note1.frequency < note2.frequency) return -1;
            if (note1.frequency > note2.frequency) return 1;
            return 0;
        });
        for(var i = 0; i < sortedKeys.length; i++) {
            document.getElementById(containerId).appendChild(sortedKeys[i].key.html);
        }
        var playNote = function(event) {
            var keyCode = event.keyCode;
            if(typeof notes[keyCode] !== 'undefined') {
                notes[keyCode].key.sound.play();
                notes[keyCode].key.html.className = 'key playing';
            }
        };
        var endNote = function(event) {
            var keyCode = event.keyCode;
            if(typeof notes[keyCode] !== 'undefined') {
                notes[keyCode].key.sound.stop();
                notes[keyCode].key.html.className = 'key';
            }
        };
        var setWaveform = function(event) {
            for(var keyCode in notes) {
                notes[keyCode].key.sound.osc.type = this.value;
            }
            this.blur();
        };
        waveFormSelector.addEventListener('change', setWaveform);
        window.addEventListener('keydown', playNote);
        window.addEventListener('keyup', endNote);
    }

    window.addEventListener('load', function() {
        createKeyboard(rowFourNotesByKeyCode, 'rowFour');
        createKeyboard(rowThreeNotesByKeyCode, 'rowThree');
        createKeyboard(rowTwoNotesByKeyCode, 'rowTwo');
        createKeyboard(rowOneNotesByKeyCode, 'rowOne');
    });
})();
