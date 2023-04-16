import modes from '@/engine/const/modes/modes';
import { debonaireSong } from '@/engine/const/songs/songs';
import Game from '@/engine/entities/Game';
import LightShow from '@/engine/entities/LightShow';

export const testGame: Game = {
	update: jest.fn(),
	debug: false,
	isFreePlay: false,
	comboShotTracker: [],
	status: 'starting',
	ballsInPlay: 0,
	buttonsPressedThisTurn: [],
	credits: 0,
	currentMode: modes[0],
	currentModeStep: undefined,
	currentPlayer: {
		ballsTotal: 0,
		ballsUsed: 0,
		initials: '',
		score: 0,
	},
	enableOrDisableFlippers: jest.fn(),
	error: '',
	history: [],
	kickersWithBalls: [],
	log: jest.fn(),
	modeStepButtonsHitThisTurn: [],
	nextPlayer: jest.fn(),
	players: [],
	pressedButton: undefined,
	pressedButtons: [],
	selectedMenuOption: 0,
	startNextGame: jest.fn(),
	startTurn: jest.fn(),
	tapCoil: jest.fn(),
	turnStartTimeInMilliseconds: 0,
	unpressedButton: undefined,
	song: debonaireSong,
	showingMenu: undefined,
	volume: 0,
	showingMenuDetails: false,
	lights: 'on',
	addPlayer: jest.fn(),
	creditsNeeded: 0,
	creditsRequired: 0,
	shots: [],
	highScores: [],
	endGame: jest.fn(),
	updateLights: jest.fn(),
	secondsSinceSongStarted: 0,
	playSoundEffect: jest.fn(),
};

export const testLightShow: LightShow = {
	repeatAfterMilliseconds: 0,
	steps: [],
};

export const testAbortSignal = new AbortController().signal;
