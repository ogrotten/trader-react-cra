import React from 'react';
import styled from "styled-components";

import MarketTable from "./MarketTable"

import { d100, dAny, dRange } from "../../engines/dice"

import "./Market.scss"

const Market = () => {
	return (
		<MarketTable />
	)
}

export default Market