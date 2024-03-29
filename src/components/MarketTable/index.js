import React, { useState, useEffect, useContext } from 'react'

import { GameContext } from "../../contexts/GameContext"

import useModal from "../../hooks/useModal"
import Modal from "../Modal"
import { d100, dRange } from "../../engines/dice"
import { BuyModal } from './BuyModal'
import { SellModal } from './SellModal'

import "./MarketTable.scss"

// Set the minimum count of available items from global config

const defaultData = {
	avail: false,
	id: null,
	marketorder: [],
	name: "",
	price: 0,
	type: "",
	title: ""
}

const MarketTable = () => {
	const [List, setList] = useState([])
	const [data, setData] = useState(defaultData)
	const [transactionCount, setTransactionCount] = useState(0)
	const { modalShow, modalHide, isShowing } = useModal()
	const {
		playerState,
		playerState: { currTurn, inv, cash, },
		addEvent,
		buyItem, sellItem,
		changeInventory,
		changeNetWorth,
		gameConfig: { ITEMS, RANGES, MINIMUM_AVAILABLE }
	} = useContext(GameContext)

	const endTransaction = () => {
		if (data.type === "Buy") {
			buyItem(data.price, transactionCount)
			changeInventory(data.id, transactionCount)
		} else if (data.type === "Sell") {
			sellItem(data.price, transactionCount)
			changeInventory(data.id, transactionCount * -1)
		} else { console.warn(`BUY SELL PROBLEM: `, data.type) }

		setTransactionCount(0)
		modalHide()
	}

	const beginTransaction = (data, type) => {
		modalShow()
		setData({ ...data, type })
	}

	useEffect(() => {
		setList(marketMath(ITEMS, RANGES, MINIMUM_AVAILABLE))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currTurn])

	useEffect(() => {
		let networth = 0
		List.forEach((item, i) => {
			if (item.event === true) {
				const tickertext = `${item.name} ${ITEMS[i].spikeType === "low" ? "floods the market" : "is selling sky high"}!`
				addEvent({
					type: "event",
					title: tickertext,
					body: `${item.name} prices are really ${ITEMS[i].spikeType}!`,
					ticker: tickertext
				})
			}
			networth += (item.price * playerState.inv[i])
		})
		changeNetWorth(networth + playerState.cash)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [List])

	// useEffect(() => {
	// 	setList(marketMath(ITEMS, RANGES, MINIMUM_AVAILABLE))
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [currTurn])

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
					{List.map((el, i) => {
						if (el.avail === true) {
							return (<tr key={el.id} className={el.event ? "event-row" : "market-row"}>
								<td className="price">{el.price}</td>
								<td className="inv">{inv[i]}</td>
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
								<td className="inv">{
									inv[i] > 0
										? inv[i]
										: <span>&nbsp;</span>
								}</td>
								<td className="name">{el.name}</td>
								<td className="buysell-cell">&nbsp;</td>
								<td className="buysell-cell">&nbsp;</td>
							</tr>)
						}
					})}
				</tbody>
			</table>


			{
				{
					"Buy": data.price < cash
						? <Modal data={data} isShowing={isShowing} hide={modalHide} normal={false} okAction={endTransaction}><BuyModal data={data} transaction={{ transactionCount, setTransactionCount }} /></Modal>
						: <Modal isShowing={isShowing} hide={modalHide} normal={false} data={{ type: "broke", title: "Broke ass." }}>
							<div>
								<p>Your broke ass doesn't have enough money.</p>
							</div>
						</Modal>,
					"Sell": <Modal data={data} isShowing={isShowing} hide={modalHide} normal={false} okAction={endTransaction}><SellModal data={data} transaction={{ transactionCount, setTransactionCount }} /></Modal>
				}[data.type]
			}
		</section>
	)
}

export default MarketTable;


function marketMath(allItems, allRanges, MINIMUM_AVAILABLE) {
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
		const cutoff = dRange(MINIMUM_AVAILABLE, pricelist.length)
		pricelist.forEach((e, i) => {
			(e.marketorder < cutoff) ? e.avail = true : e.avail = false
		});
	}

	allItems.forEach((e, i) => {
		if (d100() < e.spikeChance) {
			pricelist[i].price = price(+e.spikemin, +e.spikemax, -11, 1) // "normal, wide"
			pricelist[i].avail = true
			pricelist[i].event = true
		}
	})

	return pricelist
}

export function price(pricemin, pricemax, skewwidth, skewdir) {

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
			// console.error(`PROBLEM >>> items.js 44 ${num} > ${max}`)
			num = randn_bm(min, max, skew)
		}
		return num;
	}

	if (overmax > 0) {
		// console.error(`PROBLEM >>> items.js 51 overmax ${overmax}`)
	}

	return Math.round(randn_bm(pricemin, pricemax, skewdir));
}
