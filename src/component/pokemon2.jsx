import { useState, useEffect } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import "../getAPI.js";
import { getPokemon, getEvolution, getSpecies } from "../getAPI.js";

function Pokemon2() {
	const [src, setSrc] = useState();
	const [name, setName] = useState();
	const [infor, setInfor] = useState();

	useEffect(() => {
		getPokemon(2).then((data) => {
			setSrc(data.sprites["front_default"]);
			setInfor(data);
			console.log(data);
		});
	}, []);
	function getInfor(type) {
		if (infor !== undefined) {
			switch (type) {
				case "name":
					return infor.name;
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
				default:
					return "";
			}
		} else {
			console.log("wait");
		}
	}
	return (
		<>
			<Card style={{ width: "15rem", margin: "auto" }}>
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
					<Card.Text>
						Some quick example text to build on the card title and make up the
						bulk of the card's content.
					</Card.Text>
					<Row>
						<Col>
							<Button>Go back</Button>
						</Col>
						<Col>
							<Button>Evolution</Button>
						</Col>
					</Row>
				</Card.Body>
			</Card>
		</>
	);
}
export default Pokemon2;
