import Game from '@/engine/entities/Game';
import Mode from '@/engine/entities/Mode';
import { useRef, useEffect } from 'react';
import Blink from '../blink/blink';
import * as S from './mode.styles';

interface Props {
	game: Game;
	mode: Mode;
	active: boolean;
}

const Mode = (props: Props) => {
	const { game, active, mode } = props;
	const { currentModeStep, status, modeStepButtonsHitThisTurn, kickersWithBalls, showingMenu, volume } = game;
	const { name, steps } = mode;
	const modeComplete = !currentModeStep;
	const waitingForLaunch = status === 'waitingForLaunch';
	const videoElement = useRef<HTMLVideoElement>(null);
	const selectingMode = waitingForLaunch && !showingMenu;

	useEffect(() => {
		if (videoElement.current) {
			videoElement.current.volume = volume;
		}
	}, [volume]);

	useEffect(() => {
		if (videoElement.current) {
			videoElement.current.currentTime = 0;
			if (active && waitingForLaunch) {
				videoElement.current.play();
			} else {
				videoElement.current.pause();
			}
		}
	}, [active, waitingForLaunch]);

	return (
		<S.Container active={active}>
			<S.Top>
				<S.Name complete={modeComplete}>
					<Blink blinking={selectingMode} text={name} />
				</S.Name>
			</S.Top>
			<S.Bottom>
				<S.Left>
					<S.Steps>
						{steps.map((step, index) => {
							const { name, buttons, count } = step;
							const completedButtons = buttons.filter((button) =>
								modeStepButtonsHitThisTurn.some((b) => b.name === name && b.id === button.id)
							);
							return (
								<S.Step
									complete={completedButtons.length === count}
									active={selectingMode || currentModeStep?.name === name}
									key={index}
								>
									<S.StepName>{name}</S.StepName>
									<S.StepImages>
										{buttons.map((aSwitch, index) => {
											const { image, id } = aSwitch;
											const complete = completedButtons.some(
												(completedSwitch) => completedSwitch.id === id
											);
											const available = !kickersWithBalls.some(
												(kickerWithBall) => kickerWithBall.button.id === id
											);
											return (
												<S.StepImage key={index} complete={complete} available={available}>
													<img src={image} />
												</S.StepImage>
											);
										})}
									</S.StepImages>
								</S.Step>
							);
						})}
					</S.Steps>
				</S.Left>
				<S.VideoContainer>
					<S.Video ref={videoElement} src={mode.video} autoPlay={true} />
				</S.VideoContainer>
			</S.Bottom>
		</S.Container>
	);
};

export default Mode;
