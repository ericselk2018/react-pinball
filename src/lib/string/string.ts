export const changeLetter = (args: { letter: string; down: boolean }) => {
	const { letter, down } = args;
	const up = !down;
	if (letter === 'A' && down) {
		return 'Z';
	} else if (letter === 'Z' && up) {
		return 'A';
	} else {
		return String.fromCharCode(letter.charCodeAt(0) + (down ? -1 : 1));
	}
};

export const changeLetterAt = (args: { text: string; index: number; down: boolean }) => {
	const { text, index, down } = args;
	return text.slice(0, index) + changeLetter({ letter: text.slice(index, index + 1), down }) + text.slice(index + 1);
};
