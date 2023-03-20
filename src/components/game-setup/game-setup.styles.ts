import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 100px;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.6);
`;

export const Tip = styled.div`
	opacity: 0.7;
	font-size: 0.8em;
	position: absolute;
	bottom: 30px;
	text-align: center;
`;

export const Option = styled.div``;

export const PlayerInitials = styled.div`
	display: flex;
	gap: 1em;
`;
