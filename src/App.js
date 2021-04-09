import React, { useState, useEffect, useContext } from 'react';
import panache from "panache-react"
import { GameContext } from "./contexts/GameContext"
import gameConfig from "./data/gameConfig"

import useModal from "./hooks/useModal"

import Market from "./components/Market"
import Location from "./components/Location"
import GameOver from "./components/GameOver"

import './App.scss';

const { TRAVEL } = gameConfig


const Main = panache.div({
	width: 432,
	height: 768,
	backgroundColor: "white"
})

const App = () => {
	const [traveltext, setTraveltext] = useState("")
	const { modalHide, modalShow, modalLarge, isShowing } = useModal()
	const { endGame, playerState } = useContext(GameContext)

	const doTravel = () => {
		modalLarge()
		modalShow()
	}

	useEffect(() => {
		if (playerState.current === 1) {
			setTraveltext("Leave")
		} else if (endGame()) {
			setTraveltext("End game")
		} else {
			setTraveltext(TRAVEL[Math.floor(Math.random() * TRAVEL.length)])
		}
	}, [playerState.current])

	return (
		<div className="container">
			<Main id="main" className="main">
				<Market />
				<div className="mainFooter">
					<button onClick={doTravel}>{traveltext}. . .</button>
				</div>
				{endGame()
					? <GameOver title="Game Over" isShowing={isShowing} hide={modalHide}>HI</GameOver>
					: <Location title={traveltext} isShowing={isShowing} hide={modalHide} />
				}
			</Main>
		</div>
	)
}

export default App;