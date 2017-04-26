import arrayShuffle from 'array-shuffle'

export const generatePieces = ({ img, width, height, rows, cols }, cb) => {
	const randomPieceOrder = arrayShuffle(Array(rows * cols).fill(0).map((_, i) => i))
	const colWidth = width / cols
	const rowHeight = height / rows
	return 'r'
		.repeat(cols)
		.split('')
		.forEach((_r, r) =>
			'c'
				.repeat(rows)
				.split('')
				.forEach((_c, c) => cb({
					img,
					x: colWidth * r,
					y: rowHeight * c,
					width: colWidth,
					height: rowHeight,
					pieceID: (c * cols) + r,
					order: randomPieceOrder[(c * cols) + r],
				}))
		)
}

export const generateBlanks = ({
	pieces,
	rows,
	cols,
	place,
	storeState,
}) => {
	const blanks = []
	const totalPieces = (rows * cols)

	const alreadyUsedOrders = pieces.reduce((acc, { order }) => {
		acc[order] = true
		return acc
	}, {})
	for (let order = 0; order < totalPieces; order++) {
		if (!alreadyUsedOrders[order]) {
			blanks.push({
				order,
				place: place(storeState, order),
			})
		}
	}
	return blanks
}
