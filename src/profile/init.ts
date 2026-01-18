import { type Callbacks } from '@bsgbryan/rnzlr'

import Profile from './component'

export default ({ render }: Callbacks) => {
	console.log("Init'ing Profile component")

	setTimeout(async () => {
		console.log('Calling api')
		const data = await fetch('//localhost:1138/user/bsgbryan')
		const info = await data.json()
		console.log('Got data from api', info)
		render(Profile, info)
	}, 1000)

	return Profile({})
}
