import type { ID3Tags } from "./upload/ID3Tag/types";

export default (input: ID3Tags): string => {
	const woar = input.WOAR.data

	const comment = input.
		comment.
		text.
		split('\r\n')[0]?.
		trim()

	return comment || woar
}