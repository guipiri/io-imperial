import React from "react";
// import styles from "./Home.module.css";
import InputCodigo from "../components/InputCodigo";
import Loader from "../components/Loader";
import Header from "../components/Header";

function Home() {
	return (
		<>
			<Header />
			<InputCodigo />
			<Loader on={false} />
		</>
	);
}

export default Home;
