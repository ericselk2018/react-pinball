import * as S from './blink.styles';

interface Props {
	blinking: boolean;
	blinkingLetter?: number;
	text: string;
}

const Blink = (props: Props) => {
	const { blinking, blinkingLetter, text } = props;
	if (!blinking) {
		return <>{text}</>;
	}
	if (blinkingLetter === undefined) {
		return <S.Blinking>{text}</S.Blinking>;
	}
	return (
		<>
			{text.slice(0, blinkingLetter)}
			<S.Blinking>{text.slice(blinkingLetter, blinkingLetter + 1)}</S.Blinking>
			{text.slice(blinkingLetter + 1)}
		</>
	);
};

export default Blink;
