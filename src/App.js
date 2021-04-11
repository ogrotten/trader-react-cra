import React, { useContext } from 'react';
import panache from "panache-react"
import { GameContext } from "./contexts/GameContext"

import Market from "./components/Market"
import Location from "./components/Location"

import './App.scss';



const Main = panache.div({
	width: 432,
	height: 768,
	backgroundColor: "white"
})

const App = () => {
	const { startGame, advanceTurn, } = useContext(GameContext)

	const begin = () => {
		advanceTurn()
	}

	return (
		<div className="container">
			<Main id="main" className="main">
				{startGame()
					? <div>
						<button onClick={begin}>
							git money
						</button>
					</div>
					: <>
						<Market />
						<Location />
					</>
				}
			</Main>
		</div>
	)
}

export default App;