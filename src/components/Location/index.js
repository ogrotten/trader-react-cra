import React, { useState } from 'react'
import Modal from "../Modal"

import { useRecoilState } from "recoil"
import { playerState } from '../../recoil/atoms';


import "./Location.scss"

const { LOCATIONS } = require("../../data/config")

const Location = ({ isShowing, toggleShow, isSmall, toggleSmall }) => {
	const [player, setPlayer] = useRecoilState(playerState)
	const changeLoc = (e) => {
		setPlayer({ ...player, location: e.target.value })
		toggleShow()
	}
	return (
		<Modal isShowing={isShowing} hide={toggleShow} isSmall={isSmall} normal={toggleSmall}>
			<div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
				{
					LOCATIONS.map((item, i) => {
						return (
							<button key={i} value={i}
								style={{ width: "28%", margin: "8px 0", height: 64 }}
								onClick={changeLoc}
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