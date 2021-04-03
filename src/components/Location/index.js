import React, { useState, useContext } from 'react'
import Modal from "../Modal"
import { GameContext } from "../../contexts/GameContext"

import "./Location.scss"


const Location = ({ title, isShowing, toggleShow }) => {
	const { changeLocation, playerState, gameConfig: { LOCATIONS } } = useContext(GameContext)
	const doTravel = (e) => {
		changeLocation(e.target.value)
		toggleShow()
	}
	return (
		<Modal data={{ type: title }} isShowing={isShowing} hide={toggleShow} normal={true}>
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