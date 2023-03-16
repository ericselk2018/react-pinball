import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Game from './engine/entities/Game';
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

	return <pre>{JSON.stringify(game, undefined, '\t')}</pre>;
};

const container = document.getElementById('root');
if (container) {
	const root = createRoot(container);
	root.render(<App />);
}
