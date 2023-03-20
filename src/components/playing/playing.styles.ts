import styled from 'styled-components';

export const Container = styled.div``;

export const Inside = styled.div(
	({ dim }: { dim: boolean }) => `
	background-color: black;
	color: white;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	display: flex;
	flex-direction: column;
	opacity: ${dim ? '0.1' : '1'};
`
);

export const SlideContainer = styled.div`
	flex: 1;
	position: relative;
`;
