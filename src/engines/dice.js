
// const roll = () => {
export const d100 = () => {
	return Math.ceil(Math.random() * 100)
}

export const dAny = (x) => {
	return Math.ceil(Math.random() * x)
}

export const dRange = (n, x) => {
	const range = x - (n - 1)
	return Math.ceil(Math.random() * range) + (n - 1)
}

	// return {d100, dAny, dRange}
// }

// export default roll