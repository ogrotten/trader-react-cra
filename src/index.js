import React from 'react';
import ReactDOM from 'react-dom';
import { PanacheProvider } from 'panache-react'
import { GameProvider } from "./contexts/GameContext"
// import * as serviceWorker from './serviceWorker';

import App from './App';
import './index.css';

const theme = {
	outer: {
		width: "432px",
		height: "768px",
		color: "#f22",
	}
}
const media = {}

ReactDOM.render(
	<GameProvider>
		<PanacheProvider media={media} theme={theme}>
			<App />
		</PanacheProvider>
	</GameProvider>
	, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
