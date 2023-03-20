import { initialsLength } from '@/engine/const/setup/setup';
import Game, { SelectedGameSetupMenuOption } from '@/engine/entities/Game';
import Blink from '../blink/blink';
import * as S from './game-setup.styles';

interface Props {
	game: Game;
}

const GameSetup = (props: Props) => {
	const { game } = props;
	const { selectedMenuOption, credits, players, creditsNeeded, creditsRequired } = game;
	const selectingNumberOfPlayers = selectedMenuOption === SelectedGameSetupMenuOption.numberOfPlayers;
	const selectedPlayerIndex = Math.floor(selectedMenuOption / initialsLength);
	const selectedInitialIndex = selectedMenuOption % initialsLength;

	return (
		<S.Container>
			<S.Option>
				Players: <Blink blinking={selectingNumberOfPlayers} text={players.length.toString()} />
			</S.Option>
			<S.Option>
				<S.PlayerInitials>
					{players.map((player, index) => (
						<div key={index}>
							<Blink
								blinking={selectedPlayerIndex === index}
								blinkingLetter={selectedInitialIndex}
								text={player.initials}
							/>
						</div>
					))}
				</S.PlayerInitials>
			</S.Option>
			<div>
				Credits: {credits}/{creditsRequired}
			</div>
			<div>
				{creditsNeeded === 1
					? 'Insert Coin'
					: creditsNeeded > 1
					? `Insert ${creditsNeeded} Coins`
					: 'Press Start'}
			</div>
		</S.Container>
	);
};

export default GameSetup;
