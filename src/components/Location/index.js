import React, { useState, useEffect, useContext } from 'react'
import panache from "panache-react"
import { GameContext } from "../../contexts/GameContext"

import Modal from "../Modal"
import "./Location.scss"
import useModal from '../../hooks/useModal'


const Location = () => {
	const { changeLocation, playerState: { currTurn, maxTurns, position }, gameConfig: { LOCATIONS, TRAVEL } } = useContext(GameContext)
	const [traveltext, setTraveltext] = useState("")
	const { modalHide, modalShow, modalLarge, isShowing } = useModal()

	useEffect(() => {
		if (currTurn === 0) {
			setTraveltext("Leave")
		} else if (maxTurns - currTurn === 0) {
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

	const MainFooter = panache.div({
		display: "grid",
		justifyItems: "start",
		height: "auto",
		margin: "0 20px"
	})
	const LocButton = panache.button({
		width: "28%",
		margin: "8px 0",
		height: "64px",
		backgroundColor: "silver"
	})

	return (
		<>
			<MainFooter>
				{maxTurns - currTurn === 0
					? <button value={1} onClick={doTravel}>{traveltext}. . .</button>
					: <button onClick={travelButton}>{traveltext}. . .</button>
				}
				{/* <button onClick={travelButton}>{traveltext}. . .</button> */}
			</MainFooter>
			<Modal data={{ title: traveltext }} isShowing={isShowing} hide={modalHide} normal={true}>

				<div>Where do you want to go?</div>
				<div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
					{
						LOCATIONS.map((item, i) => {
							return (
								<LocButton key={i} value={i}
									disabled={i === position}
									style={i === position ? { backgroundColor: "#404040", color: "#606060" } : null}
									onClick={doTravel}
								>
									{item}
								</LocButton>
							)
						})
					}
				</div>
			</Modal>
		</>
	)
}

export default Location