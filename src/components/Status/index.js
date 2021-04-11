import React, { useState, useContext, useEffect } from 'react';
import { GameContext } from "../../contexts/GameContext"
import gameConfig from "../../data/gameConfig"

import "./Status.scss"
const { LOCATIONS } = gameConfig

const Status = () => {
	// const [totalInv, setTotalInv] = useState(0)
	const { playerState, remainingSpace } = useContext(GameContext)

	// useEffect(() => {
	// 	setTotalInv(playerState.inv.reduce(
	// 		(acc, curr) => acc + curr
	// 	))
	// }, [playerState])

	return (
		<section className="status">
			<div className="inv">Inv: {remainingSpace()} / {playerState.space} </div>
			<div className="week">Week: {playerState.currTurn} / {playerState.maxTurns} </div>
			<div className="loc">{LOCATIONS[playerState.position]}</div>
		</section>
	)
}

export default Status