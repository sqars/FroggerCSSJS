import $ from 'jquery';
import {
    firebaseRef
}
from '../../Firebase/Firebase.js';
export default class EndScreen {

    constructor() {
        this.gameScore = null;
        this.playerScores = [];
        this.body = $('body');
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

    updatePlayerScores(data) {
        this.playerScores = [];
        for (let key in data) {
            this.playerScores.push(data[key]);
        }
    }

    sendClickHandler() {
        const playerName = $('input').val();
        if (this.validateName(playerName)) {
            let save = this.saveScore(playerName);
            let fetch = this.fetchPlayersScores();
            Promise.all([save, fetch]).then((responses) => {
                this.updatePlayerScores(responses[1].val());
                this.sortPlayerScores();
                this.showPlayerScoresScreen();
            });
        } else {
            this.showValidateError();
        }
    }

    showGameOverScreen(gameScore) {
        this.gameScore = gameScore;
        $(document).off('keydown');
        this.fetchPlayersScores().then((response) => {
            this.updatePlayerScores(response.val());
            this.sortPlayerScores();
            if (gameScore >= this.playerScores[5].score) {
                this.showEndInputScreen();
            } else {
                this.showPlayerScoresScreen();
            }
        });
    }

    showEndInputScreen() {
        this.body.find($('#canvas')).remove();
        this.body.load('src/js/Components/EndScreen/EndScreen.html', () => {
            this.body.find($('#score')).text(this.gameScore);
            this.body.find($('button')).click(this.sendClickHandler.bind(this));
        });
    }

    showPlayerScoresScreen() {
        this.body.find($('.end-screen')).remove();
        this.body.load('src/js/Components/EndScreen/PlayerScores.html', () => {
            this.createScoreView();
            this.body.find($('button')).click(() => location.reload());
        });
    }

    createScoreView() {
        const scores = this.body.find($('div#scores'));
        const max = this.playerScores.length > 6 ? 6 : this.playerScores.length;
        for (let i = 0; i < max; i++) {
            let div = $('<div>').addClass('score');
            div.append($('<h3>').text('Name: ' + this.playerScores[i].name));
            div.append($('<h3>').text('Score: ' + this.playerScores[i].score));
            scores.append(div);
        }
    }

    showValidateError() {
        this.body.find('.valid-name-error').error.show();
    }

    sortPlayerScores() {
        this.playerScores.sort((a, b) => {
            return -a.score + b.score;
        });
    }

    validateName(name) {
        return name.length > 3 ? true : false;
    }
}