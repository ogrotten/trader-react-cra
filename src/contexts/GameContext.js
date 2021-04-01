import React, { useState, useEffect, createContext } from 'react'

const GameContext = createContext()

const GameProvider = ({ children }) => {
	const check = (x) => {
		return
	}

	return (
		<GameContext.Provider
			value={{ check }}
		>
			{children}
		</GameContext.Provider>
	)
}

export { GameContext, GameProvider }