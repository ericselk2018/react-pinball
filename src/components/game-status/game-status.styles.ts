import styled from 'styled-components';

export const Container = styled.div``;

export const Players = styled.div`
	position: relative;
	display: flex;
	flex-wrap: wrap;
	font-size: 80px;
	gap: 200px;
	padding: 0 50px;
`;

export const Player = styled.div(
	({ active }: { active: boolean }) => `
	flex: 1;
	display: flex;
	justify-content: space-between;
	opacity: ${active ? '1' : '0.5'};
`
);

export const Score = styled.div``;

export const Balls = styled.div`
	display: flex;
	align-items: center;
	gap: 0.2em;

	img {
		display: block;
		width: 0.8em;
		height: auto;
	}
`;

export const CurrentPlayerInitials = styled.div`
	position: absolute;
	left: 0;
	right: 0;
	text-align: center;
`;

export const Shots = styled.div`
	text-align: center;
	height: 200px;
	font-size: 50px;
	position: relative;
	overflow: hidden;
`;

export const Shot = styled.div(
	({ styleNumber }: { styleNumber: number }) => `
	position: absolute;
	left: ${styleNumber === 0 ? '0' : styleNumber === 1 ? '1000px' : '-1000px'};
	right: 0;
	bottom: 0;
	animation: slide-up 2s forwards;
	color: ${styleNumber === 0 ? 'aquamarine' : styleNumber === 1 ? 'pink' : 'lime'};

	@keyframes slide-up {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(-200px);
		}
	}
`
);
