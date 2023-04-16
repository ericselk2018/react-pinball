import Game from '@/engine/entities/Game';
import * as S from './debug.styles';

const Debug = ({ game }: { game: Game }) => {
	const { history } = game;
	return (
		<S.Container>
			{history
				.slice(-30)
				.reverse()
				.map((line, index) => (
					<div key={index}>{line}</div>
				))}
		</S.Container>
	);
};

export default Debug;
