import { render } from "@bsgbryan/rnzlr"

const url = new URL(window.location.href)

console.log('path', url.pathname)

const container = document.querySelector('body > main')!

const load = async (path: string) => {
	const component = (await import(`.${path}`)).default
	render(component(), container)
}

if (url.pathname === '/') load('/root')
else load(url.pathname)

export default () => <p>index</p>
