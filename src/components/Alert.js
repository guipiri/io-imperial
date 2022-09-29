import styles from "./Alert.module.css";

function Alert({ tit, msg, type, ok }) {
	return (
		<>
			<div className={styles.conteiner}>
				<div className={styles.divAlert}>
					<h2 className={type}>{tit}</h2>
					<p>{msg}</p>
					<button className={styles.button} onClick={ok}>
						OK
					</button>
				</div>
			</div>
		</>
	);
}

export default Alert;
