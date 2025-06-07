import React from "react";
import ReactDOM from "react-dom";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import Keycloak from "keycloak-js";
import App from "./App";

const keycloak = new Keycloak({
    url: process.env.REACT_APP_KEYCLOAK_URL,
    realm: process.env.REACT_APP_KEYCLOAK_REALM || "",
    clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID || "",
});

ReactDOM.render(
    <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{
            onLoad: "login-required",
            // можно и другие настройки init передать, например:
            // checkLoginIframe: false,
            pkceMethod: 'S256',
        }}
    >
        <App />
    </ReactKeycloakProvider>,
    document.getElementById("root")
);
