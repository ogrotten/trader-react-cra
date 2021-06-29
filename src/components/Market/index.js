import React from 'react'
import panache from "panache-react"
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

const TickerP = panache.div({
	color: "green",
	height: "100%",
	margin: "10px ",
})

const EventsTicker = () => {
	return (
		<Ticker class="ticker" offset="run-in" speed={5} height={40}>
			{({ index }) => (
				<TickerP>This is the Headline of element #{index}! &nbsp;&nbsp;&nbsp;::&nbsp;&nbsp;&nbsp;</TickerP>
			)}
		</Ticker>
	)
}

export default Market