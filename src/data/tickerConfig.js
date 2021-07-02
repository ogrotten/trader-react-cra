import { dAny } from "../engines/dice"

export const tickerConfig = [
	{
		chance: 100,
		get text() {
			const song = this.song[dAny(this.song.length - 1)]
			const where = this.where[dAny(this.where.length - 1)]
			return `${where} ${song}`
		},
		song: [
			'"Don\'t Stop Believin\'" by Journey',
			'"You Shook Me All Night Long" by AC / DC',
			'"Love Shack" by B - 52\'s',
			'"Livin\' On A Prayer" by Bon Jovi',
			'"Pour Some Sugar On Me" by Def Leppard',
			'"Beat It" by Michael Jackson',
			'"Celebration" by Kool & The Gang',
			'"Footloose" by Kenny Loggins',
			'"Thriller" by Michael Jackson',
			'"Girls Just Want To Have Fun" by Cyndi Lauper',
			'"Pretty Young Thing(P.Y.T)" by Michael Jackson',
			'"Push It" by Salt - N - Pepa',
			'"Bust A Move" by Young M.C.',
			'"U Can\'t Touch This" by MC Hammer ',
			'"Black Or White" by Michael Jackson',
			'"Gangsta\'s Paradise" by Coolio ',
			'"Mmmbop" by Hanson',
			'"Smells Like Teen Spirit" by Nirvana',
			'"More Than Words" by Extreme',
			'"The Sign" by Ace of Base',
			'"Baby, One More Time" by Britney Spears',
			'"Everything I Do I Do It For You" by Bryan Adams',
			'"Under The Bridge" by Red Hot Chili Peppers',
			'"To Be With You" by Mr Big',
			'"Mambo Number 5(A Little Bit Of...)" by Lou Bega',
			'"Zombie" by Cranberries',
			'"Ice Ice Baby" by Vanilla Ice',
			'"Macarena" by Los Del Rio',
		],
		where: [
			"walk by a taco bowl joint"
		]
	}
]

