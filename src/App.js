import React, { useContext } from 'react';
import panache from "panache-react"
import { GameContext } from "./contexts/GameContext"

import Market from "./components/Market"
import Location from "./components/Location"

import './App.scss';
import GameOver from "./components/GameOver"
import GameStart from "./components/GameStart"

const Main = panache.div({
	width: 432,
	height: 768,
	backgroundColor: "white"
})

const App = () => {
	const { startGame, endGame, } = useContext(GameContext)

	return (
		<div className="container">
			<Main id="main" className="main">
				{startGame() &&
					<GameStart />
				}
				{endGame() &&
					<GameOver />
				}
				{!startGame() && !endGame() &&
					<>
						<Market />
						<Location />
					</>
				}
			</Main>
		</div>
	)
}

export default App;