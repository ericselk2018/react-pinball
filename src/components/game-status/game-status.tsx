import Game from '@/engine/entities/Game';
import * as S from './game-status.styles';

interface Props {
	game: Game;
}

// Displays game status: Points, active player, shots hit, ball info.
const GameStatus = (props: Props) => {
	const { game } = props;
	const { players, currentPlayer, shots } = game;

	return (
		<S.Container>
			<S.Players>
				<>
					{players.map((player, index) => {
						const { score, ballsUsed, ballsTotal } = player;
						return (
							<S.Player key={index} active={player === currentPlayer}>
								<S.Score>{score.toLocaleString()}</S.Score>
								<S.Balls>
									<img src="images/ball.png" />
									<div>
										{ballsUsed}/{ballsTotal}
									</div>
								</S.Balls>
							</S.Player>
						);
					})}
					<S.CurrentPlayerInitials>{currentPlayer.initials}</S.CurrentPlayerInitials>
				</>
			</S.Players>
			<S.Shots>
				{shots.map((shot, index) => {
					const { name, points } = shot;
					return (
						index + 11 > shots.length && (
							<S.Shot key={index} styleNumber={index % 3}>
								+{points.toLocaleString()} {name}
							</S.Shot>
						)
					);
				})}
			</S.Shots>
		</S.Container>
	);
};

export default GameStatus;
