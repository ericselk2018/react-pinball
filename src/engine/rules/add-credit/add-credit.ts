import { coinSlotButton } from '@/engine/const/buttons/buttons';
import Rule from '@/engine/entities/Rule';

// Add credit when coin inserted
const addCredit: Rule = ({ game }) => {
	const { pressedButton, log } = game;
	if (pressedButton?.id === coinSlotButton.id) {
		game.credits++;
		log(`credits increased to ${game.credits}`);
	}
};

export default addCredit;
