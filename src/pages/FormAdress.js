import React from "react";
import { useState } from "react";
import styles from "./FormAdress.module.css";
// import WriteSheet from "../routes/WriteSheet";
import Loader from "../components/Loader";
import Alert from "../components/Alert";
import Header from "../components/Header";
import { AuthContext } from "./CodeAuth";
import axios from "axios";
import skeleton from "../imgs/skeleton_knife.png";

function FormAdress() {
	const [cep, setCep] = useState("");
	const [adress, setAdress] = useState("");
	const [loaderOn, setLoaderOn] = useState(false);
	const [alertConfig, setAlertConfig] = useState({});
	const { authCode } = React.useContext(AuthContext);

	function handleOnChange(e) {
		setCep(e.target.value);
	}

	function handleChange(e) {
		setAdress({
			...adress,
			[e.target.name]: e.target.value || e.target.alt,
		});
		const bonecos = document.getElementsByClassName(
			styles.conteinerBonecos
		);
		if (e.target.alt) {
			if (e.target.alt === "boneco1") {
				bonecos[0].classList.add(styles.greenBorder);
				bonecos[1].classList.remove(styles.greenBorder);
			} else if (e.target.alt === "boneco2") {
				bonecos[1].classList.add(styles.greenBorder);
				bonecos[0].classList.remove(styles.greenBorder);
			}
		}
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setLoaderOn(true);
		setAdress("");
		await fetch(`https://viacep.com.br/ws/${cep}/json/`)
			.then((res) => res.json())
			.then((data) => {
				if (data.erro) {
					setLoaderOn(false);
					setAlertConfig({
						on: true,
						tit: "CEP Inválido!",
						msg: "Digite um CEP válido",
						type: "fail",
					});
					setCep("");
					setAdress("");
				} else {
					setAdress({ ...data, complemento: "" });
					setLoaderOn(false);
				}
			})
			.catch((err) => {
				setAlertConfig({
					on: true,
					tit: "CEP Inválido!",
					msg: "Digite um CEP válido",
					type: "fail",
				});
				setCep("");
				setLoaderOn(false);
			});
	}

	async function handleSubmitAdress(e) {
		e.preventDefault();

		if (!adress.boneco) {
			setAlertConfig({
				on: true,
				tit: "Erro!",
				msg: "Escolha um boneco!",
				type: "fail",
			});
			return false;
		}

		setLoaderOn(true);

		let date = new Date();
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		date = day + "/" + month + "/" + year;

		const values = [
			[
				false,
				date,
				"nome aqui",
				"email aqui",
				"cpf aqui",
				"telefone aqui",
				adress.cep,
				adress.logradouro,
				adress.numero,
				adress.bairro,
				adress.localidade,
				adress.uf,
				adress.complemento,
				adress.boneco,
			],
		];

		await axios({
			method: "post",
			url: `${process.env.REACT_APP_API_URL}/updateRow`,
			data: {
				values,
			},
			headers: {
				Authorization: authCode.token,
			},
		})
			.then((res) => {
				setLoaderOn(false);
				setAlertConfig({
					on: true,
					tit: "Perfeito!",
					msg: "Seu endereço foi registrado com sucesso. Seu boneco chegará em breve!",
					type: "success",
				});
			})
			.catch((err) => {
				console.log(err);
				setLoaderOn(false);
				setAlertConfig({
					on: true,
					tit: "Erro!",
					msg: "Estamos tendo problemas!",
					type: "fail",
				});
			});
	}

	function okButton() {
		setAlertConfig({ ...alertConfig, on: false });
		if (alertConfig.type === "success") {
			window.location.pathname = "/";
		} else {
			document.getElementById("CEP").focus();
		}
	}

	return (
		<>
			<Header />
			<div className={styles.conteiner}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.cepDiv}>
						<div>
							<label htmlFor="CEP">Digite o CEP:</label>
							<input
								type="number"
								id="CEP"
								name="cep"
								value={cep}
								placeholder="012345678"
								className={`${styles.inputCep} ${styles.CEP}`}
								onChange={handleOnChange}
								required
								autoFocus
							/>
						</div>
						{!adress && (
							<input
								type="submit"
								className={`${styles.inputCep} ${styles.inputSubmit}`}
							/>
						)}
					</div>
				</form>
				{adress && (
					<form onSubmit={handleSubmitAdress}>
						<table>
							<tbody>
								<tr>
									<td className={styles.tdFlex}>
										<label htmlFor="logradouro">
											Logradouro:
										</label>
										<input
											type="text"
											onChange={handleChange}
											defaultValue={adress.logradouro}
											className={styles.inputCep}
											id="logradouro"
											name="logradouro"
											required
										/>
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
											required
										/>
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
											required
										/>
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
											required
										/>
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
											required
										/>
									</td>
								</tr>
								<tr>
									<td colSpan="3">
										<label htmlFor="complemento">
											Complemento:
										</label>
										<input
											type="text"
											onChange={handleChange}
											className={styles.inputCep}
											id="complemento"
											name="complemento"
										/>
									</td>
								</tr>
								<tr>
									<td colSpan="3">
										<label>Escolha seu boneco:</label>
									</td>
								</tr>
								<tr>
									<td colSpan="3">
										<div className={styles.divBonecos}>
											<div
												className={
													styles.conteinerBonecos
												}
											>
												<img
													src={skeleton}
													onClick={handleChange}
													alt="boneco1"
													name="boneco"
												/>
												<span>Boneco 1</span>
											</div>
											<div
												className={
													styles.conteinerBonecos
												}
											>
												<img
													src={skeleton}
													onClick={handleChange}
													alt="boneco2"
													name="boneco"
												/>
												<span>Boneco 2</span>
											</div>
										</div>
									</td>
								</tr>

								<tr>
									<td colSpan="2">
										<input
											type="submit"
											className={`${styles.inputCep} ${styles.button}`}
										></input>
									</td>
								</tr>
							</tbody>
						</table>
					</form>
				)}
			</div>
			<Loader on={loaderOn} />
			{alertConfig.on && (
				<Alert
					tit={alertConfig.tit}
					msg={alertConfig.msg}
					type={alertConfig.type}
					ok={okButton}
				/>
			)}
		</>
	);
}

export default FormAdress;
