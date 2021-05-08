import React, { useState, useContext } from 'react';
import { GameContext } from "../../contexts/GameContext"

import useModal from "../../hooks/useModal"
import Modal from "../Modal"

// import styled from "styled-components";

// import { d100, dAny, dRange } from "../../engines/dice"

import "./Money.scss"

const Money = (props) => {
	const [data, setData] = useState({})
	const { playerState: { cash, bank, debt, position } } = useContext(GameContext)
	const { modalShow, modalHide, isShowing } = useModal()

	const handleBank = () => {
		setData({
			title: "Gonk National Bank",
			type: "Bank",
			eventAction,
		})
		modalShow()
	}
	const handleShark = () => {
		setData({
			title: "Fast Eddies, LLC",
			type: "Shark",
			eventAction,
		})
		modalShow()
	}

	const eventAction = () => {

	}

	return (
		<section className="money">
			<div className="cash">Cash: {cash}</div>
			<div className="bank">
				Bank: {bank}
				{position === 1 &&
					<>
						<br />
						<button className="buysell-button" onClick={handleBank}>Go to Bank</button>
					</>
				}
			</div>
			<div className="debt">
				Debt: {debt}
				{position === 1 &&
					<>
						<br />
						<button className="buysell-button" onClick={handleShark}>Visit Loan Shark</button>
					</>
				}
			</div>
			<Modal data={data}
				isShowing={isShowing}
				hide={modalHide}
				normal={false}
			>
				{data.type} Window
			</Modal>
		</section>
	)
}

export default Money