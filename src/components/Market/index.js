import React from 'react';
import MarketTable from "../MarketTable"
import Status from "../Status"
import Money from "../Money"

import "./Market.scss"

const Market = () => {

	return (
		<div className="market">
			<Status />
			<MarketTable />
			<Money />
		</div>
	)
}

export default Market