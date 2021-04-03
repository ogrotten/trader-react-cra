import React, { useState, useContext } from 'react'
import Modal from "../Modal"
import { GameContext } from "../../contexts/GameContext"

import "./GameOver.scss"

const GameOver = ({ title, isShowing, toggleShow }) => {
	console.log(`conlog: gameover `,)
	return (
		<Modal data={{ type: "Game Over" }} isShowing={isShowing} hide={toggleShow} normal={true}>
			<div>Game Over</div>
		</Modal>
	)
}

export default GameOver