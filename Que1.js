// JavaScript file
// Fetch the audio clips from the API
fetch('https://data.riksdagen.se/dokumentstatus/H901FiU40/webbtvxml')
  .then(response => response.json())
  .then(data => {
    // Play the audio clips and check the user's answer
    const audio1 = new Audio(data.audio1);
    const audio2 = new Audio(data.audio2);
    const audio3 = new Audio(data.audio3);
    const audio4 = new Audio(data.audio4);

    document.getElementById('answer1').addEventListener('click', () => {
      if (audio1.currentTime > 0) {
        if (audio1.currentTime < audio1.duration) {
          audio1.pause();
        }
        if (userAnswer === 'Person 1') {
          // The user's answer is correct
        } else {
          // The user's answer is incorrect
        }
      } else {
        audio1.play();
      }
    });

    document.getElementById('answer2').addEventListener('click', () => {
      if (audio2.currentTime > 0) {
        if (audio2.currentTime < audio2.duration) {
          audio2.pause();
        }
        if (userAnswer === 'Person 2') {
          // The user's answer is correct
        } else {
          // The user's answer is incorrect
        }
      } else {
        audio2.play();
      }
    });

    document.getElementById('answer3').addEventListener('click', () => {
      if (audio3.currentTime > 0) {
        if (audio3.currentTime < audio3.duration) {
          audio3.pause();
        }
        if (userAnswer === 'Person 3') {
          // The user's answer is correct
        } else {
          // The user's answer is incorrect
        }
      } else {
        audio3.play();
      }
    });

    document.getElementById('answer4').addEventListener('click', () => {
      if (audio4.currentTime > 0) {
        if (audio4.currentTime < audio4.duration) {
          audio4.pause();
        }
        if (userAnswer === 'Person 4') {
          // The user's answer is correct
        } else {
          // The user's answer is incorrect
        }
      } else {
        audio4.play();
      }
    });
  });