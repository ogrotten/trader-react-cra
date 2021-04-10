import React, { useEffect, useContext } from 'react'
import { GameContext } from "../../contexts/GameContext"
import useModal from "../../hooks/useModal"

import Modal from "../Modal"

import "./Event.scss"

const Event = ({ event, okAction }) => {
	const { eventList } = useContext(GameContext)
	const { modalShow, modalHide, isShowing } = useModal()

	useEffect(() => {
		console.log(`conlog: Event RESET`, eventList)
		if (!eventList.length > 0) {
			modalHide()
		}
	}, [eventList])

	useEffect(() => {
		modalShow()
	}, [])

	return (
		// <Modal data={data} isShowing={isShowing} hide={toggleShow} normal={false} okAction={endTransaction}>
		<Modal data={event} isShowing={isShowing} hide={modalHide} normal={false} okAction={okAction}>
			{event.body}
		</Modal>
	)
}

export default Event