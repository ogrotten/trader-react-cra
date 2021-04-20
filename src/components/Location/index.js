import React, { useState, useEffect, useContext } from 'react'
import Modal from "../Modal"
import GameOver from "../GameOver"
import { GameContext } from "../../contexts/GameContext"

import "./Location.scss"
import useModal from '../../hooks/useModal'


const Location = () => {
	const { changeLocation, playerState, playerState: { currTurn, position }, endGame, advanceTurn, gameConfig: { LOCATIONS, TRAVEL } } = useContext(GameContext)
	const [traveltext, setTraveltext] = useState("")
	const { modalHide, modalShow, modalLarge, isShowing } = useModal()

	useEffect(() => {
		if (currTurn === 1) {
			setTraveltext("Leave")
		} else if (endGame()) {
			setTraveltext("End game")
		} else {
			setTraveltext(TRAVEL[Math.floor(Math.random() * TRAVEL.length)])
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currTurn])


	const doTravel = (e) => {
		changeLocation(e.target.value)
		modalHide()
	}
	const travelButton = () => {
		modalLarge()
		modalShow()
	}

	return (
		<>
			<div className="mainFooter">
				{endGame()
					? <button value={1} onClick={doTravel}>{traveltext}. . .</button>
					: <button onClick={travelButton}>{traveltext}. . .</button>
				}
				{/* <button onClick={travelButton}>{traveltext}. . .</button> */}
			</div>
			<Modal data={{ title: traveltext }} isShowing={isShowing} hide={modalHide} normal={true}>

				<div>Where do you want to go?</div>
				<div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
					{
						LOCATIONS.map((item, i) => {
							return (
								<button key={i} value={i}
									disabled={i === position}
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
		</>
	)
}

export default Location