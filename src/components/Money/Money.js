import React from 'react';
import styled from "styled-components";

import { d100, dAny, dRange } from "../../engines/dice"

import "./Money.scss"

const Money = () => {
	return (
		<section className="money">
			<div className="cash">Cash: $$$</div>
			<div className="inv">Bank: ...</div>
			<div className="week">Debt: ...</div>
		</section>
	)
}

export default Money