import React, { useContext } from 'react';
import { GameContext } from "../../contexts/GameContext"

import "./Status.scss"

const { LOCATIONS } = require("../../data/config")

const Status = () => {
	const { playerState } = useContext(GameContext)

	// const totalInv = inv.reduce((total, current) => total + current)

	return (
		<section className="status">
			<div className="inv">Inv: * / * </div>
			<div className="week">Week: {playerState.current} / {playerState.turns} </div>
			<div className="loc">{LOCATIONS[playerState.location]}</div>
		</section>
	)
}

export default Status