import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import NotPlaying from './components/not-playing/not-playing';
import Playing from './components/playing/playing';
import Game from './engine/entities/Game';
import fast, { requestPort } from './engine/hardware/fast/fast';
import keyboard from './engine/hardware/keyboard/keyboard';
import run from './engine/run/run';
import * as S from './index.styles';

declare const global: {
	production: boolean;
};

let update: ((args: { game: Game }) => void) | undefined;
let _game: Game | undefined = undefined;

const onUpdate = (args: { game: Game }) => {
	_game = args.game;
	update?.(args);
};

run({ hardware: global.production ? fast : keyboard, onUpdate });

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
		const { status } = game;
		if (status === 'playing' || status === 'waitingForLaunch' || status === 'waitingForNextPlayer') {
			return <Playing game={game} />;
		} else {
			return <NotPlaying game={game} />;
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
	root.render(
		<S.Container>
			<App />
		</S.Container>
	);
}
