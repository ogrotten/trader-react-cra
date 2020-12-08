import React, {useState} from 'react';
import styled from "styled-components";

import MarketTable from "./MarketTable"
import Status from "../Status/Status"
import Money from "../Money/Money"

import { d100, dAny, dRange } from "../../engines/dice"

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
	cash: START_MONEY,
	debt: 0,
	space: START_INVENTORY,
	location: LOCATIONS[0],
	
	// array index = item.id
	inv: []
}

const Market = () => {
	const [player, setPlayer] = useState(initPlayer)

	return (
		<div className="market">
			<Status week={player.week} inv={player.inv} loc={player.location} />
			<MarketTable />
			<Money />
		</div>
	)
}

export default Market