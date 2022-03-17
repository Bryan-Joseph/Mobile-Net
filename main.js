previousItem = '';

function preload() {

}

function setup() {
  canv = createCanvas(300, 300);
  document.getElementById('canvHolder').append(canv.elt);


  classifier = ml5.imageClassifier('MobileNet', () => {
    console.log('Model Loaded');
  });

  video = createCapture(VIDEO);
  video.hide();

}

function draw() {
  image(video, 0, 0, 300, 300);

  classifier.classify(canv, (error, results) => {
    if (error) {
      console.error(error);
    } else {
      if ((results[0].confidence > 0.5) &&
        (previousItem != results[0].label)) {

        label = results[0].label;
        confidence = Math.round(results[0].confidence * 100) + '%';

        previousItem = label;

        document.getElementById('objectV').innerHTML = label;
        document.getElementById('confidenceV').innerHTML = confidence;

        // var synth = window.speechSynthesis;
        // utter = new SpeechSynthesisUtterance(`The object detected is ${label}`);

        // synth.speak(utter);

      }
    }
  });
}



