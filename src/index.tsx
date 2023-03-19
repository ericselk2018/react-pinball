import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Blink from './components/blink/Blink';
import { initialsLength } from './engine/const/setup/setup';
import Game, { Selected } from './engine/entities/Game';
import fast, { requestPort } from './engine/hardware/fast/fast';
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

	// retry every 10 seconds if game fails to start
	useEffect(() => {
		if (!game) {
			const timeout = setTimeout(() => {
				location.reload();
			}, 10000);
			return () => clearTimeout(timeout);
		}
	}, [game]);

	if (game) {
		const {
			status,
			currentMode,
			players,
			selected,
			error,
			currentPlayer,
			currentModeStep,
			ballsInPlay,
			kickersWithBalls,
			modeStepButtonsHitThisTurn,
			pressedButton,
			unpressedButton,
		} = game;
		if (status === 'starting') {
			return <div>Starting...{error}</div>;
		}
		if (status === 'gameOver') {
			return <div>Game Over</div>;
		}
		if (status === 'waitingForLaunch') {
			return <div>Mode Select: {currentMode.name}</div>;
		}
		if (status === 'readyToPlay') {
			if (selected === Selected.numberOfPlayers) {
				return (
					<div>
						Number of Players: {players.length} {players.map((player) => player.initials).join(', ')}
					</div>
				);
			}
			const selectedPlayerIndex = Math.floor(selected / initialsLength);
			const selectedPlayer = players[selectedPlayerIndex];
			const { initials } = selectedPlayer;
			const selectedInitialIndex = selected % initialsLength;
			return <Blink blinking={true} text={initials} blinkingLetter={selectedInitialIndex} />;
		}
		if (status === 'waitingForNextPlayer') {
			return <div>Waiting For Next Player: {currentPlayer.initials}</div>;
		}
		if (status === 'playing') {
			return (
				<div>
					<table>
						<tbody>
							<tr>
								<td>Current Player</td>
								<td>{currentPlayer.initials}</td>
							</tr>
							<tr>
								<td>Current Player Balls</td>
								<td>
									{currentPlayer.ballsUsed} / {currentPlayer.ballsTotal}
								</td>
							</tr>
							<tr>
								<td>Current Player Score</td>
								<td>{currentPlayer.score}</td>
							</tr>
							<tr>
								<td>Current Mode</td>
								<td>{currentMode.name}</td>
							</tr>
							<tr>
								<td>Current Mode Step</td>
								<td>{currentModeStep?.name}</td>
							</tr>
							<tr>
								<td>Balls in Play</td>
								<td>{ballsInPlay}</td>
							</tr>
							<tr>
								<td>Kickers with Balls</td>
								<td>{kickersWithBalls.map((kicker) => kicker.button.name).join(', ')}</td>
							</tr>
							<tr>
								<td>Mode Step Buttons Hit This Turn</td>
								<td>{modeStepButtonsHitThisTurn.map((button) => button.name).join(', ')}</td>
							</tr>
							<tr>
								<td>Pressed Button</td>
								<td>{pressedButton?.name}</td>
							</tr>
							<tr>
								<td>Unpressed Button</td>
								<td>{unpressedButton?.name}</td>
							</tr>
						</tbody>
					</table>
					<pre>{JSON.stringify(game, undefined, '\t')}</pre>
				</div>
			);
		}
	}

	if (!game) {
		return <img onClick={requestPort} style={{ width: '100%' }} src="./images/startup.jpg" />;
	}

	return <pre>{JSON.stringify(game, undefined, '\t')}</pre>;
};

const container = document.getElementById('root');
if (container) {
	const root = createRoot(container);
	root.render(<App />);
}
