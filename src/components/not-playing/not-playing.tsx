import Game from '@/engine/entities/Game';
import GameSetup from '../game-setup/game-setup';
import Options from '../options/options';
import * as S from './not-playing.styles';

interface Props {
	game: Game;
}

const NotPlaying = (props: Props) => {
	const { game } = props;
	const { showingMenu } = game;
	return (
		<S.Container>
			<S.Video src="videos/attract.mp4" autoPlay={true} loop={true} muted={true} />
			{showingMenu === 'options' ? (
				<Options game={game} />
			) : (
				showingMenu === 'game-setup' && <GameSetup game={game} />
			)}
		</S.Container>
	);
};

export default NotPlaying;
