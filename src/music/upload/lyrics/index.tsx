import type { ID3Tags } from "../ID3Tag/types"

export default (input: ID3Tags): string[] | undefined => {
	return input.lyrics?.lyrics?.split('\r\n')?.filter(l => !!l)
}