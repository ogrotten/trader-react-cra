import React, { useState, useEffect, useContext } from 'react'
import { GameContext } from "../../contexts/GameContext"

import useModal from "../../hooks/useModal"

import MarketTable from "../MarketTable"
import Status from "../Status"
import Money from "../Money"
import Event from '../Event';

import "./Market.scss"

const Market = () => {
	const [currEvent, setCurrEvent] = useState({})
	const { eventList, remvEvent } = useContext(GameContext)
	const { toggleShow } = useModal()

	const nextEvent = () => {
		console.log(`conlog: next plz`,)
		remvEvent()
		toggleShow()
	}

	useEffect(() => {
		console.log(`conlog: Event USEE`, eventList)
		if (eventList?.length > 0) {
			setCurrEvent({ ...eventList[0] })
		}
	}, [eventList])

	return (
		<div className="market">
			<Event event={currEvent} okAction={nextEvent} />
			<Status />
			<MarketTable />
			<Money />
		</div>
	)
}

export default Market