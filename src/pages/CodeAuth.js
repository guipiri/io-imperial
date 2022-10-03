import React, { useState } from "react";

export const AuthContext = React.createContext({});

export const AuthProvider = (props) => {
	const [authCode, setAuthCode] = useState(false);
	return (
		<AuthContext.Provider value={{ authCode, setAuthCode }}>
			{props.children}
		</AuthContext.Provider>
	);
};
