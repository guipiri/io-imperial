import React from "react";
import styles from "./FormAdress.module.css";

function FormAdress() {
	return (
		<div className={styles.conteiner}>
			<form className={styles.form}>
				<label for="CEP">
					Digite o CEP para a entrega dos bonecos:
				</label>
				<input
					type="number"
					id="CEP"
					name="CEP"
					placeholder="012345678"
					className={styles.inputCep}
				/>
			</form>
		</div>
	);
}

export default FormAdress;
