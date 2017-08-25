$(function() {

  var players = [];
  function addPlayers(x) {
    console.log(x);
    for (var i = 0; i < x; i++) {
      players[i] = prompt(`Player ${i+1}, please enter your name`);
      var $playerName = $('<h6>').addClass(`${players[i]} playerSpace`)
      .text(`${players[i]}`)
      .appendTo('.players');
      var $playerTotal = $('<p>').addClass(`${players[i]}Total`)
      .text('0')
      .appendTo(`.${players[i]}`);
    }
  }

  function card(index, value, name, suit) {
    this.index = index;
  	this.value = value;
  	this.name = name;
  	this.suit = suit;
  }

  var cards = [];
  var played = [];
  function deck() {
    this.names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  	this.suits = ['Hearts','Diamonds','Spades','Clubs'];

    var count = 0;
    // creating 52 card deck
    for (let i = 0; i < this.suits.length; i++) {
      for (var j = 0; j < this.names.length; j++) {
        count++;
        cards.push(new card(count, j+1, this.names[j], this.suits[i]));
      }
    }
    return cards;
  }
  console.log(deck());

  function buildDeck() {
    for (var i = 0; i < cards.length; i++) {
      $('<img>').attr('src', `images/back.png`)
      .addClass('back-image')
      .appendTo('.deck')
    }

    var left = 0;
    var step = 0.2;
    var i = 0;
    $('.back-image').each(function() {
      $(this).css({'z-index' : i});
      $(this).css({'margin-left':left+'px'});
      $(this).css({'margin-top':0+'px'});
      left = left + step;
      i++;
    });
  }
  buildDeck();

  function getRandom() {
    return Math.floor(Math.random()*cards.length) + 1;
  }

  function shuffle() {
    var temp;
    for (var i = 0; i < cards.length; i++) {
      var random = getRandom() - 1;
      temp = cards[i];
      cards[i] = cards[random];
      cards[random] = temp;
    }
  }
  shuffle();

  function deal() {
    if (cards.length > 0) {
      return cards.shift();
    } else {
      return null;
    }
  }

  // adding image and unique class to each card, then using that to append to correct container
  function appendCard() {
    for (var i = 0; i < cards.length; i++) {
      var $current = $('<img>').attr('src', `images/${cards[i].index}.png`)
      .addClass('card img'+i);
      if(i === 0) {
        $current.appendTo('#'+cards[i].name)
        .hide()
        .fadeIn(1500);
        played.push(cards[i]);
        console.log(played);
        deal();
      }
    }
  }

  var wins = 0;
  var index = 1;
  var start = 0;
  function playGame() {
    if (start > players.length-1) {
      start = 0;
    }
    var dealer = players[start];
    if (index > players.length-1) {
      index = 0;
    }

    if(players.indexOf(dealer) === index) {
      index++;
    }

    if (cards.length > 0) {
      // var guessCard = prompt(`${players[index]}, guess a card (ie, A, 2, 3, ..., K)`);

      function swalCallback(inputValue) {
        var guessCard = inputValue;
        if (guessCard === 'A' || guessCard === 'a') {
          guessCard = 1;
        }
        if (guessCard === '10') {
          guessCard = 10;
        }
        if (guessCard === 'J' || guessCard === 'j') {
          guessCard = 11;
        }
        if (guessCard === 'Q' || guessCard === 'q') {
          guessCard = 12;
        }
        if (guessCard === 'K' || guessCard === 'k') {
          guessCard = 13;
        }

        if (cards[0].value == guessCard) {
          swal({
            title: "Correct!",
            text: `${dealer} takes 4 points`,
            imageUrl: "images/thumbs-up.jpg"
          });
          appendCard();
          tallyPoints(dealer, 4);
          index++;
          wins = 0;
          return;
        } if (cards[0].value > guessCard) {
          function swalCallbackHigh(inputValueHigh) {
            highLow(inputValueHigh);
          }
        } if (cards[0].value < guessCard) {
          function swalCallbackLow(inputValueLow) {
            highLow(inputValueLow);
          }
        }

        function highLow(x) {
          var guessHL = x;
          // x = guessL;
          if (guessHL === 'A' || guessHL === 'a') {
            guessHL = 1;
          }
          if (guessHL === '10') {
            guessHL = 10;
          }
          if (guessHL === 'J' || guessHL === 'j') {
            guessHL = 11;
          }
          if (guessHL === 'Q' || guessHL === 'q') {
            guessHL = 12;
          }
          if (guessHL === 'K' || guessHL === 'k') {
            guessHL = 13;
          }

          if (cards[0].value != guessCard ) {
            var diff = Math.abs(guessHL-cards[0].value);
          }
          if (cards[0].value == guessHL) {
            swal({
              title: "Correct!",
              text: `${dealer} takes 2 points`,
              imageUrl: "images/thumbs-up.jpg"
            });
            appendCard();
            tallyPoints(dealer, 2);
            index++;
            wins = 0;
          } else {
            swal({
              title: `Nope. The card was: ${cards[0].name}`,
              text: `${players[index]} takes ${diff} points`,
              imageUrl: "images/thumbs-down.jpg"
            });
            appendCard();
            tallyPoints(players[index], diff);
            index++;
            wins++;
          }

          if (wins == 3) {
            wins = 0;
            start++;
            if (start > players.length-1) {
              start = 0;
            }
            $('.current-dealer').text(`${players[start]} is the current dealer`);
          }
        }

        // callbacks for high or low prompt
        if (cards[0].value > guessCard) {
          swal({
            title: 'Higher',
            text: "Guess again",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top"
          }, swalCallbackHigh);
        }
        if (cards[0].value < guessCard) {
          swal({
            title: 'Lower',
            text: "Guess again",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top"
          }, swalCallbackLow);
        }
      }

      swal({
        title: `${players[index]}`,
        text: "Guess a card (A, 2, 3, ..., K)",
        type: "input",
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top"
      }, swalCallback);

    }
    if (cards.length <= 1) {
      $('.deck').hide();
    }
  }


  function tallyPoints(currentPlayer, points) {
    var $total = 0;
    $total = Number($(`.${currentPlayer}Total`).text());
    $total += points;
    $(`.${currentPlayer}Total`).empty().append($total);
  }

  $('.back-image').click(function() {
    playGame();
  });

  $('.dropdown-content li a').click(function() {
    var $numPlayers = $(this).text();
    console.log($numPlayers);
    addPlayers($numPlayers);
    $('.current-dealer').text(`${players[0]} is the current dealer`)
    .appendTo('.dealer-div');
  })

  // Konami code for PG-13 version
  var keys = [];
  var konami = "38,38,40,40,37,39,37,39";
  $(document).keydown(function(e) {
    keys.push(e.keyCode);
    if (keys.toString().indexOf(konami) >= 0) {
      $(document).unbind('keydown',arguments.callee);
      $('.title').text('Fuck The Dealer');
      $('.header').text('The game that gets you fucked up');
      $('.instructions-text').empty();
      $('<p>').text("The aim of this game is to get really drunk. Since you're in the cool version of the game, the instructions are gonna be catered to you.")
      .appendTo('.instructions-text');
      $('<p>').text("One player starts as the dealer, another player as the person guessing. Got it? Good.")
      .appendTo('.instructions-text');
      $('<p>').text("If the person guessing gets it wrong, they get to guess again. Yay, we love second chances! They also get a hint this time because as the name implies, fuck the dealer.")
      .appendTo('.instructions-text');
      $('<p>').text("Here's where the game gets fun. If the person gets it wrong again, they have to drink for the number of seconds between the value of the card and their guess.")
      .appendTo('.instructions-text');
      $('<p>').text("However, if the player guesses correctly on their first try, the dealer has to drink for 4 seconds. If they get it on the second try, the dealer drinks for 2.")
      .appendTo('.instructions-text');
      $('<p>').text("The dealer keeps dealing and drinking until 3 people in a row mess up. If someone guesses a card and all 4 are already on the board, call them a dipshit and make them finish their drink")
      .appendTo('.instructions-text');
    }
  });
});
