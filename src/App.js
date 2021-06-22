import React, { useContext } from 'react';
import panache from "panache-react"
import { GameContext } from "./contexts/GameContext"

import Market from "./components/Market"
import Location from "./components/Location"
import GameOver from "./components/GameOver"
import GameStart from "./components/GameStart"
import { dAny } from "./engines/dice"

import './App.scss';

const Main = panache.div(({ theme, media }) => ({
	width: theme.outer.width,
	height: theme.outer.height,
	color: theme.outer.color,
}))

// #region Randomized background image 
function importBG(incoming) {
	let images = {}
	incoming.keys().forEach((item, i) => {
		images[item.replace('./', '')] = incoming(item)
	})

	let imgArray = []
	Object.values(images).forEach(item => {
		imgArray.push(Object.values(item)[0])
	});

	return imgArray
}
const allBG = importBG(require.context('./data/backgrounds/cities', false, /\.(png|jpe?g|svg)$/))
// #endregion

// #region Background image scroller setup
const BG = panache.div({
	position: "absolute",
	zIndex: "-10",
	top: "0px",
	left: "0px",
	width: "432px",
	height: "768px",
	backgroundImage: `url(${allBG[dAny(allBG.length - 1)]})`,
	backgroundPosition: "30% center",
	backgroundSize: "cover",
	filter: "brightness(1)"
})

const Overlay = panache.div({
	position: "absolute",
	zIndex: "-9",
	top: "0px",
	left: "0px",
	width: "432px",
	height: "768px",
	backgroundColor: "black",
	filter: "opacity(0.5)"
})

const styleSheet = document.styleSheets[0]

const bgKeyFrames =
	`@keyframes rolling {
	from {background-position: 20% center;}
	to {background-position: 80% center;}
	}`

styleSheet.insertRule(bgKeyFrames, styleSheet.cssRules.length)

const roller = {
	animationName: "rolling",
	animationDuration: "45s",
	animationIterationCount: "infinite",
	animationDirection: "alternate",
	animationTimingFunction: "linear"
}
// #endregion Background image scroller setup

const App = () => {
	const { startGame, endGame, } = useContext(GameContext)

	return (
		<div className="container">
			<Main id="main" className="main">
				<BG style={roller} />
				<Overlay />
				{startGame() &&
					<GameStart />
				}
				{endGame() &&
					<GameOver />
				}
				{!startGame() && !endGame() &&
					<>
						<Market />
						<Location />
					</>
				}
			</Main>
			{/* </Backgrounder> */}
		</div>
	)
}

export default App;