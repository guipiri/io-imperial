import React from "react";
import { useState } from "react";
import styles from "./FormAdress.module.css";
import WriteSheet from "../routes/WriteSheet";


function FormAdress() {
	const [cep, setCep] = useState("")
	const [adress, setAdress] = useState("")

	function handleOnChange(e) {
		console.log(cep)
		setCep(e.target.value)
	}

	function handleChange(e) {
		setAdress({ ...adress, [e.target.name]: e.target.value })
	}

	function handleSubmit(e) {
		e.preventDefault()
		setAdress("")
		fetch(`https://viacep.com.br/ws/${cep}/json/`)
			.then((res) => res.json())
			.then((data) => { setAdress(data) })
			.catch(() => { alert("Digite um CEP válido!"); setCep(""); })

	}

	async function handleSubmitAdress(e) {
		e.preventDefault()

		await WriteSheet('https://sheetdb.io/api/v1/8dis6u0zthz73', adress)
		// guardar valores na planilha, incluindo o boneco escolhido

		//redirecionar para a página de agradecimento

	}
	return (
		<div className={styles.conteiner}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div>
					<label htmlFor="CEP">
						Digite o CEP:
					</label>
					<input
						type="number"
						id="CEP"
						name="cep"
						value={cep}
						placeholder="012345678"
						className={`${styles.inputCep} ${styles.CEP}`}
						onChange={handleOnChange}
						required
					/>
				</div>
			</form>
			{adress && (
				<form onSubmit={handleSubmitAdress}>
					<table>
						<tbody>
							<tr>
								<td className={styles.tdFlex}>
									<label htmlFor="logradouro">Logradouro:</label>
									<input
										type="text"
										onChange={handleChange}
										defaultValue={adress.logradouro}
										className={styles.inputCep}
										id="logradouro"
										name="logradouro"
										required />
								</td>
								<td>
									<label htmlFor="numero">Nº:</label>
									<input
										type="number"
										onChange={handleChange}
										placeholder="1234"
										className={`${styles.inputCep} ${styles.pequeno}`}
										id="numero"
										name="numero"
										required />
								</td>
							</tr>
							<tr>

								<td className={styles.tdFlex}>
									<label htmlFor="bairro">Bairro:</label>
									<input
										type="text"
										onChange={handleChange}
										defaultValue={adress.bairro}
										className={styles.inputCep}
										id="bairro"
										name="bairro"
										required />
								</td>
							</tr>
							<tr>
								<td className={styles.tdFlex}>
									<label htmlFor="cidade">Cidade:</label>
									<input
										type="text"
										onChange={handleChange}
										defaultValue={adress.localidade}
										className={styles.inputCep}
										id="cidade"
										name="localidade"
										required />
								</td>
								<td className={styles.pequeno}>
									<label htmlFor="uf">UF:</label>
									<input
										type="text"
										onChange={handleChange}
										defaultValue={adress.uf}
										className={`${styles.inputCep} ${styles.pequeno}`}
										id="uf"
										name="uf"
										required />
								</td>
							</tr>
							<tr>
								<td colSpan="3">
									<label htmlFor="complemento">Complemento:</label>
									<input
										type="text"
										onChange={handleChange}
										className={styles.inputCep}
										id="complemento"
										name="complemento" />
								</td>
							</tr>
							<tr>
								<td>
									<span>Escolha seu boneco:</span>
									<input
										type="radio"
										onChange={handleChange}
										id="boneco1"
										value="boneco1"
										name="boneco"
										required />

									<label htmlFor="boneco1">Boneco 1</label>
									<br />
									<input
										type="radio"
										onChange={handleChange}
										value="boneco2"
										id="boneco2"
										name="boneco" />
									<label htmlFor="boneco2">Boneco 2</label>
								</td>

							</tr>
							<tr>
								<td colSpan="2">
									<input
										type="submit"
										className={`${styles.inputCep} ${styles.button}`}></input>
								</td>
							</tr>
						</tbody>
					</table>
				</form >
			)
			}

		</div >
	);
}

export default FormAdress;
