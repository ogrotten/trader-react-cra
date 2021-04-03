import React, { useState, useContext } from 'react';
import panache from "panache-react"
import { GameContext } from "./contexts/GameContext"

import useModal from "./hooks/useModal"

import Market from "./components/Market"
import Location from "./components/Location"
import GameOver from "./components/GameOver"

import './App.scss';

const { TRAVEL } = require("./data/config")

const Main = panache.div({
	width: 432,
	height: 768,
	backgroundColor: "white"
})

const App = () => {
	const [traveltext, setTraveltext] = useState(TRAVEL[Math.floor(Math.random() * TRAVEL.length)])
	const { isShowing, toggleShow, isSmall, toggleSmall } = useModal()
	const { endGame } = useContext(GameContext)

	const doTravel = () => {
		toggleSmall()
		toggleShow()
	}

	return (
		<div className="container">
			<Main id="main" className="main">
				<Market />
				<div className="mainFooter">
					<button onClick={doTravel}>{traveltext}. . .</button>
				</div>
				{endGame()
					? <GameOver title="Game Over" isShowing={isShowing} toggleShow={toggleShow}>HI</GameOver>
					: <Location title={traveltext} isShowing={isShowing} toggleShow={toggleShow} />
				}
			</Main>
		</div>
	)
}

export default App;