# Flappy-Bird-Game
🐦 (Mini Project)
A simple, browser-based clone of the classic Flappy Bird game built using vanilla HTML, CSS, and JavaScript. This project demonstrates basic game development concepts such as DOM manipulation, collision detection, and state management.

🎮 Demo
✨ Features
Game Physics: Implements gravity and jump mechanics for the bird.

Collision Detection: Real-time detection for collisions with pipes and the ground/ceiling.

Dynamic Obstacles: Pipes are generated randomly with varying gap heights.

Score System: Tracks current score as the player successfully passes pipes.

Sound Effects:

Background/Start sound

Scoring sound

Game Over sound

Animation: Bird sprite changes on key press (flapping) and on game over.

Responsive Design: optimized for desktop and adapts to smaller screens (up to 1080px).

🛠️ Technologies Used
HTML5: Structure of the game board and assets.

CSS3: Styling, animations, and background handling.

JavaScript (ES6): Game logic, event listeners, and DOM manipulation.

🕹️ How to Play
Start the Game: Press Enter to begin.

Controls:

Press Arrow Up ↑ or Spacebar to flap (fly up).

Objective: Navigate through the gaps in the green pipes without hitting them or touching the ground.

Game Over: If you crash, the game ends. Press Enter to restart.

📂 Project Structure
The project files are organized as follows:

Plaintext

MINI PROJECT/
├── index.html              # Main HTML entry point
├── style.css               # Game styling and layout
├── script.js               # Game logic and physics
├── images/                 # Visual assets
│   ├── background-img3.jpg # Main Game Background
│   ├── flappy bird 1.png   # Bird Idle
│   ├── flappy bird 2.png   # Bird Flapping
│   ├── flappy bird 3.png   # Bird Crash
│   └── favicon 1.ico       # Browser Icon
└── sounds effect/          # Audio assets
    ├── Gamestart.mp3
    ├── point.mp3
    └── die.mp3
    
   🔮 Future Improvements
Add a "High Score" feature using LocalStorage.

Add a mute button for sound effects.

Add mobile touch controls for playing on smartphones.

Implement a "Get Ready" transition screen.
