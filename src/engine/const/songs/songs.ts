import Song from '@/engine/entities/Song';
import debonaireLightShow from '../light-shows/debonaire/debonaire';

export const debonaireSong: Song = {
	name: 'Debonaire',
	lightShow: debonaireLightShow,
};

export const deepEnoughSong: Song = {
	name: 'Deep Enough',
	lightShow: debonaireLightShow,
};

export const lifeAintAGameSong: Song = {
	name: 'Life Aint a Game',
	lightShow: debonaireLightShow,
};

export const rollinSong: Song = {
	name: 'Rollin',
	lightShow: debonaireLightShow,
};

export const superstarSong: Song = {
	name: 'Superstar',
	lightShow: debonaireLightShow,
};

export const watchYourBackSong: Song = {
	name: 'Watch Your Back',
	lightShow: debonaireLightShow,
};

const songs: Song[] = [debonaireSong, deepEnoughSong, lifeAintAGameSong, rollinSong, superstarSong, watchYourBackSong];

export default songs;
