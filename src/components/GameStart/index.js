import React, { useContext, } from 'react'
import { GameContext } from "../../contexts/GameContext"

import "./GameStart.scss"

const GameStart = () => {
	const { advanceTurn, } = useContext(GameContext)

	const begin = () => {
		advanceTurn()
	}

	return (
		<div>
			<p>You're in a cyberpunk metropolis slingin snow, trying to pile up as much money as you can in a year of dealing, one week at a time.</p>
			<p>Buy low, sell high. Drop your duckets into the bank for risk-free interest. Take on debt if you dare.</p>
			<p>Maybe you can't take it with you, but you can sure as hell run up the score while you're in it.</p>
			<button onClick={begin}>
				Git money!
			</button>
		</div>
	)
}

export default GameStart