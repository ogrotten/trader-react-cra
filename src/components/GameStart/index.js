import React, { useState, useContext, useEffect } from 'react'
import Modal from "../Modal"
import { GameContext } from "../../contexts/GameContext"
import useModal from '../../hooks/useModal'

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