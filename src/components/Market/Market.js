import React from 'react';
import styled from "styled-components";

import MarketTable from "./MarketTable"
import Status from "../Status/Status"
import Money from "../Money/Money"


import { d100, dAny, dRange } from "../../engines/dice"

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