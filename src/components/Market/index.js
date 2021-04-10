import React, { useState, useEffect, useContext } from 'react'

import useModal from "../../hooks/useModal"

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