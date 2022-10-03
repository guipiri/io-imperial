import Home from "./pages/Home.js";
import FormAdress from "./pages/FormAdress";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext } from "./pages/CodeAuth.js";

function App() {
	const { authCode } = React.useContext(AuthContext);
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={!authCode ? <Home /> : <FormAdress />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
