import "@fontsource/barlow-condensed/latin-700.css";
import "@fontsource/barlow-condensed/latin-700-italic.css";
import "@fontsource/barlow-condensed/latin-900.css";
import "@fontsource-variable/space-grotesk/wght.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles.css";

const rootElement = document.getElementById("root");

if (rootElement === null) {
	throw new Error("Application root element is missing.");
}

createRoot(rootElement).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
