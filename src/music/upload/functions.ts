import { process } from "./ID3Tag"

export const readTags = (render: CallableFunction) =>
	// @ts-expect-error
	(event) => {
		const file = event.target.files[0]
		// @ts-expect-error
		window.jsmediatags.read(file, {
			// @ts-expect-error
			onSuccess: (obj) => {
				const processed = process(obj.tags)
				console.log(processed)
				render(processed)
			},
			onError: console.log
		})
	}