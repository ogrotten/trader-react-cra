import React, { useState, useEffect, useContext } from 'react';
import panache from "panache-react"
import { GameContext } from "./contexts/GameContext"

import Market from "./components/Market"
import Location from "./components/Location"
import GameOver from "./components/GameOver"
import GameStart from "./components/GameStart"
import { dAny } from "./engines/dice"

import './App.scss';

const Main = panache.div(({ theme, media }) => ({
	width: "100%",
	maxWidth: theme.outer.maxWidth,
	height: "100%",
	maxHeight: theme.outer.maxHeight,
	color: theme.outer.color,
	font: theme.outer.font,
	overflow: "hidden",

	position: "relative",
	display: "grid",
	gridTemplateColumns: "100%",
	gridTemplateRows: "auto 50px",
	justifyContent: "space-between",
	zIndex: 20,
	[media.small]: {
		fontSize: "14px",
	}
}))

const Container = panache.div(({ theme, media }) => ({
	width: "100vw",
	height: "100vh",
	display: "grid",
	placeItems: "center",
	backgroundColor: "black",
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

const App = () => {
	const [backImage, setBackImage] = useState("")
	const [Overlay, setOverlay] = useState(() => panache.div({
		position: "absolute",
		zIndex: "-9",
		top: "0px",
		left: "0px",
		width: "100%",
		height: "100%",
		backgroundColor: "black",
		filter: `opacity(1)`,
	}))
	const [overlayKeyFrames, setoverlayKeyFrames] = useState(
		`@keyframes fading {
			from {
				filter: opacity( 1);
			}
			to {
				filter: opacity(1);
			}
		}`
	)
	const { startGame, endGame, eventList, playerState: { currTurn } } = useContext(GameContext)

	useEffect(() => {
		if (eventList.length === 0) {
			setoverlayKeyFrames(
				`@keyframes fading {
					from {
						filter: opacity( 1);
					}
					to {
						filter: opacity(.5);
					}
				}`
			)
			setOverlay(() => panache.div({
				position: "absolute",
				zIndex: "-9",
				top: "0px",
				left: "0px",
				width: "100%",
				height: "100%",
				backgroundColor: "black",
				filter: `opacity(.5)`,
			}))
			setBackImage(`url(${allBG[dAny(allBG.length - 1)]})`)
		} else {
			setBackImage("none")
		}

	}, [eventList, currTurn])


	// #region Background image scroller setup
	const BG = panache.div({
		position: "absolute",
		zIndex: "-10",
		top: "0px",
		left: "0px",
		width: "100%",
		height: "100%",
		backgroundImage: backImage,
		backgroundPosition: "30% center",
		backgroundSize: "cover",
		filter: "brightness(1)",
		// with the below boxShadow,
		// the gradient frame is the right shape and dimension
		// but scale sticks to the image scale
		// boxShadow: "inset 0 0 15px 10px #000",
	})

	const styleSheet = document.styleSheets[0]

	const backgroundKeyFrames = backgroundKeyFramesData[dAny(backgroundKeyFramesData.length - 1)]

	styleSheet.insertRule(backgroundKeyFrames, styleSheet.cssRules.length)
	styleSheet.insertRule(overlayKeyFrames, styleSheet.cssRules.length)

	const roller = {
		animationName: "rolling",
		animationDuration: "45s",
		animationIterationCount: "infinite",
		animationDirection: "alternate",
		animationTimingFunction: "linear"
	}

	const fader = {
		animationName: "fading",
		animationDuration: ".8s",
		animationIterationCount: "1",
		animationTimingFunction: "ease-out",
	}
	// #endregion Background image scroller setup

	return (
		<Container id="container">
			<Main id="main">
				<BG id="BG" style={roller} />
				<Overlay id="overlay" style={fader} />
				{startGame() &&
					<GameStart id="GameStart" />
				}
				{endGame() &&
					<GameOver id="GameOver" />
				}
				{!startGame() && !endGame() &&
					<>
						<Market />
						<Location />
					</>
				}
			</Main>
		</Container>
	)
}

export default App;

const backgroundKeyFramesData = [
	`@keyframes rolling {
			from {
				background-position: 20% center;
			}
			to {
				background-position: 80% center;
			}
		}`,
	`@keyframes rolling {
			from {
				background-position: 80% center;
			}
			to {
				background-position: 20% center;
			}
		}`,
	`@keyframes rolling {
			from {
				transform: scale(1);
				background-position: 60% center;
			}
			to {
				transform: scale(1.3);
				background-position: 40% center;
			}
		}`,
	`@keyframes rolling {
			from {
				background-position: 40% center;
				transform: scale(1.3);
			}
			to {
				transform: scale(1);
				background-position: 60% center;
			}
		}`,
]