import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Row, Col } from "react-bootstrap";

import Pokemon1 from "./component/pokemon1.jsx";
import Pokemon2 from "./component/pokemon2.jsx";
import background from "./images/background.jpg";

const root = ReactDOM.createRoot(document.getElementById("root"));
function Main() {
	const [count, setCount] = useState(0);
	useEffect(() => {});
	return (
		<React.StrictMode>
			<Pokemon1 />
		</React.StrictMode>
	);
}
root.render(<Main />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
