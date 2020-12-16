import React, { useState } from 'react';

import MarketTable from "./MarketTable"
import Status from "../Status/Status"
import Money from "../Money/Money"

import ITEMS from "../../data/items.json"

import "./Market.scss"

const {
	START_MONEY,
	START_DEBT,
	START_INVENTORY,
	LOCATIONS,
	TURNS
} = require("../../data/config")

const initPlayer = {
	turns: TURNS,
	current: 1,

	cash: START_MONEY,
	bank: 0,
	debt: START_DEBT,
	space: START_INVENTORY,
	location: LOCATIONS[0],

	// array index = item.id
	inv: Array(ITEMS.length).fill(0)
}

const Market = () => {
	const [player] = useState(initPlayer)

	return (
		<div className="market">
			<Status	player={player} />
			<MarketTable />
			<Money player={player}/>
		</div>
	)
}

export default Market