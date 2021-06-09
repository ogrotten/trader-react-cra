import React from 'react'

import MarketTable from "../MarketTable"
import Status from "../Status"
import Money from "../Money"
import Event from '../Event';

import "./Market.scss"

const Market = () => {

	return (
		<div className="market">
			<Event />
			<Status />
			<MarketTable />
			<Money />
		</div>
	)
}

export default Market