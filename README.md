# Inconvenience The Dealer

# Technologies used
For this project, I used html, js, and css. In addition, I also utilized Materialize for the styling of my page, and the sweet alerts library for styling my prompts and alerts. For my card images, I found a set of cards off of google and implemented them into my game; each card had an individual image, I didn't have to use a sprite sheet

# Approach
My process essentially followed the recommended guidelines for this project. First, after I thought of a game, I began wireframing and semi-pseudocoding it. After that, I began coding the logic of my game. I split this into two steps, the first being creating a deck of cards and appending the drawn card to the correct area on my game board. Once I (finally) had this done, I moved to the actual play logic of my game, which entailed guessing the top card, updating the current dealer and current player, and then keeping track of each player's points. After that, I moved onto styling my page

# Challenges
I ran into some problems in attempting to retrieve the value of a pulled card, compare it to the player's guess, and then append it to its correct area on the board. To do all of this, I had to create multiple work-arounds, such as giving every card two separate values (one for its face value and one for its index in the deck). It took me a while (and lots of testing!) to finally figure this out, but once I got my cards to correctly pull from the deck and show on the board, it felt extremely rewarding.

# Future features
I definitely plan on implementing some future functionality. That functionality includes:
<br><br>
• Implementing a reset button
<br><br>
• Option to play with more than 1 deck (for groups 6+)
<br><br>
• Functional nav links
<br><br>
• General styling. Only spent one day on this, so definitely plan on sprucing it up when I get the chance
