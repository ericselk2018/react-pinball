import styled from 'styled-components';

export const Container = styled.div(
	({ active }: { active: boolean }) => `
	display: flex;
	flex-direction: column;
	transform: translateX(${active ? '0' : '-100%'});
	transition: transform 1s;
	overflow: hidden;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
`
);

export const Top = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Name = styled.div(
	({ complete }: { complete: boolean }) => `
	font-size: 100px;
	text-align: center;
	text-decoration: underline;
	${complete ? 'color: lime;' : ''};
	transition: color 3s;
`
);

export const Bottom = styled.div`
	display: flex;
	align-items: center;
`;

export const Left = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
`;

export const Steps = styled.div`
	flex: 1;
	font-size: 70px;
	line-height: 0.8;
	padding: 0 40px;
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

export const StepName = styled.div`
	text-align: center;
	width: 210px;
	overflow: hidden;
`;

export const Step = styled.div(
	({ complete, active }: { complete: boolean; active: boolean }) => `
	opacity: ${active ? '1' : '0.5'};
	display: flex;
	align-items: center;
	gap: 40px;
	${complete ? 'color: lime;' : ''}
	transition: opacity 3s, color 3s;
`
);

export const StepImages = styled.div`
	display: flex;
	gap: 10px;
`;

export const StepImage = styled.div(
	({ complete, available }: { complete: boolean; available: boolean }) => `
	position: relative;
	overflow: hidden;
	border-radius: 20px;

	:after {
		content: '\u2713';
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 80px;
		font-weight: normal;
		color: ${complete ? 'lime' : 'red'};
		text-shadow: -1px 1px 0 black, 1px 1px 0 black, 1px -1px 0 black, -1px 1px 0 black;
		-webkit-text-stroke: 1px black;
		zoom: 2;
		opacity: ${complete || !available ? '1' : '0'};
		transition: all 3s;
		background-color: rgba(0,0,0,0.5);
	}

	img {
		display: block;
		width: 150px;
		height: 150px;
	}
`
);

export const VideoContainer = styled.div`
	position: relative;

	::after {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 50px;
		content: '';
		background-image: linear-gradient(black, transparent);
	}

	::before {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: 50px;
		content: '';
		background-image: linear-gradient(to right, black, transparent);
	}
`;

export const Video = styled.video`
	width: 100%;
`;
