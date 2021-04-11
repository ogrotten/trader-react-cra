import React, { useState, useContext, useEffect } from 'react'
import Modal from "../Modal"
import { GameContext } from "../../contexts/GameContext"
import useModal from '../../hooks/useModal'

import "./GameOver.scss"

const GameOver = ({ isShowing }) => {
	const { modalHide } = useModal()

	const okAction = () => {
		console.log(`conlog: GAME OVER`,)
	}

	// useEffect(() => {
	// 	modalShow()
	// }, [])

	return (
		<Modal data={{ title: "Game Over", type: "Event" }} isShowing={isShowing} hide={modalHide} normal={true} okAction={okAction}>
			<div>Game Over</div>
		</Modal>
	)
}

export default GameOver