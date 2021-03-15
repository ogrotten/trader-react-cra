import React from 'react';
import { useRecoilState } from "recoil"
import { playerState } from '../../recoil/atoms';

import "./Status.scss"

const { LOCATIONS } = require("../../data/config")

const Status = () => {
	const [player, setPlayer] = useRecoilState(playerState)
	// const totalInv = inv.reduce((total, current) => total + current)

	return (
		<section className="status">
			<div className="inv">Inv: * / * </div>
			<div className="week">Week: {player.current} / {player.turns} </div>
			<div className="loc">{LOCATIONS[player.location]}</div>
		</section>
	)
}

export default Status