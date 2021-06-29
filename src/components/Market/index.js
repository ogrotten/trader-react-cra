import React from 'react'
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
	return (
		<Ticker offset="run-in" speed={5} height={35}>
			{({ index }) => (
				<p style={{ margin: "0" }} >This is the Headline of element #{index}! &nbsp;&nbsp;//&nbsp;&nbsp;</p>
			)}
		</Ticker>
	)
}

export default Market