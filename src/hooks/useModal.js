import { useState } from "react"

const useModal = () => {
	const [isShowing, setIsShowing] = useState(false)
	const [isSmall, setIsSmall] = useState(false)

	function toggleShow() {
		setIsShowing(!isShowing)
		// if (isShowing === true) {
		// 	setIsShowing(false)
		// 	setIsSmall(false)
		// } else {
		// 	setIsShowing(true)
		// }
	}

	function toggleSmall() {
		setIsSmall(!isSmall)
	}

	return {
		isShowing,
		toggleShow,
		isSmall,
		toggleSmall
	}
}

export default useModal