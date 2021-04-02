import React, { useState, useEffect, useCallback, useContext } from 'react'

import { GameContext } from "../../contexts/GameContext"

import useModal from "../../hooks/useModal"

import Modal from "../Modal"
import ITEMS from "../../data/items.json"
import RANGES from "../../data/pricerange.json"
import { d100, dRange } from "../../engines/dice"

import "./MarketTable.scss"
import { BuyModal } from './BuyModal'

// Set the minimum count of available items from global config
const { MINIMUM_AVAILABLE } = require("../../data/config")
const defaultData = {
	avail: false,
	id: null,
	marketorder: null,
	name: null,
	price: 0,
	type: null,
}

const MarketTable = () => {
	const [List, setList] = useState([])
	const [data, setData] = useState(defaultData)
	const [transactionCount, setTransactionCount] = useState(0)
	const { buyItem, changeInventory } = useContext(GameContext)
	const { isShowing, toggleShow } = useModal()

	const marketGet = useCallback(() => marketMath(ITEMS, RANGES), [])

	const endTransaction = () => {
		console.log(`conlog: endTransaction`,)
		buyItem(data.price, transactionCount)
		changeInventory(data.id, transactionCount)
		toggleShow()
	}

	const beginTransaction = (data, type) => {
		toggleShow()
		setData({ ...data, type })
	}

	useEffect(() => {
		setList(marketGet)
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
					{List.map(el => {
						if (el.avail === true) {
							return (<tr key={el.id} className="market-row">
								<td className="price">{el.price}</td>
								<td className="inv">99{el.id}</td>
								<td className="name">{el.name}</td>
								<td className="buysell-cell">
									<button className="buysell-button" onClick={
										() => beginTransaction(el, "Buy")
									}>buy</button>
								</td>
								<td className="buysell-cell">
									<button className="buysell-button" onClick={
										() => beginTransaction(el, "Sell")
									}>sell</button>
								</td>
							</tr>)
						} else {
							return (<tr key={el.id}>
								<td className="price">&nbsp;</td>
								<td className="inv">&nbsp;</td>
								<td className="name">{el.name}</td>
								<td className="buysell-cell">&nbsp;</td>
								<td className="buysell-cell">&nbsp;</td>
							</tr>)
						}
					})}
				</tbody>
			</table>
			<Modal data={data} isShowing={isShowing} hide={toggleShow} normal={false} okAction={endTransaction}>
				<BuyModal data={data} transaction={{ transactionCount, setTransactionCount }} />
			</Modal>
		</section>
	)
}

export default MarketTable;


function marketMath(allItems, allRanges) {
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

	return pricelist
}

function price(pricemin, pricemax, skewwidth, skewdir) {

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