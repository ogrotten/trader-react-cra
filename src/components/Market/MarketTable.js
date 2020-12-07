import React, { useState, useEffect } from 'react'

import ITEMS from "../../data/items.json"
import RANGES from "../../data/pricerange.json"
import PR from "../../data/pr.json"
import {d100, dAny, dRange} from "../../engines/dice"

const MarketTable = () => {
	console.log(`MarketTable.js 8: `, PR["NORMAL"])
	const [List, setList] = useState({})
	
	const makeList = () => {
		let templist = {}
		
	}

	return (
		<section className="market-table">
			<table>
				<thead>
					<tr>
						<th>#</th>
						<th>Price</th>
						<th>Name</th>
						<th>&nbsp;</th>
						<th>&nbsp;</th>
					</tr>
				</thead>
				<tbody>
					{ITEMS.map((e) => {
						return (
							<tr key={e.id}>
								<td className="count">99{e.id}</td>
								<td className="price">{e.pricemax}</td>
								<td className="name">{e.name}</td>
								<td className="buysell-cell"><button className="buysell-button">buy</button></td>
								<td className="buysell-cell"><button className="buysell-button">sell</button></td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</section>
	)
}

export default MarketTable;