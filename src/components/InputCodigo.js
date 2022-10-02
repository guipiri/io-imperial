import React, { useEffect, useState } from "react";
import styles from "./InputCodigo.module.css";
import img from "../imgs/jogadores";
import axios from "axios";
import Loader from "../components/Loader";
import Alert from "../components/Alert";
// import ReadSheet from "../routes/ReadSheet";

function InputCodigo() {
	const [codigo, setCodigo] = useState("");
	const [loaderOn, setLoaderOn] = useState(false);
	const [alertConfig, setAlertConfig] = useState({});

	useEffect(() => {
		document.getElementById("inputCode").focus();
	}, []);

	async function validCode(e) {
		setLoaderOn(true);
		e.preventDefault();
		await axios({
			method: "get",
			url: `http://localhost:3001/validCode/${codigo}`,
		}).then(function (response) {
			const valid = response.data.valid;
			if (valid) {
				setLoaderOn(false);
				setAlertConfig({
					on: true,
					tit: "Código validado com sucesso!",
					msg: "Você será redirecionado para cadastrar seu endereço de entrega do seu boneco!",
					type: "success",
				});
			} else {
				setLoaderOn(false);
				setAlertConfig({
					on: true,
					tit: "Código inválido!",
					msg: "Confira o código digitado e tente novamente!",
					type: "fail",
				});
			}
		});
	}

	// async function getSheet() {
	// 	const sheet = await ReadSheet(
	// 		"https://sheetdb.io/api/v1/8dis6u0zthz73"
	// 	);
	// 	console.log(codigo, sheet);
	// }

	// getSheet();

	function okButton() {
		setAlertConfig({ ...alertConfig, on: false });
		if (alertConfig.type === "success") {
			window.location.pathname = "/form";
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
