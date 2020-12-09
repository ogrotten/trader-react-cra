
// const roll = () => {
export const d100 = () => {
	return Math.ceil(Math.random() * 100)
}

export const dAny = (x) => {
	return Math.ceil(Math.random() * x)
}

export const dRange = (lo, hi) => {
	if (hi < lo) {
		return lo
	} else {
		const range = hi - (lo - 1)
		return Math.ceil(Math.random() * range) + (lo - 1)
	}
}

export function dicetest(lo, hi) {
	/* 
	
	For dicetest output, put this in the component return.
	
	const m = dicetest();
	<ul>
		{
			m.map((e, i) => {
				return <li key={i}>{i} count {e}</li>
			})
		}
	</ul>
	
	 */
	let i = 0
	let result = new Array(20).fill(0)
	while (i < 1000) {
		let roll = dRange(lo, hi)
		result[roll] += 1
		i++
	}

	console.table(result)

	// return result
}