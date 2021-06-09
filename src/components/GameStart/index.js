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
			<button onClick={begin}>
				git money
			</button>
		</div>
	)
}

export default GameStart