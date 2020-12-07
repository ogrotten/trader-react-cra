import React, { useState, useEffect } from 'react'

import ITEMS from "../../data/items.json"


const MarketTable = () => {
	console.log(`MarketTable.js 7: `, ITEMS)
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
					<tr>
						<td className="count">991</td>
						<td className="price">9999999</td>
						<td className="name">Fluxnet</td>
						<td className="buysell-cell"><button className="buysell-button">buy</button></td>
						<td className="buysell-cell"><button className="buysell-button">sell</button></td>
					</tr>
					<tr>
						<td>992</td>
						<td>9999999</td>
						<td>Solo</td>
						<td className="buysell-cell"><button className="buysell-button">buy</button></td>
						<td className="buysell-cell"><button className="buysell-button">sell</button></td>
					</tr>
					<tr>
						<td>993</td>
						<td>9999999</td>
						<td>Zillion</td>
						<td className="buysell-cell"><button className="buysell-button">buy</button></td>
						<td className="buysell-cell"><button className="buysell-button">sell</button></td>
					</tr>
					<tr>
						<td>997</td>
						<td>9999999</td>
						<td>Valeradone</td>
						<td className="buysell-cell"><button className="buysell-button">buy</button></td>
						<td className="buysell-cell"><button className="buysell-button">sell</button></td>
					</tr>
					<tr>
						<td>994</td>
						<td>9999999</td>
						<td>Altered Calm</td>
						<td className="buysell-cell"><button className="buysell-button">buy</button></td>
						<td className="buysell-cell"><button className="buysell-button">sell</button></td>
					</tr>
					<tr>
						<td>995</td>
						<td>9999999</td>
						<td>Nails</td>
						<td className="buysell-cell"><button className="buysell-button">buy</button></td>
						<td className="buysell-cell"><button className="buysell-button">sell</button></td>
					</tr>
					<tr>
						<td>996</td>
						<td>9999999</td>
						<td>Hyfit</td>
						<td className="buysell-cell"><button className="buysell-button">buy</button></td>
						<td className="buysell-cell"><button className="buysell-button">sell</button></td>
					</tr>
					<tr>
						<td>998</td>
						<td>9999999</td>
						<td>Nanozine</td>
						<td className="buysell-cell"><button className="buysell-button">buy</button></td>
						<td className="buysell-cell"><button className="buysell-button">sell</button></td>
					</tr>
				</tbody>
			</table>
		</section>
	)
}

export default MarketTable;