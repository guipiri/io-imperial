import React from "react";
import styles from "./digiteCodigo.css";

function VerificaId() {
	return (
		<div className="conteiner">
			<form className="form">
				<input
					type="text"
					id="codigoResgate"
					placeholder="Digite seu código de resgate"
				/>
			</form>
		</div>
	);
}

export default VerificaId;
