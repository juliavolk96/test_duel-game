# Duel Game

## Description
"Duel" is a simple game where two heroes battle each other on a rectangular Canvas field. Each hero is represented as a circle, and they shoot spells at each other. The game field is implemented using pure Canvas and React, without any external libraries.

This project was initiated on August 17, 2024, and completed on August 21, 2024.

You can try out the game live on GitHub Pages: [Duel Game](https://juliavolk96.github.io/test_duel-game/)


## Features
- Game Field: A rectangular Canvas field with two heroes. 
- Heroes: Two circles that move up and down on opposite sides of the screen. 
- Movement: Heroes bounce off the edges of the screen and change direction. 
- Shooting: Heroes shoot spells at each other. Spells disappear upon hitting an opponent, and a hit is recorded. 
- Cursor Repulsion: Heroes repel from the mouse cursor as if it were a boundary. 
- Menu: When a hero is clicked after pausing, a menu appears allowing the modification of spell color, movement speed, and shooting frequency. 
- Settings: The menu allows customizing spell color, movement speed, and shooting frequency for each hero. 

## Technologies Used
- React
- Canvas API
- HTML5
- CSS

## Issues and Limitations

### Clicking on the Character and Cursor Repulsion

During development, there was an issue with implementing two functionalities simultaneously: 

1. Cursor Repulsion: Heroes need to repel from the mouse cursor, which requires continuous tracking of the cursor position and calculating the repulsion direction. 
2. Menu: Clicking on a character should open a menu to change its settings. 
These functionalities proved to be mutually incompatible because tracking the cursor and handling user interactions required constant updates and management of game state. This created conflicts between event handling and repulsion logic. 

To ensure the stable operation of both features, it was decided to implement character clicks only after pausing the game. Thus, clicking on the hero when the game is paused brings up the menu for modifying the hero's settings. This solution ensures game stability and avoids conflicts between functionalities. 