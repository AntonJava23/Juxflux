const restartButton = document.getElementById('restart-button');
const startmenutext = document.getElementById('start-menu-text');
document.getElementById("restart-button").addEventListener('click', function() {
    // Reset the game and create a new game object
    window.location.href = "Startmeny.html"
   
  });

    // Show the start menu text
    document.getElementById("start-menu-text").addEventListener('click', function(){
      window.location.href = "Startmeny.html"
    });