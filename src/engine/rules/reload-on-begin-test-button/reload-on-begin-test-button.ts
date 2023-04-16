import { beginTestButton } from '@/engine/const/buttons/buttons';
import Rule from '@/engine/entities/Rule';

const reloadOnBeginTestButton: Rule = ({ game }) => {
	const { pressedButton } = game;
	if (pressedButton === beginTestButton) {
		location.reload();
	}
};

export default reloadOnBeginTestButton;
