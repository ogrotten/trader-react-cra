import React from 'react';
import styled from "styled-components";

import { d100, dAny, dRange } from "../../engines/dice"

import "./Infobar.scss"

const Infobar = () => {
	return (
		<section className="infobar">
			<div className="cash">Cash: $$$</div>
			<div className="inv">Inv: ...</div>
			<div className="week">Week: ...</div>
			<div className="loc">Loc</div>
		</section>
	)
}

export default Infobar