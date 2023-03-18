# React Pinball

> **Warning**
> If you run this code as-is while connected to FAST hardware, it will send commands that could damage your hardware.
> This is because your hardware isn't the same as mine, so it could send commands that will configure or
> trigger the wrong coils in the wrong ways, which could start a fire or cause serious injury including death.

## Get Started

### Install NodeJS with NPM

NodeJS and NPM required, [download here](https://nodejs.org/en/download).

### Install NPM Packages and Run Webpack Dev Server

```bash
npm install
npm run start
```

### Connect to Hardware

Connect USB port on host computer to FAST Neuron Controller.

### Open Chrome

Open [http://localhost:3000](http://localhost:3000) with Chrome web browser (no other browsers supported, get Chrome).

### Grant Permission (one time only)

The first time you will need to tell Chrome that this site is allowed to connect to the FAST serial port. To do this, open the console (F12) and enter this command and press enter:

```bash
window.onclick = () => {navigator.serial.requestPort({filters: [{usbVendorId: 11914, usbProductId: 4155}]})}
```

Then click anywhere in the browser window. A prompt should open asking you to select a port. Make sure you have [figured out which one is the NET processor](https://fastpinball.com/docs/) (usually the one with the lowest number, but not always) and select that one. Now reload the page (F5).

### All Done!

You should now be looking at the game running in your browser.

### Ooops, this doesn't work

Unless your physical hardware is identical to mine, this game will not actually work. It isn't designed for everyone, just for me and one of my games. You will need to modify things for your game.

### What if I don't have a pinball machine?

Find the code that looks like this: run({hardware: fast}), and change "fast" to "keyboard" (and update imports). Then go look at keyboard.ts to see what you can do with different keystrokes to emulate hardware and see how the UI reacts. This is not a virtual pinball game that you can play and have fun with without hardware, this is just a way to play with the code and see how things work when you don't have a physical pinball machine yet.

### What if my machine isn't using FAST Neuron controller?

You can create a new file like fast.ts to support whatever hardware you have. It just needs to implement the Hardware interface, and it can be any code (that runs in Chrome) you want in that file -- you could make some totally random virtual hardware for example, or just some minor changes to the serial commands to make it work with FAST Nano or other serial based pinball hardware.

## Design Notes

### YAGNI

If you see code in here that isn't being used, I just forgot to delete it. I don't believe in having any unused code, or writing any code that I don't yet need. If I don't need it today, I don't need it tomorrow (until I do).

### KISS

Keep it simple stupid. I'm stupid, so I write stupid code, but this is a good thing if you are also stupid, because maybe you will understand it. Stop learning, you were born smart enough, and go play pinball!

## Game Flow

### Base

At any time, holding down the Select button for more than 1 second will toggle mute.

Any time while not playing, holding down the Start button for more than 1 second will start a "Free Play" game.

### Boot

Mostly wait for all switches to be in normal state. Only attempted automated cleanup will be to kick any balls out of kickers, since that is the only expected common problem that is easy to resolve. Any other stuck ball issues will require service to resolve. Possibly add a way to force a ball to eject in this mode to allow using a ball to unstick another ball without glass removal, if balls get stuck much.

During boot UI might just display issues in large text like "left rollover pressed" or "no ball in slot 3". In most cases boot should be so fast not worth spending time on much else.

This mode will also shortly run between each new game, not just on initial startup, to make sure each game starts in the correct default state.

### Attract Mode

UI showing various video clips full screen. Music playing full songs. Light show playing.

Select button shows a slide with options that flippers can change:

-   View High Scores

*   Flippers toggle between scores and option list slide

-   View Last Game

*   Flippers toggle between last game stats and option list slide

-   Song Select

-   Volume

-   Lights (on/dim/off)

Pressing select moves through each option above. Selected option flashes/blinks.

Pressing Start while options slide is showing will hide it. Pressing Start while not open will start Game Setup mode.

### Game Setup

Select number of players and set initials.

UI also displays number of credits with "insert coin" or "press start" (when enough credits) info.

Press select to toggle through setup options and use flippers to adjust options.

Has a "Free Play" option which starts a single player game without any modes and does not require or use any credits, and always sets the initials to "MIA".

After 10 seconds of inactivity returns to Attract Mode.

### Playing & Mode Select

The same UI is shared during playing and mode select. The only difference is mode select happens while only 1 ball in play and that ball is sitting on the plunger switch ready to launch.

Playing UI displayed which contains sections:

-   Top line with players scores, initials, ball counts, with current player highlighted.

-   Next section reserved for dynamic status updates. Shows points earned, combo shot bonuses, tasks completed. Info not displayed for very long, slightly longer for more important achievements.

-   Lower Left corner displays to do list, so player knows what tasks they need to do and what they have completed for current mode.

*   In Free Play mode, this section just displays some generic "free play" image/text.

-   Lower right corner shows video clips. During mode select the clip changes as you cycle through modes and shows a little clip related to the mode. During game play videos related to completed tasks will play as each task is complete, short clips.

When game ends, return to Attract Mode, but default to showing slide with previous game stats.

While playing, Start button is used to eject ball at start of each new players turn. This helps make it obvious when it is the next turn vs just another ball for same player. In a single-player game, Start button is not used.

While playing, Select button skips song.

During mode select, pressing Select opens options menu (same as Attract Mode). Pressing Start returns to mode select. Launching ball will also close options menu since that will cause mode select to end.

During mode select, flippers are used to change modes. In Free Play mode flippers do nothing during mode select.

## Rules

### Modes

All modes are a collection of 1 to 3 steps. Each step has 1 to 4 tasks. Each task has a related target switch. Each target switch has an image related to it, as well as 1 or more video clips. The image is displayed on the UI and also on the playfield with an LED to indicate active targets (flashing) and complete targets (lit). A video clip (selected randomly) plays when task switch is hit (task complete).

### Combo Shots

Shots are a collection of 2 or more switches. Each shot has a flag for ordered/unordered, if ordered the switches must be hit in order. Each shot has a dificulty value, a multiplier used to calculate points earned if shot is completed. Each shot has 0 or more video clips that will be played (1 selected randomly) if shot is completed. Each shot has a name that will be displayed in the dynamic status update area of the UI if shot is completed.

### Single Shots

Each switch has a dificulty value, a multiplier used to calculate points. Points are earned each time a switch is hit.
