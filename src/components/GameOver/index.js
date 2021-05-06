import React, { useState, useContext, useEffect } from 'react'
import Modal from "../Modal"
import { GameContext } from "../../contexts/GameContext"

import "./GameOver.scss"

const GameOver = () => {
	const { log } = useContext(GameContext)
	return (
		<div>
			<p>Game Over (component)</p>
			{log.map((turn, idx) => {
				return <div>
					<p key={idx}>Turn {idx} </p>
					<ul>
						{turn.map((item, i) => {
							return <li key={i}>{Object.keys(item)[0]}: {Object.values(item)[0]}</li>
						})}
					</ul>
				</div>
			})}
		</div>
	)
}

export default GameOver