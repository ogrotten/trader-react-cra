import { useState } from "react"

const useModal = () => {
	const [isShowing, setIsShowing] = useState(false)
	const [isSmall, setIsSmall] = useState(true)

	function toggleShow() {
		setIsShowing(!isShowing)
	}

	//* use toggleSmall when you want the Big Modal
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