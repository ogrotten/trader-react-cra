import { useState } from "react"


const useDice = () => {
	const d100 = () => {
		return Math.ceil(Math.random() * 100)
	}

	const dAny = (x) => {
		return Math.ceil(Math.random() * x)
	}

	const dRange = (n, x) => {
		range = x - (n + 1)
		return Math.ceil(Math.random() * range) + (n - 1)
	}

	return { d100, dAny, dRange }
}

export default useDice