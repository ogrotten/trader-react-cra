import React, { useState, useEffect, useCallback } from 'react'

import useModal from "../../hooks/useModal"

import Modal from "../Modal/Modal"
import ITEMS from "../../data/items.json"
import RANGES from "../../data/pricerange.json"
import { d100, dRange } from "../../engines/dice"

import "./MarketTable.scss"

// Set the minimum count of available items from global config
const { MINIMUM_AVAILABLE } = require("../../data/config")

const MarketTable = () => {
	const [List, setList] = useState([])
	const { isShowing, toggleShow, isSmall, toggleSmall } = useModal()

	const marketGet = useCallback((allItems, allRanges) => {
		// list array that will be set into state
		let pricelist = []
		// count available items
		let availcount = 0
		allItems.forEach(e => {
			// see const pricerange at the bottom
			// const rangeNew = pricerange(+e.pricerange, allRanges);
			const rangeNew = allRanges[e.pricerange]

			let avail = {
				price: price(+e.pricemin, +e.pricemax, rangeNew.width, rangeNew.side),
				name: e.name,
				id: e.id
			}
			if (d100() < e.availability) {
				avail.avail = true
				pricelist.unshift(avail)
				availcount += 1
			} else {
				avail.avail = false
				pricelist.push(avail)
			}
		})

		pricelist.forEach(e => {
			e.marketorder = pricelist.indexOf(e)
		})

		pricelist.sort((a, b) => (a.id > b.id) ? 1 : -1)

		if (availcount < MINIMUM_AVAILABLE) {
			console.log(`Short...`,)
			const cutoff = dRange(MINIMUM_AVAILABLE, pricelist.length)
			pricelist.forEach((e, i) => {
				(e.marketorder < cutoff) ? e.avail = true : e.avail = false
			});
		}

		setList(pricelist)
	}, [])

	const price = (pricemin, pricemax, skewwidth, skewdir) => {

		let overmax = 0

		const randn_bm = (min, max, skew) => {
			var u = 0,
				v = 0;
			while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
			while (v === 0) v = Math.random();
			let num = Math.sqrt(skewwidth * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
			num = num / 10.0 + 0.5; // Translate to 0 -> 1
			if (num > max) {
			}

			if ((num > 1 || num < 0) || u < 0.001) num = randn_bm(min, max, skew); // resample between 0 and 1 if out of range

			num = Math.pow(num, skew); // Skew
			num *= max - min; // Stretch to fill range
			num += min; // offset to min
			if (num > max) {
				overmax++
				console.error(`PROBLEM >>> items.js 44 ${num} > ${max}`)
				num = randn_bm(min, max, skew)
			}
			return num;
		}

		if (overmax > 0) {
			console.error(`PROBLEM >>> items.js 51 overmax ${overmax}`)
		}


		return Math.round(randn_bm(pricemin, pricemax, skewdir));
	}

	const buysell = (e) => {
		toggleShow()
		toggleSmall()
	}

	useEffect(() => {
		marketGet(ITEMS, RANGES)
	}, [marketGet])

	return (
		<section className="market-table">
			<table>
				<thead>
					<tr>
						<th>Price</th>
						<th>Inv</th>
						<th>Name</th>
						<th>&nbsp;</th>
						<th>&nbsp;</th>
					</tr>
				</thead>
				<tbody>
					{List.map(e => {
						if (e.avail === true) {
							return (<tr key={e.id} className="market-row">
								<td className="price">{e.price}</td>
								<td className="inv">99{e.id}</td>
								<td className="name">{e.name}</td>
								<td className="buysell-cell">
									<button value="buy" className="buysell-button" onClick={buysell}>buy</button>
								</td>
								<td className="buysell-cell">
									<button value="sell" className="buysell-button" onClick={buysell}>sell</button>
								</td>
							</tr>)
						} else {
							return (<tr key={e.id}>
								<td className="price">&nbsp;</td>
								<td className="inv">&nbsp;</td>
								<td className="name">{e.name}</td>
								<td className="buysell-cell">&nbsp;</td>
								<td className="buysell-cell">&nbsp;</td>
							</tr>)
						}
					})}
				</tbody>
			</table>
			<Modal isShowing={isShowing} hide={toggleShow} isSmall={isSmall} normal={toggleSmall} />
		</section>
	)
}

export default MarketTable;

// const pricerange = (one, all) => {

// 	// for random priceranges rerolled per city!
// 	// Must change the pricerange.json to the old format
// 	/* 
// 		[
// 			{
// 				"NAR_LO":{
// 				"description": "narrow range, skew low",
// 				"width": -1.2,
// 				"side": 1.6
// 				}
// 			},
// 			{
// 				"NAR_HI":{
// 				"description": "narrow range, skew high",
// 				"width": -1.2,
// 				"side": 0.6
// 				}
// 			}
// 		]
// 	 */

// 	if (one === -1) {
// 		return dRange(0, all[all.length - 1])

// 	} else {
// 		return all[one]
// 	}

// }
