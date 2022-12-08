import $ from "jquery";
const getPokemon = async function (pokemon) {
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
	const data = await res.json();
	return data;
};
const getEvolution = async function (pokemon) {
	const res = await fetch(
		`https://pokeapi.co/api/v2/evolution-chain/${pokemon}/`
	);
	const data = await res.json();
	return data;
};
const getSpecies = async function (pokemon) {
	const res = await fetch(
		`https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`
	);
	const data = await res.json();
	return data;
};
export { getPokemon, getEvolution, getSpecies };
