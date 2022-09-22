import Home from "./pages/Home.js";
import FormAdress from "./pages/FormAdress";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/form" element={<FormAdress />} />
			</Routes>
		</Router>
	);
}

export default App;
