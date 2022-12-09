import { useState, useEffect } from "react";
import { Button, Card, Row, Col, Spinner } from "react-bootstrap";
import "../getAPI.js";
import { getPokemon, getEvolution, getSpecies } from "../getAPI.js";
import background from "../images/background.jpg";

function Pokemon1() {
	const [src, setSrc] = useState();
	const [name, setName] = useState();
	const [infor, setInfor] = useState();
	const [species, setSpices] = useState();
	const [pokeId, setPokeId] = useState(484);
	const [evolution, setEvolution] = useState();
	const [legendary, setLegendary] = useState(
		"p-3 text-center col-12 col-sm-8 col-md-6 col-lg-3 container_card_pokemon"
	);

	const before = {};

	useEffect(() => {
		getPokemon(pokeId).then((data) => {
			setSrc(data.sprites["front_default"]);
			setInfor(data);
			console.log("pokemon");
			console.log(data);
			console.log("-------------------------------");
		});
		getSpecies(pokeId).then((data) => {
			setSpices(data);
			if (data.is_legendary) {
				setLegendary(
					"p-3 text-center col-12 col-sm-8 col-md-6 col-lg-3 container_card_pokemonLegendary"
				);
				console.log("set true");
			} else {
				setLegendary(
					"p-3 text-center col-12 col-sm-8 col-md-6 col-lg-3 container_card_pokemon"
				);
				console.log("set false");
			}
			console.log("species");
			console.log(data);
			console.log("-------------------------------");
			getEvolution(data.evolution_chain.url.split("/")[6]).then((data2) => {
				setEvolution(data2);
				console.log("evolution");
				console.log(data2);
				console.log("-------------------------------");
			});
		});
	}, [pokeId]);
	function getInfor(type) {
		if (infor !== undefined && species !== undefined) {
			switch (type) {
				case "name":
					return infor.name.charAt(0).toUpperCase() + infor.name.slice(1);
				case "hp":
					return infor.stats[0].base_stat;
				case "attack":
					return infor.stats[1].base_stat;
				case "defence":
					return infor.stats[2].base_stat;
				case "special-attack":
					return infor.stats[3].base_stat;
				case "special-defence":
					return infor.stats[4].base_stat;
				case "speed":
					return infor.stats[5].base_stat;
				case "description":
					return species.flavor_text_entries[0].flavor_text.replace("\f", " ");
				case "type":
					const type = [];
					let color;
					let textColor = "white";
					for (let i = 0; i < infor.types.length; i++) {
						textColor = "white";
						switch (infor.types[i].type.name) {
							case "normal":
								color = "#FFFFFF";
								textColor = "black";
								break;
							case "fire":
								color = "#A52A2A";
								break;
							case "water":
								color = "#00008B    ";
								break;
							case "grass":
								color = "#006400";
								break;
							case "flying":
								color = "#D5E6F7";
								textColor = "black";
								break;
							case "fighting":
								color = "#DC143C";
								break;
							case "poison":
								color = "DarkMagenta";
								break;
							case "electric":
								color = "#FFD700";
								break;
							case "ground":
								color = "#8B4513";
								break;
							case "rock":
								color = "#708090";
								break;
							case "psychic":
								color = "#800080";
								break;
							case "ice":
								color = "#ABCDEF";
								textColor = "black";
								break;
							case "bug":
								color = "#3CB371";
								break;
							case "ghost":
								color = "#F8F8FF";
								textColor = "black";
								break;
							case "steel":
								color = "#A9A9A9";
								break;
							case "dragon":
								color = "#B22222";
								break;
							case "dark":
								color = "#23282D";
								break;
							case "fairy":
								color = "#ffd5bd";
								textColor = "black";
								break;
						}

						const typeDetail = {
							type:
								infor.types[i].type.name.charAt(0).toUpperCase() +
								infor.types[i].type.name.slice(1),
							color: { backgroundColor: color, color: textColor },
						};
						type.push(typeDetail);
					}
					const types = type.map((item, index) => (
						<button className="btn m-1" key={index} style={item.color}>
							{item.type}
						</button>
					));
					return types;
				default:
					return "";
			}
		}
	}
	function evol() {
		let curLevel = evolution.chain;
		while (species.name != curLevel.species.name) {
			curLevel = curLevel.evolves_to[0];
		}
		if (curLevel.evolves_to.length != 0) {
			setPokeId(curLevel.evolves_to[0].species.url.split("/")[6]);
		}
	}
	function devol() {
		if (species.evolves_from_species != null) {
			setPokeId(parseInt(species.evolves_from_species.url.split("/")[6]));
		}
	}
	return (
		<>
			<div id="backgroundbody"></div>
			<div id="wrapAll" className="h-100 p-3 container-fluid text-dark">
				<div id="wrapNap" className="row d-flex justify-content-between">
					<button
						className="nap col-2 box m-3 text-white"
						onClick={() => {
							setPokeId(pokeId - 1);
						}}
					>
						<h3>Previous Pokemon</h3>
					</button>
					<button className="col-2 box m-3 text-white" onClick={() => devol()}>
						<h3>Devolution</h3>
					</button>
					<button
						className="nap col-2 box m-3 text-white"
						onClick={() => {
							setPokeId(Math.floor(Math.random() * 950) + 1);
						}}
					>
						<h3>Random</h3>
					</button>
					<button className="col-2 box m-3 text-white" onClick={() => evol()}>
						<h3>Evolution</h3>
					</button>
					<button
						className="nap col-2 box m-3 text-white"
						onClick={() => {
							setPokeId(pokeId + 1);
						}}
					>
						<h3>Next Pokemon</h3>
					</button>
				</div>
				<div className="row h-75 d-flex justify-content-center">
					<div className={legendary}>
						<div className="card bg-white text-center">
							<div className="card-header d-flex justify-content-between">
								<div className="pokemon_name">
									<h3>{getInfor("name")}</h3>
								</div>
								<div className="pokemon_HP">
									<span className="pokemon_HP_til" style={{ fontSize: "75%" }}>
										HP
									</span>
									<span className="index_HP" style={{ fontSize: "130%" }}>
										{" " + getInfor("hp")}
									</span>
								</div>
							</div>
							<div className="card-body">
								<div className="img_pokemon"></div>
								<img src={src} alt="" className="main_img_pokemon" />
							</div>
							<div className="card-footer">
								<div className="card-content generation d-flex ">
									{getInfor("type")}
								</div>
								<div className="card-content d-flex justify-content-between my-2 flex-wrap">
									<div className="content_child">
										<h5>Attack</h5>
										<p>{getInfor("attack")}</p>
									</div>
									<div className="content_child">
										<h5>Defence</h5>
										<p>{getInfor("defence")}</p>
									</div>
									<div className="content_child">
										<h5>Speed</h5>
										<span>{getInfor("speed")}</span>
									</div>
									<div className="content_child">
										<h5>Specical Attack</h5>
										<p>{getInfor("special-attack")}</p>
									</div>
									<div className="content_child">
										<h5>Specical Defence</h5>
										<p>{getInfor("special-defence")}</p>
									</div>
								</div>
								<h5>Description</h5>
								<span>{getInfor("description")}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default Pokemon1;
