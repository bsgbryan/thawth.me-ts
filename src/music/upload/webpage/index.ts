import type { ID3Tags } from "../ID3Tag/types"

export default (input: ID3Tags): string | undefined => {
	const woar = input.WOAR?.data

	const comment = input.
		comment?.
		text?.
		split('\r\n')[0]?.
		trim() ?? false

	return comment || woar
}
