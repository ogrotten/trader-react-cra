import React, { useState, useContext, useEffect } from 'react';
import { GameContext } from "../../contexts/GameContext"

import "./Status.scss"

const { LOCATIONS } = require("../../data/config")

const Status = () => {
	const [totalInv, setTotalInv] = useState(0)
	const { playerState } = useContext(GameContext)

	useEffect(() => {
		setTotalInv(playerState.inv.reduce(
			(acc, curr) => acc + curr
		))
	}, [playerState])

	return (
		<section className="status">
			<div className="inv">Inv: {totalInv} / {playerState.space} </div>
			<div className="week">Week: {playerState.current} / {playerState.turns} </div>
			<div className="loc">{LOCATIONS[playerState.location]}</div>
		</section>
	)
}

export default Status