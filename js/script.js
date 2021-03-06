var selectedGameId = null;

function start(){
    recreateGameList();
    captureKeyboard();
}

function captureKeyboard(){
    document.onkeydown = function(e) { 
        switch(e) {
            case e.which == 69: //e key press
                playGame();
                break;
            case e.which == 88: //x key press
                exitPlayScreen();
                break;
            default:
                break;
        }
    }
}

function recreateGameList() {
    document.getElementById("game_frame").src = "";
	document.getElementById("select_screen").style.display = "block";
	document.getElementById("play_screen").style.display = "none";
    document.getElementById("game_select").innerHTML = "";
    
	var shuffledGames = makeShuffledGameList();
	for(var i in shuffledGames) {
		var gameId = shuffledGames[i];
		document.getElementById("game_select").appendChild( makeGameCard(gameId) );
	}
}

function makeShuffledGameList() {
	var list = [];
	for(var gameId in mixtape_games) {
		list.push(gameId);
	}
	list = shuffle(list);
	return list;
}

function shuffle(options) {
	var optionsShuffled = [];
	var optionsUnshuffled = options.slice();
	while(optionsUnshuffled.length > 0) {
		var i = Math.floor( Math.random() * optionsUnshuffled.length );
		optionsShuffled.push( optionsUnshuffled.splice(i,1)[0] );
	}
	return optionsShuffled;
}

function makeGameCard(gameId) {
	var game = mixtape_games[gameId];

	var div = document.createElement("div");
	div.onclick = function() {
		if(selectedGameId != gameId) {
			selectedGameId = gameId;
		}
		else {
			playGame(gameId);
		}
	};
	div.id = "card_" + gameId;
	div.classList.add("game_card");

	var title = document.createElement("h4");
	title.innerText = game.title;
	div.appendChild(title);

	var author = document.createElement("h5");
	author.innerText = game.author;
	div.appendChild(author);

	return div;
}

function playGame(gameId) {
    if (document.getElementById("play_screen").style.display == "none"){
        var game = mixtape_games[gameId];

        selectedGameId = gameId;

        document.getElementById("select_screen").style.display = "none";
        document.getElementById("play_screen").style.display = "block";

        var frame = document.getElementById("game_frame");
        frame.src = "";

        window.setTimeout(function(){
            frame.src = game.src;
            frame.focus();
        }, 200);
    }
}

function exitPlayScreen() {
    if (document.getElementById("play_screen").style.display == "block"){
        recreateGameList();

        selectGame(selectedGameId);
    }
}