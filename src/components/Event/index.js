import React, { useState, useEffect, useContext } from 'react'
import Modal from "../Modal"

import useModal from "../../hooks/useModal"

import "./Event.scss"

const Event = ({ event, okAction }) => {
	const { isShowing, toggleShow } = useModal()

	useEffect(() => {
		toggleShow()
	}, [])

	return (
		// <Modal data={data} isShowing={isShowing} hide={toggleShow} normal={false} okAction={endTransaction}>
		<Modal data={event} isShowing={isShowing} hide={toggleShow} normal={false} okAction={okAction}>
			{event.body}
		</Modal>
	)
}

export default Event