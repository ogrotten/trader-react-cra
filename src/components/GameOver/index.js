import React, { useState, useContext, useEffect } from 'react'
import Modal from "../Modal"
import { GameContext } from "../../contexts/GameContext"

import "./GameOver.scss"

const GameOver = () => {
	const { log } = useContext(GameContext)
	return (
		<div>
			<p>Game Over (component)</p>
			{log.forEach((turn, idx) => {
				<div>
					<p key={idx}>Turn {idx} </p>
					<ul>
						{turn.forEach((item, i) => {
							<li key={i}>{item}</li>
						})}
					</ul>
				</div>
			})}
		</div>
	)
}

export default GameOver