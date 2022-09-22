import React from "react";
import styles from "./InputCodigo.module.css";

function digiteCodigo() {
	return (
		<div className={styles.conteiner}>
			<form className={styles.form}>
				<input
					type="text"
					className={styles.inputCodigo}
					placeholder="Digite seu código de resgate"
				/>
			</form>
		</div>
	);
}

export default digiteCodigo;
