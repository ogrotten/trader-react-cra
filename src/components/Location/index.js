import React, { useState } from 'react'
import Modal from "../Modal"

import "./Location.scss"

const { LOCATIONS } = require("../../data/config")

const Location = ({ isShowing, toggleShow, isSmall, toggleSmall }) => {

	return (
		<Modal isShowing={isShowing} hide={toggleShow} isSmall={isSmall} normal={toggleSmall}>
			<div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
				{
					LOCATIONS.map(item => {
						return (
							<button style={{ width: "28%", margin: "8px 0", height: 64 }}>
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