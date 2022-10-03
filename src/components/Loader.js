import React from "react";
import styles from "./Loader.module.css";
import skeleton from "../imgs/skeleton_knife.png";

function Loading({ on }) {
	return (
		<>
			{on && (
				<div className={styles.ldsdualring}>
					<img
						className={styles.rotate}
						width="100px"
						// height="100px"
						src={skeleton}
						alt="skeleton-knife"
					/>
				</div>
			)}
		</>
	);
}

export default Loading;
