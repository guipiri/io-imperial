import React, { useEffect, useState } from "react";
import styles from "./InputCodigo.module.css";
import img from "../imgs/jogadores";
import axios from "axios";
import Loader from "../components/Loader";
import Alert from "../components/Alert";
import { AuthContext } from "../pages/CodeAuth";

function InputCodigo() {
	const [codigo, setCodigo] = useState("");
	const [loaderOn, setLoaderOn] = useState(false);
	const [alertConfig, setAlertConfig] = useState({});
	const [token, setToken] = useState("");
	const { setAuthCode } = React.useContext(AuthContext);

	useEffect(() => {
		document.getElementById("inputCode").focus();
	}, []);

	async function validCode(e) {
		setLoaderOn(true);
		e.preventDefault();
		await axios({
			method: "get",
			url: `${process.env.REACT_APP_API_URL}/validCode/${codigo}`,
		})
			.then((response) => {
				const data = response.data;
				if (data.valid) {
					setLoaderOn(false);
					setToken({ token: data.token });
					setAlertConfig({
						on: true,
						tit: data.status,
						msg: "Você será redirecionado para cadastrar seu endereço de entrega do seu boneco!",
						type: "success",
					});
				} else {
					setLoaderOn(false);
					setAlertConfig({
						on: true,
						tit: "Código inválido!",
						msg: data.status,
						type: "fail",
					});
				}
			})
			.catch((err) => {
				setLoaderOn(false);
				setAlertConfig({
					on: true,
					tit: "Erro!",
					msg: "Estamos com problemas no servidor.",
					type: "fail",
				});
				console.log(err);
			});
	}

	function okButton() {
		setAlertConfig({ ...alertConfig, on: false });
		if (alertConfig.type === "success") {
			setAuthCode(token);
		} else {
			document.getElementById("inputCode").focus();
		}
	}

	return (
		<>
			<div className={styles.conteiner}>
				<div>
					<h1>Resgate seus bonecos da Imperial Esports aqui!</h1>
					<div className={styles.header}>
						<form onSubmit={validCode} className={styles.form}>
							<input
								type="text"
								id="inputCode"
								className={styles.inputCodigo}
								placeholder="Digite seu código de resgate"
								onChange={(e) => {
									setCodigo(e.target.value);
								}}
							/>
							<input
								type="submit"
								className={`${styles.inputCodigo} ${styles.buttonSubmit}`}
							/>
						</form>
					</div>
					<img
						id={styles.jogadores}
						src={img}
						alt="jogadores-imperial"
					/>
				</div>
			</div>
			<Loader on={loaderOn} />
			{alertConfig.on && (
				<Alert
					tit={alertConfig.tit}
					ok={okButton}
					type={alertConfig.type}
					msg={alertConfig.msg}
				/>
			)}
		</>
	);
}

export default InputCodigo;
