export const getPlacedOrder = ({ placed, unplaced }, pieceID) => (placed[pieceID] || unplaced[pieceID]).order
export const getPiece = ({ placed, unplaced }, pieceID) => placed[pieceID] || unplaced[pieceID]
export const getPlacedPieces = ({ placed }) => Object.keys(placed).map(id => placed[id])
export const getUnplacedPieces = ({ unplaced }) => Object.keys(unplaced).map(id => unplaced[id])
export const getImage = ({ game }) => game.img
export const getDimensions = ({ game: { height, width } }) => ({ height, width })
export const getGrid = ({ game: { rows, cols } }) => ({ rows, cols })
