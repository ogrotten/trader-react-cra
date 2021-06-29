import React, { useContext, } from 'react'
import panache from "panache-react"

import { GameContext } from "../../contexts/GameContext"

import "./GameStart.scss"

const styles = {
	Pregame: panache.div(({ theme, media }) => ({
		padding: "18%",
		lineHeight: "200%",
		p: {
			marginTop: "0",
		},
		[media.small]: {
			fontSize: "16px",
			lineHeight: "175%",
		},
	}))
}

const GameStart = () => {
	const { advanceTurn, } = useContext(GameContext)
	const { Pregame } = styles


	const begin = () => {
		advanceTurn()
	}

	return (
		<Pregame id="pregame" >
			<p id="p1">You're coming up in a corporate metropolis, slingin snow and trying to pile up as many creds as you can in a year of dealing.</p>
			<p id="p2">Buy low, sell high, one week at a time. Drop your duckets into the bank for risk-free interest. Or take on debt from the loan sharks for the one big score, if you dare.</p>
			<p id="p3">Maybe you can't take it with you, but you can sure as hell run up the score and leave this city far behind.</p>
			<button onClick={begin}>
				git money
			</button>
		</Pregame>
	)
}

export default GameStart