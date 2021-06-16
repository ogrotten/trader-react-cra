import React, { useContext } from 'react';
import panache from "panache-react"
import { GameContext } from "./contexts/GameContext"

import Market from "./components/Market"
import Location from "./components/Location"
import GameOver from "./components/GameOver"
import GameStart from "./components/GameStart"
import { dAny } from "./engines/dice"

import './App.scss';

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

const Main = panache.div({
	width: 432,
	height: 768,
	color: "#f22",
})

const BG = panache.div({
	position: "absolute",
	zIndex: "-10",
	// zIndex: "100",
	top: "0px",
	left: "0px",
	width: "432px",
	height: "768px",
	backgroundImage: `url(${allBG[dAny(allBG.length - 1)]})`,
	// backgroundImage: `url(${allBG[7]})`,
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