$(function(){

  $(window).mousedown(function(e){
    var audioContextOne = new AudioContext();
    var audioContextTwo = new AudioContext();

    var oscillatorOne = audioContextOne.createOscillator();
    var oscillatorTwo = audioContextTwo.createOscillator();

    oscillatorOne.connect(audioContextOne.destination);
    oscillatorTwo.connect(audioContextTwo.destination);

    oscillatorOne.frequency.value = (window.innerHeight - e.pageY) + 110;
    oscillatorTwo.frequency.value = e.pageX + 110;

    oscillatorOne.start()
    oscillatorTwo.start()

    $(window).mousemove(function(e){
      oscillatorOne.frequency.value = (window.innerHeight - e.pageY) + 110;
      oscillatorTwo.frequency.value = e.pageX + 110;
    })

    $(window).mouseup(function(e){
      oscillatorOne.stop();
      oscillatorTwo.stop();
    })
  })
})
