import React, { useState, useEffect, useContext } from 'react'
import { GameContext } from "../../contexts/GameContext"
import Ticker from "react-ticker"

import MarketTable from "../MarketTable"
import Status from "../Status"
import Money from "../Money"
import Event from '../Event';

import "./Market.scss"

const Market = () => {

	return (
		<div className="market">
			<Status />
			<MarketTable />
			<EventsTicker />
			<Money />
			<Event />
		</div>
	)
}

const EventsTicker = () => {
	const [tickerDisplay, setTickerDisplay] = useState("")
	const { eventList, tickerList } = useContext(GameContext)

	useEffect(() => {
		if (eventList.length === 0 && tickerList.length > 0) {
			setTickerDisplay(tickerList.map((item, i) => {
				return (<span key={i}>{item}&nbsp;&nbsp;//&nbsp;&nbsp;</span>)
			}))
		}
	}, [eventList])

	useEffect(() => {
		console.log()
	}, [tickerDisplay])

	return (
		<Ticker offset="run-in" speed={5} height={35}>
			{({ index }) => (
				tickerDisplay !== ""
					? < p style={{ margin: "0" }} >{tickerDisplay}</p>
					: ".  "
			)
			}
		</Ticker >
	)
}

export default Market