import { useState } from "react"

const useModal = () => {
	const [isShowing, setIsShowing] = useState(false)
	const [isSmall, setIsSmall] = useState(true)

	function modalShow() {
		setIsShowing(true)
	}

	function modalHide() {
		setIsShowing(false)
	}

	function modalSmall() {
		setIsSmall(true)
	}

	function modalLarge() {
		setIsSmall(false)
	}

	return {
		isShowing, isSmall,
		modalShow, modalHide,
		modalSmall, modalLarge
	}
}

export default useModal