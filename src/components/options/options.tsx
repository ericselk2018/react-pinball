import songs from '@/engine/const/songs/songs';
import Game, { OptionsMenuOption } from '@/engine/entities/Game';
import Blink from '../blink/blink';
import * as S from './options.styles';

interface Props {
	game: Game;
}

const Options = (props: Props) => {
	const { game } = props;
	const { selectedMenuOption, song, volume, showingMenuDetails, lights, highScores, players } = game;
	if (showingMenuDetails) {
		if (selectedMenuOption === OptionsMenuOption.viewHighScores) {
			return (
				<table>
					<thead>
						<tr>
							<th>Initials</th>
							<th>Score</th>
						</tr>
					</thead>
					<tbody>
						{highScores.map(({ initials, score }, index) => (
							<tr key={index}>
								<td>{initials}</td>
								<td>{score.toLocaleString()}</td>
							</tr>
						))}
					</tbody>
				</table>
			);
		} else if (selectedMenuOption === OptionsMenuOption.lastGame) {
			return (
				<table>
					<thead>
						<tr>
							<th>Initials</th>
							<th>Score</th>
						</tr>
					</thead>
					<tbody>
						{players.map(({ initials, score }, index) => (
							<tr key={index}>
								<td>{initials}</td>
								<td>{score.toLocaleString()}</td>
							</tr>
						))}
					</tbody>
				</table>
			);
		}
	}
	return (
		<S.Container>
			<S.Tip>Press Start to Exit</S.Tip>
			<S.Option>
				<Blink blinking={selectedMenuOption === OptionsMenuOption.viewHighScores} text="High Scores" />
			</S.Option>
			<S.Option>
				<Blink blinking={selectedMenuOption === OptionsMenuOption.lastGame} text="Last Game" />
			</S.Option>
			<S.Option>
				<Blink blinking={selectedMenuOption === OptionsMenuOption.song} text={songs[song]} />
			</S.Option>
			<S.Option>
				<Blink
					blinking={selectedMenuOption === OptionsMenuOption.volume}
					text={'Volume: ' + (volume * 100).toFixed(0) + '%'}
				/>
			</S.Option>
			<S.Option>
				<Blink blinking={selectedMenuOption === OptionsMenuOption.lights} text={'Lights: ' + lights} />
			</S.Option>
		</S.Container>
	);
};

export default Options;
