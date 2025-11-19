import { process } from "./ID3Tag"

import type {
	OST,
	PositionInCount,
	Published,
	RemixOfOSTTrack,
} from "./types"

const artist = (name: string, contributions: string[], element: HTMLElement) => {
	const node = document.createElement('li')
	const name_element = document.createElement('p')
	const contributions_node = document.createElement('ul')
	
	name_element.textContent = name
	
	for (const c of contributions) {
		const contribution_node = document.createElement('li')
		const contributions_element = document.createElement('p')

		contributions_element.textContent = c
		
		contribution_node.appendChild(contributions_element)
		contributions_node.appendChild(contribution_node)
	}
	
	node.appendChild(name_element)
	node.appendChild(contributions_node)
	
	element.appendChild(node)
}

const artists = (data: RemixOfOSTTrack) => {
	const primary_element = document.querySelector('#song .artists.field ul.primary')! as HTMLImageElement
	const primary = data.artists.primary

	for (const [name, contributions] of Object.entries(primary))
		artist(name, contributions, primary_element)

	const featuring_element = document.querySelector('#song .artists.field ul.featuring')! as HTMLImageElement
	const featuring = data.artists.featuring

	for (const [name, contributions] of Object.entries(featuring))
		artist(name, contributions, featuring_element)
}

const cover_art = (data: RemixOfOSTTrack) => {
	const cover_art = document.querySelector('#song .cover-art.field img')! as HTMLImageElement
	const url = URL.createObjectURL(new Blob([new Uint8Array(data.cover_art.data).buffer]))
	cover_art.src = url
	cover_art.onload = e => URL.revokeObjectURL(url)
}

const encoder = (name?: string, email?: string) => {
	const node = document.createElement('li')

	if (name) {
		const nameNode = document.createElement('p')

		nameNode.setAttribute('class', 'name')
		nameNode.textContent = name

		node.appendChild(nameNode)
	}

	if (email) {
		const emailNode = document.createElement('p')

		emailNode.setAttribute('class', 'email')
		emailNode.textContent = email
	
		node.appendChild(emailNode)
	}

	return node
}

const encoders = (data: RemixOfOSTTrack) => {
	const element = document.querySelector('#song .encoders.field ul')!

	for (const e of data.encoded_by) element.appendChild(encoder(e.name, e.email))
}

const field = (name: keyof RemixOfOSTTrack, data: RemixOfOSTTrack) => {
	if (data[name]) {
		const album = document.querySelector(`#song .${(name as string).replaceAll('_', '-')}.field p`)!
	
		album.textContent = data[name] as string
	}
}

const ost = (data: RemixOfOSTTrack) => {
	subfield<OST>('ost', 'copyright', data)
	subfield<OST>('ost', 'composer', data)
	subfield<OST>('ost', 'console', data)
	subfield<OST>('ost', 'game', data)
	subfield<OST>('ost', 'title', data)
}

const position_in_count = (name: 'collection' | 'track', data: RemixOfOSTTrack) => {
	subfield<PositionInCount>(name, 'position', data)
	subfield<PositionInCount>(name, 'count', data)
}

const subfield = <T,>(name: keyof RemixOfOSTTrack, inner: keyof T, data: RemixOfOSTTrack) => {
	const album = document.querySelector(`#song .${(name as string).replaceAll('_', '-')}.field .${String(inner)}`)!

	// @ts-expect-error I don't know how to make TS happy here
	album.textContent = String(data[name][inner])
}

const published = (data: RemixOfOSTTrack) => {
	for (const f of ['by', 'year']) {
		const field = document.querySelector(`#song .published.field .${f}`)!
	
		field.textContent = String(data.published[f as keyof Published])
	}
}

const update = (data: RemixOfOSTTrack) => {
	field('accompaniment', data)
	field('album', data)
	artists(data)
	field('catalog_number', data)
	position_in_count('collection', data)
	cover_art(data)
	encoders(data)
	ost(data)
	published(data)
	field('title', data)
	position_in_count('track', data)
	field('webpage', data)
}

// @ts-expect-error
const readTags = (event) => {
	const file = event.target.files[0];
	// @ts-expect-error
	window.jsmediatags.read(file, {
		// @ts-expect-error
	  onSuccess: function(obj) {
			console.log(obj.tags)
			const processed = process(obj.tags)
	    console.log(processed)
			update(processed)
	  },
		// @ts-expect-error
	  onError: function(error) {
	    console.log(error);
	  }
	})
}

export default () =>
	<>
		<form name="upload">
			<h1>Upload Music</h1>
			<input type="file" id="file" onChange={readTags} />
		</form>
		<section id="song">
			<div clazz="field accompaniment">
				<h3>Accompaniment</h3>
				<p></p>
			</div>
			<div clazz="field album">
				<h3>Album</h3>
				<p></p>
			</div>
			<div clazz="field artists">
				<h3>Artist</h3>
				<h5>Primary</h5>
				<ul clazz="primary"></ul>
				<h5>Featuring</h5>
				<ul clazz="featuring"></ul>
			</div>
			<div clazz="field catalog-number">
				<h3>Catalog Number</h3>
				<p></p>
			</div>
			<div clazz="field collection">
				<h3>Collection</h3>
				<p>
					<span clazz="position"></span>
					<span> of </span>
					<span clazz="count"></span>
				</p>
			</div>
			<div clazz="field cover-art">
				<h3>Cover Art</h3>
				<img />
			</div>
			<div clazz="field encoders">
				<h3>Encoders</h3>
				<ul></ul>
			</div>
			<div clazz="field ost">
				<h3>OST</h3>
				<h5>Copyright</h5>
				<p clazz="copyright"></p>
				<h5>Composer</h5>
				<p clazz="composer"></p>
				<h5>Console</h5>
				<p clazz="console"></p>
				<h5>Game</h5>
				<p clazz="game"></p>
				<h5>Title</h5>
				<p clazz="title"></p>
			</div>
			<div clazz="field published">
				<h3>Published</h3>
				<h5>By</h5>
				<p clazz="by"></p>
				<h5>Year</h5>
				<p clazz="year"></p>
			</div>
			<div clazz="field title">
				<h3>Title</h3>
				<p></p>
			</div>
			<div clazz="field track">
				<h3>Track</h3>
				<p>
					<span clazz="position"></span>
					<span> of </span>
					<span clazz="count"></span>
				</p>
			</div>
			<div clazz="field webpage">
				<h3>Webpage</h3>
				<p></p>
			</div>
		</section>
	</>
