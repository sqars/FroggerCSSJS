import DrawFunctions from '../../Utilities/DrawFunctions.js';
import $ from 'jquery';
import {
    firebaseRef
} from '../../Firebase/Firebase.js';

export default class EndScreen {
    constructor() {
        this.validName = true;
        this.gameScore = null;
        this.playerScores = [];
    }

    sendClickHandler() {
        const playerName = $('input').val();
        this.validName = playerName.length > 3 ? true : false;
        if (this.validName) {
            let save = this.saveScore(playerName);
            let fetch = this.fetchPlayersScores();
            Promise.all([save, fetch]).then((responses) => {
                this.savePlayerScores(responses[1].val());
                this.showPlayerScoresScreen();
            });
        }
    }

    saveScore(playerName) {
        const player = {
            name: playerName,
            score: this.gameScore
        };
        return firebaseRef.child('players').push().set(player);
    }

    fetchPlayersScores() {
        return firebaseRef.child('players').once('value');
    }

    savePlayerScores(data) {
        this.playerScores = [];
        for (let key in data) {
            this.playerScores.push(data[key]);
        }
        this.playerScores.sort((a, b) => {
            return -a.score + b.score;
        });
    }

    showGameOverScreen(gameScore) {
        this.gameScore = gameScore;
        const body = $('body');
        $(document).off('keydown');
        body.find($('#canvas')).remove();
        this.fetchPlayersScores().then((response) => {
            this.savePlayerScores(response.val());
            if (gameScore >= this.playerScores[5].score) {
                body.load('src/js/Components/EndScreen/EndScreen.html', () => {
                    body.find($('#score')).text(gameScore);
                    body.find($('button')).click(this.sendClickHandler.bind(this));
                });
            } else {
                this.showPlayerScoresScreen();
            }
        });
    }

    showPlayerScoresScreen() {
        const body = $('body');
        body.find($('.end-screen')).remove();
        body.load('src/js/Components/EndScreen/PlayerScores.html', () => {
            const endScreen = body.find($('.end-screen'));
            const playAgainBtn = $('<button>').text('Play Again').click(() => {
                location.reload();
            });
            const max = this.playerScores.length > 6 ? 6 : this.playerScores.length;
            for (let i = 0; i < max; i++) {
                let div = $('<div>').addClass('score');
                div.append($('<h3>').text('Name: ' + this.playerScores[i].name));
                div.append($('<h3>').text('Score: ' + this.playerScores[i].score));
                endScreen.append(div);
            }
            endScreen.append(playAgainBtn);
        });
    }
}
