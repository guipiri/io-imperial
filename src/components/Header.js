import React from "react";
import img from "../imgs/jogadores";
import styles from "./Header.css";
import VerificaId from "./digiteCodigo";

function Header() {
	return (
		<div className="header">
			<div className="logos">
				<img
					id="logosb"
					src="https://live.sportsbet.io/assets/landings/logo-sportsbet-light-529416dd25e42996300ad554b27c22244502904174be32ea6dfb4df08a170af0.png"
				/>
				<img
					id="logoimperial"
					src="https://seeklogo.com/images/I/imperial-esports-logo-728A269FBB-seeklogo.com.png?v=637810384520000000"
				/>
			</div>
			<div>
				<h1>Resgate seus bonecos da Imperial Esports aqui!</h1>
				<VerificaId />
				<img id="jogadores" src={img} />
			</div>
		</div>
	);
}

export default Header;
