# React Pinball

## Get Started

### Install NodeJS with NPM

NodeJS and NPM required, [https://nodejs.org/en/download](download here).

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

Then click anywhere in the browser window. A prompt should open asking you to select a port. Make sure you have [https://fastpinball.com/docs/](figured out which one is the NET processor) (usually the one with the lowest number, but not always) and select that one. Now reload the page (F5).

### All Done!

You should now be looking at the game running in your browser.

### Ooops, this doesn't work

Unless your physical hardware is identical to mine, this game will not actually work. It isn't designed for everyone, just for me and one of my games. You will need to modify things for your game.

### What if I don't have a pinball machine?

Find the code that looks like this: run({hardware: fast}), and change "fast" to "keyboard" (and update imports). Then go look at keyboard.ts to see what you can do with different keystrokes to emulate hardware and see how the UI reacts. This is not a virtual pinball game that you can play and have fun with without hardware, this is just a way to play with the code and see how things work when you don't have a physical pinball machine yet.

### What if my machine isn't using FAST Neuron controller?

You can create a new file like fast.ts to support whatever hardware you have. It just needs to implement the Hardware interface, and it can be any code (that runs in Chrome) you want in that file -- you could make some totally random virtual hardware for example, or just some minor changes to the serial commands to make it work with FAST Nano or other serial based pinball hardware.

## Design Notes

lmao, you really think I'm going to write documentation beyond getting started? Go figure it out yourself!

### YAGNI

If you see code in here that isn't being used, I just forgot to delete it. I don't believe in having any unused code, or writing any code that I don't yet need. If I don't need it today, I don't need it tomorrow (until I do).

### KISS

Keep it simple stupid. I'm stupid, so I write stupid code, but this is a good thing if you are also stupid, because maybe you will understand it. Stop learning, you were born smart enough, and go play pinball!
