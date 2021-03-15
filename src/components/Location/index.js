import React, { useState } from 'react'
import Modal from "../Modal"

import "./Location.scss"

const Location = ({ isShowing, toggleShow, isSmall, toggleSmall }) => {
	// const { isShowing, toggleShow, isSmall, toggleSmall } = useModal()

	return (
		<Modal isShowing={isShowing} hide={toggleShow} isSmall={isSmall} normal={toggleSmall}>
			<div>a child of the thing</div>
		</Modal>
	)
}

export default Location