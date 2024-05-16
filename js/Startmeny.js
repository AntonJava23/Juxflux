const quizData = [
    {
      image: 'image1.jpg',
      song: 'song1.mp3'
    },
    {
      image: 'image2.jpg',
      song: 'song2.mp3'
    },
    // add more data here
  ];
  
  const startButton = document.getElementById('start-button');
  const imageGrid = document.getElementById('image-grid');
  const progressBar = document.getElementById('progress-bar');
  
  startButton.addEventListener('click', () => {
    // display images and songs here
    quizData.forEach((item, index) => {
      const img = document.createElement('img');
      img.src = item.image;
      img.alt = `Image ${index + 1}`;
      imageGrid.appendChild(img);
  
      img.addEventListener('click', () => {
        // play song here
        const audio = new Audio(item.song);
        audio.play();
      });
    });
  
    // display progress bar here
    const progressBarSpan = document.createElement('span');
    progressBarSpan.style.width = '0%';
    progressBar.appendChild(progressBarSpan);
  });