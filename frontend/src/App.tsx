import React from "react";
import ReportPage from "./components/ReportPage";

const App: React.FC = () => {
    // Здесь уже не нужно вызывать keycloak.init().
    // Достаточно, что провайдер делает это «снаружи».

    return (
        <div className="App">
            <ReportPage />
        </div>
    );
};

export default App;
