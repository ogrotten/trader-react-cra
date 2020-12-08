import React from 'react';
import styled from "styled-components";

import { d100, dAny, dRange } from "../../engines/dice"

import "./Status.scss"

const Status = () => {
	return (
		<section className="status">
			<div className="inv">Inv: ### / ###</div>
			<div className="week">Week: ...</div>
			<div className="loc">Loc</div>
		</section>
	)
}

export default Status