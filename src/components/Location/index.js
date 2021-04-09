import React, { useState, useContext } from 'react'
import Modal from "../Modal"
import { GameContext } from "../../contexts/GameContext"

import "./Location.scss"
import useModal from '../../hooks/useModal'


const Location = ({ title, isShowing, hide }) => {
	const { changeLocation, playerState, gameConfig: { LOCATIONS } } = useContext(GameContext)
	// const { isShowing } = useModal()

	const doTravel = (e) => {
		changeLocation(e.target.value)
		hide()
	}
	return (
		<Modal data={{ type: title }} isShowing={isShowing} hide={hide} normal={true}>
			<div>Where do you want to go?</div>
			<div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
				{
					LOCATIONS.map((item, i) => {
						return (
							<button key={i} value={i}
								disabled={i === playerState.location}
								style={{ width: "28%", margin: "8px 0", height: 64 }}
								onClick={doTravel}
							>
								{item}
							</button>
						)
					})
				}
			</div>
		</Modal>
	)
}

export default Location