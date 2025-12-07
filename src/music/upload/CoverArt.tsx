import type { ImageFormat } from "./ID3Tag/types"

type CoverArtProps = {
	data?: Uint8Array<ArrayBufferLike>
	format?: ImageFormat
}

const CoverArt = ({data}: CoverArtProps) => {
	if (data) {
		const url = URL.createObjectURL(new Blob([new Uint8Array(data).buffer]))
		return <div clazz="field cover-art">
			<h3>Cover Art</h3>
			<img src={url} onLoad={() => URL.revokeObjectURL(url)} />
		</div>
	}
	else return null
}

export default CoverArt