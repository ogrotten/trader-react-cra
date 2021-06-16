import React, { useContext, } from 'react'
import panache from "panache-react"

import { GameContext } from "../../contexts/GameContext"

import "./GameStart.scss"

const styles = {
	Pregame: panache.div({
		padding: "18%",
		lineHeight: "200%",
	})
}

const GameStart = () => {
	const { advanceTurn, } = useContext(GameContext)
	const { Pregame } = styles


	const begin = () => {
		advanceTurn()
	}

	return (
		<Pregame>
			<p>You're coming up in a corporate metropolis slingin snow, trying to pile up as much money as you can in a year of dealing.</p>
			<p>Buy low, sell high, one week at a time. Drop your duckets into the bank for risk-free interest. Take on debt from the loan sharks if you dare.</p>
			<p>Maybe you can't take it with you, but you can sure as hell run up the score and leave this city far behind.</p>
			<button onClick={begin}>
				Git money!
			</button>
		</Pregame>
	)
}

export default GameStart