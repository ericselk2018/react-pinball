import modes from '@/engine/const/modes/modes';
import Game from '@/engine/entities/Game';
import GameStatus from '../game-status/game-status';
import Mode from '../mode/mode';
import Options from '../options/options';
import * as S from './playing.styles';

interface Props {
	game: Game;
}

const Playing = (props: Props) => {
	const { game } = props;
	const { currentMode, showingMenu } = game;

	return (
		<S.Container>
			<S.Inside dim={showingMenu === 'options'}>
				<GameStatus game={game} />
				<S.SlideContainer>
					{modes.map((mode, index) => (
						<Mode key={index} game={game} active={currentMode === mode} mode={mode} />
					))}
				</S.SlideContainer>
			</S.Inside>
			{showingMenu === 'options' && <Options game={game} />}
		</S.Container>
	);
};

export default Playing;
