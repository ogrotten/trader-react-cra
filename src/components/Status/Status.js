import React from 'react';
import styled from "styled-components";

import { d100, dAny, dRange } from "../../engines/dice"

import "./Status.scss"

const Status = (props) => {
	console.log(`Status.js 9: `, props.player)
	const {inv, turns, current, location, space} = props.player

	const totalInv = inv.reduce((total, current) => total + current)
	// const totalInv=0

	return (
		<section className="status">
			<div className="inv">Inv: {totalInv} / {space} </div>
			<div className="week">Week: {current} / {turns} </div>
			<div className="loc">{location}</div>
		</section>
	)
}

export default Status