import Game from './Components/Game.js';
import $ from 'jquery';

document.addEventListener('DOMContentLoaded', () =>{
  const body = $('body');
  body.load('src/js/Components/StartScreen/StartScreen.html', () => {
    body.find($('button')).click(play);
  });
 
  function play(){
    body.find($('.start-screen')).remove();
    body.append($('<canvas id="canvas" width="700" height="700"></canvas>'));
    let game = new Game();
    game.startGame();
  }
});
