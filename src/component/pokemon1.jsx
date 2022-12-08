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
	const [pokeId, setPokeId] = useState(25);
	const [evolution, setEvolution] = useState();

	const style = {
		backgroundColor: "blue",
	};

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
				case "color":
					// return { backgroundColor: species.color.name };
					style.backgroundColor = species.color.name;
					break;
				case "type":
					return (
						infor.types[0].type.name.charAt(0).toUpperCase() +
						infor.types[0].type.name.slice(1)
					);
				// infor.types[0].type.name.splice(1)
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
			{/* <Button
				onClick={() => {
					if (pokeId >= 1) {
						setPokeId(pokeId - 1);
						console.log(pokeId);
					}
				}}
			>
				Back
			</Button>
			<Card
				style={{
					width: "18rem",
					margin: "auto",
					backgroundColor: "transparent",
				}}
			>
				<Card.Img variant="top" src={src} />
				<Card.Body>
					<Card.Title style={{ textAlign: "center" }}>
						{getInfor("name")}
					</Card.Title>
					<Row>
						<Col>
							<Card.Text>HP: {getInfor("hp")}</Card.Text>
						</Col>
						<Col>
							<Card.Text>Attack: {getInfor("attack")}</Card.Text>
						</Col>
					</Row>
					<Row>
						<Col>
							<Card.Text>Defence: {getInfor("defence")}</Card.Text>
						</Col>
						<Col>
							<Card.Text>Speed: {getInfor("speed")}</Card.Text>
						</Col>
					</Row>
					<Row>
						<Col>
							<Card.Text>
								Special Attack: {getInfor("special-attack")}
							</Card.Text>
						</Col>
					</Row>
					<Row>
						<Col>
							<Card.Text>
								Special Defence: {getInfor("special-defence")}
							</Card.Text>
						</Col>
					</Row>
					<Card.Text>{getInfor("description")}</Card.Text>
					<Row>
						<Col>
							<Button onClick={() => devol()}>Devolution</Button>
						</Col>
						<Col>
							<Button onClick={() => evol()}>Evolution</Button>
						</Col>
					</Row>
				</Card.Body>
			</Card>
			<Button
				onClick={() => {
					setPokeId(pokeId + 1);
				}}
			>
				Next
			</Button> */}
			<div id="backgroundbody"></div>
			<div id="wrapAll" className="h-100 p-3 container-fluid text-dark">
				<div id="wrapNap" className="row d-flex justify-content-between">
					<button
						className="nap col-3 box m-3 text-white"
						onClick={() => {
							setPokeId(pokeId - 1);
						}}
					>
						<h3>Previous Pokemon</h3>
					</button>
					<button className="col-3 box m-3 text-white">
						<h3>Detail</h3>
					</button>
					<button
						className="nap col-3 box m-3 text-white"
						onClick={() => {
							setPokeId(pokeId + 1);
						}}
					>
						<h3>Next Pokemon</h3>
					</button>
				</div>
				<div className="row h-75 d-flex justify-content-center">
					<div className="p-3 text-center container_card_pokemon col-12 col-sm-8 col-md-6 col-lg-3">
						<div className="card bg-white text-center">
							<div className="card-header d-flex justify-content-between">
								<div className="pokemon_name">
									<h3>{getInfor("name")}</h3>
								</div>
								<div className="pokemon_HP">
									<span className="pokemon_HP_til" style={{ fontSize: "60%" }}>
										HP
									</span>
									<span className="index_HP" style={{ fontSize: "130%" }}>
										{getInfor("hp")}
									</span>
								</div>
							</div>
							<div className="card-body">
								<div className="img_pokemon"></div>
								<img src={src} alt="" className="main_img_pokemon" />
							</div>
							<div className="card-footer">
								<div className="card-content generation d-flex justify-content-between">
									<button className="btn" style={style}>
										{getInfor("type")}
									</button>
									<button className="btn btn-secondary">
										{getInfor("color")}
									</button>
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
										<h5>Tiến Hóa</h5>
										<span>dragon</span>
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
