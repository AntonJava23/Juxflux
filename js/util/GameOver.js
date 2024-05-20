const restartButton = document.getElementById('restart-button');
document.getElementById("restart-button").addEventListener('click', function() {
    // Reset the game and create a new game object
    window.location.href = "index-branch2.html" 
  });

  const startmenutext = document.getElementById('start-menu-text');
    document.getElementById("start-menu-text").addEventListener('click', function(){
      window.location.href = "Startmeny.html"
    });

export default {
  name: "GameOver"
}

