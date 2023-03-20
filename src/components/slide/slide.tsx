import { ReactNode } from 'react';
import * as S from './slide.styles';

interface Props {
	active: boolean;
	children: ReactNode;
}

const Slide = (props: Props) => {
	const { active, children } = props;
	return <S.Container active={active}>{children}</S.Container>;
};

export default Slide;
