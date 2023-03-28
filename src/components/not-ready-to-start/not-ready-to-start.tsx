import Game from '@/engine/entities/Game';
import * as S from './not-ready-to-start.styles';

interface Props {
	game: Game;
}

const GameSetup = (props: Props) => {
	const { game } = props;
	const { error } = game;

	return <S.Container>{error}</S.Container>;
};

export default GameSetup;
