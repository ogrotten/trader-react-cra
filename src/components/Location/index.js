import React, { useState, useEffect, useContext } from 'react'
import Modal from "../Modal"
import GameOver from "../GameOver"
import { GameContext } from "../../contexts/GameContext"

import "./Location.scss"
import useModal from '../../hooks/useModal'


const Location = () => {
	const { changeLocation, playerState, playerState: { current }, endGame, advanceTurn, gameConfig: { LOCATIONS, TRAVEL } } = useContext(GameContext)
	const [traveltext, setTraveltext] = useState("")
	const { modalHide, modalShow, modalLarge, isShowing } = useModal()

	useEffect(() => {
		if (current === 1) {
			setTraveltext("Leave")
		} else if (endGame()) {
			setTraveltext("End game")
		} else {
			setTraveltext(TRAVEL[Math.floor(Math.random() * TRAVEL.length)])
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [current])


	const doTravel = (e) => {
		changeLocation(e.target.value)
		advanceTurn()
		modalHide()
	}
	const travelButton = () => {
		modalLarge()
		modalShow()
	}
	const okAction = () => {
		console.log(`conlog: GAME OVER`,)
	}
	return (
		<>
			<div className="mainFooter">
				<button onClick={travelButton}>{traveltext}. . .</button>
			</div>
			{!endGame()
				? <Modal data={{ title: traveltext }} isShowing={isShowing} hide={modalHide} normal={true}>

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

				: <GameOver isShowing={isShowing} />
			}
		</>
	)
}

export default Location