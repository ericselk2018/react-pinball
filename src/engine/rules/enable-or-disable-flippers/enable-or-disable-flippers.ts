import Rule from '@/engine/entities/Rule';

// Disable flippers while waiting for launch (mode select) or when no balls are in play.
const enableOrDisableFlippers: Rule = ({ game }) => {
	const { enableOrDisableFlippers, ballsInPlay, status } = game;

	enableOrDisableFlippers({ enable: !!ballsInPlay && status !== 'waitingForLaunch' });
};

export default enableOrDisableFlippers;
