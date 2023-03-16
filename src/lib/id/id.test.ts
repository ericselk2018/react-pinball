import NodeBoard from '@/engine/entities/NodeBoard';
import { coilId, buttonId } from './id';

const mockNodeBoardsGetter = jest.fn();

jest.mock('@/engine/const/node-boards/node-boards', () => ({
	get nodeBoards() {
		return mockNodeBoardsGetter();
	},
}));

describe('id', () => {
	describe('buttonId', () => {
		it('should return correct ID for 2nd board with 3rd board setup', () => {
			const board1: NodeBoard = {
				coilCount: 1,
				buttonCount: 123,
			};
			const board2: NodeBoard = {
				coilCount: 12,
				buttonCount: 9,
			};
			const board3: NodeBoard = {
				coilCount: 15,
				buttonCount: 456,
			};

			const boards = [board1, board2, board3];
			const header = 2;
			const pin = 4;

			mockNodeBoardsGetter.mockReturnValue(boards);

			const id = buttonId({ board: board2, header, pin });

			expect(id).toBe(board1.buttonCount + header * 8 + pin);
		});
	});

	describe('coilId', () => {
		it('should return correct ID for 2nd board with 3rd board setup', () => {
			const board1: NodeBoard = {
				coilCount: 123,
				buttonCount: 1,
			};
			const board2: NodeBoard = {
				coilCount: 9,
				buttonCount: 12,
			};
			const board3: NodeBoard = {
				coilCount: 456,
				buttonCount: 15,
			};

			const boards = [board1, board2, board3];
			const header = 3;
			const pin = 7;

			mockNodeBoardsGetter.mockReturnValue(boards);

			const id = coilId({ board: board2, header, pin });

			expect(id).toBe(board1.coilCount + header * 8 + pin);
		});
	});
});
