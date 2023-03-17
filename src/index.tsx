import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Blink from './components/blink/Blink';
import { initialsLength } from './engine/const/setup/setup';
import Game, { Selected } from './engine/entities/Game';
import fast from './engine/hardware/fast/fast';
import run from './engine/run/run';

let update: ((args: { game: Game }) => void) | undefined;
let _game: Game | undefined = undefined;

const onUpdate = (args: { game: Game }) => {
	_game = args.game;
	update?.(args);
};

run({ hardware: fast, onUpdate });

const App = () => {
	const [game, setGame] = useState(_game);

	useEffect(() => {
		update = ({ game }) => setGame({ ...game });
	});

	if (game) {
		const { status, currentMode, players, selected } = game;
		if (status === 'starting') {
			return <div>Starting...</div>;
		}
		if (status === 'gameOver') {
			return <div>Game Over</div>;
		}
		if (status === 'waitingForLaunch') {
			return <div>Mode Select: {currentMode.name}</div>;
		}
		if (status === 'readyToPlay') {
			if (selected === Selected.numberOfPlayers) {
				return <div>Number of Players: {players.length}</div>;
			}
			const selectedPlayerIndex = Math.floor(selected / initialsLength);
			const selectedPlayer = players[selectedPlayerIndex];
			const { initials } = selectedPlayer;
			const selectedInitialIndex = selected % initialsLength;
			return <Blink blinking={true} text={initials} blinkingLetter={selectedInitialIndex} />;
		}
		if (status === 'waitingForNextPlayer') {
			return <div>Waiting For Next Player</div>;
		}
	}

	return <pre>{JSON.stringify(game, undefined, '\t')}</pre>;
};

const container = document.getElementById('root');
if (container) {
	const root = createRoot(container);
	root.render(<App />);
}
