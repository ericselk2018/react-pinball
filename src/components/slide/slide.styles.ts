import styled from 'styled-components';

export const Container = styled.div(
	({ active }: { active: boolean }) => `
	transform: translateX(${active ? '0' : '-100%'});
	transition: transform 1s;
	overflow: hidden;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background-color: black;
	color: white;
`
);
