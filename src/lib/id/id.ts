import { nodeBoards } from '@/engine/const/node-boards/node-boards';
import NodeBoard from '@/engine/entities/NodeBoard';

export const buttonId = (args: { board: NodeBoard; header: number; pin: number }) => {
	const { board, header, pin } = args;
	const boardIndex = nodeBoards.indexOf(board);
	const baseId = nodeBoards
		.slice(0, boardIndex)
		.reduce((previousValue, currentValue) => previousValue + currentValue.buttonCount, 0);
	return baseId + header * 8 + pin;
};

export const coilId = (args: { board: NodeBoard; header: number; pin: number }) => {
	const { board, header, pin } = args;
	const boardIndex = nodeBoards.indexOf(board);
	const baseId = nodeBoards
		.slice(0, boardIndex)
		.reduce((previousValue, currentValue) => previousValue + currentValue.coilCount, 0);
	return baseId + header * 8 + pin;
};
