import Game from './Game';

type Rule = (args: { game: Game }) => boolean | void;

export default Rule;
