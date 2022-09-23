import React from "react";
import img from "../imgs/jogadores";
import styles from "./Home.module.css";
import InputCodigo from "../components/InputCodigo";

function Header() {
	return (
		<div className={styles.header}>
			<div className={styles.logos}>
				<img
					id={styles.logosb}
					src="https://live.sportsbet.io/assets/landings/logo-sportsbet-light-529416dd25e42996300ad554b27c22244502904174be32ea6dfb4df08a170af0.png"
					alt="logomarca-sportsbet"
				/>
				<img
					id={styles.logoimperial}
					src="https://seeklogo.com/images/I/imperial-esports-logo-728A269FBB-seeklogo.com.png?v=637810384520000000"
					alt="logomarca-imperial-esports"
				/>
			</div>
			<div>
				<h1>Resgate seus bonecos da Imperial Esports aqui!</h1>
				<InputCodigo />
				<img id={styles.jogadores} src={img} alt="jogadores-imperial"
				/>
			</div>
		</div>
	);
}

export default Header;
