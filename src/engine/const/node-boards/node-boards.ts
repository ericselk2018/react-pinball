import NodeBoard from '@/engine/entities/NodeBoard';

export const lowerThirdNodeBoard: NodeBoard = {
	buttonCount: 32,
	coilCount: 8,
};

export const upperThirdNodeBoard: NodeBoard = {
	buttonCount: 16,
	coilCount: 16,
};

export const cabinetNodeBoard: NodeBoard = {
	buttonCount: 8,
	coilCount: 4,
};

// Order of boards in this array must match the order they are in your FAST loop (the network cables in/out).
export const nodeBoards: ReadonlyArray<NodeBoard> = [lowerThirdNodeBoard, upperThirdNodeBoard, cabinetNodeBoard];
