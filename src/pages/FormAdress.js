import React from "react";
import { useState } from "react";
import styles from "./FormAdress.module.css";

function FormAdress() {
	const [cep, setCep] = useState("")
	const [adress, setAdress] = useState("")

	function handleOnChange(e) {
		console.log(cep)
		setCep(e.target.value)
	}

	function handleChange(e) {
		setAdress({ ...adress, [e.target.name]: e.target.value })
		console.log(adress)
	}

	function handleSubmit(e) {
		e.preventDefault()
		setAdress("")
		fetch(`https://viacep.com.br/ws/${cep}/json/`)
			.then((res) => res.json())
			.then((data) => { setAdress(data) })
			.catch(() => { alert("Digite um CEP válido!"); setCep(""); })

	}
	return (
		<div className={styles.conteiner}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div>

					<label htmlFor="CEP">
						Digite o CEP para a entrega dos bonecos:
					</label>
					<input
						type="number"
						id="CEP"
						name="cep"
						value={cep}
						placeholder="012345678"
						className={styles.inputCep}
						onChange={handleOnChange}
					/>
				</div>
			</form>
			{adress && (
				<form>
					<table>
						<tr>
							<td colSpan="2">
								<label htmlFor="logradouro">Logradouro:</label>
								<input type="text" onChange={handleChange} defaultValue={adress.logradouro} className={`${styles.inputCep} ${styles.grande}`} id="logradouro" name="logradouro" />
							</td>
							<td>
								<label htmlFor="numero">Nº:</label>
								<input type="number" onChange={handleChange} placeholder="1234" className={`${styles.inputCep} ${styles.pequeno}`} id="numero" name="numero" />
							</td>
						</tr>
						<tr>

							<td>
								<label htmlFor="bairro">Bairro:</label>
								<input type="text" onChange={handleChange} defaultValue={adress.bairro} className={styles.inputCep} id="bairro" name="bairro" />
							</td>
						</tr>
						<tr>
							<td colSpan="2">
								<label htmlFor="cidade">Cidade:</label>
								<input type="text" onChange={handleChange} defaultValue={adress.localidade} className={styles.inputCep} id="cidade" name="localidade" />
							</td>
							<td>
								<label htmlFor="uf">UF:</label>
								<input type="text" onChange={handleChange} defaultValue={adress.uf} className={`${styles.inputCep} ${styles.pequeno}`} id="uf" name="uf" />
							</td>
						</tr>
					</table>
				</form>
			)
			}

		</div >
	);
}

export default FormAdress;
