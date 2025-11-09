import { process } from "./ID3Tag"
import type { RemixOfOSTTrack } from "./ID3Tag/types"

const cover_art = (data: RemixOfOSTTrack) => {
	const cover_art = document.querySelector('#song .cover-art.field img')! as HTMLImageElement
	const url = URL.createObjectURL(new Blob([new Uint8Array(data.cover_art.data).buffer]))
	cover_art.src = url
	cover_art.onload = e => URL.revokeObjectURL(url)
}

const encoder = (name: string, email: string) => {
	const node = document.createElement('li')
	const nameNode = document.createElement('p')
	const emailNode = document.createElement('p')

	nameNode.setAttribute('class', 'name')
	emailNode.setAttribute('class', 'email')

	nameNode.textContent = name
	emailNode.textContent = email

	node.appendChild(nameNode)
	node.appendChild(emailNode)

	return node
}

const encoders = (data: RemixOfOSTTrack) => {
	const element = document.querySelector('#song .encoders.field ul')!

	for (const e of data.encoded_by) element.appendChild(encoder(e.name, e.email))
}

const field = (name: keyof RemixOfOSTTrack, data: RemixOfOSTTrack) => {
	const album = document.querySelector(`#song .${name.replaceAll('_', '-')}.field p`)!

	album.textContent = data[name] as string
}

const ost = (data: RemixOfOSTTrack) => {
	subfield('ost', 'copyright', data)
	subfield('ost', 'composer', data)
	subfield('ost', 'console', data)
	subfield('ost', 'game', data)
	subfield('ost', 'title', data)
}

const position_in_count = (name: "collection" | "track", data: RemixOfOSTTrack) => {
	subfield(name, 'position', data)
	subfield(name, 'count', data)
}

const subfield = (name: keyof RemixOfOSTTrack, inner: string, data: RemixOfOSTTrack) => {
	const album = document.querySelector(`#song .${name.replaceAll('_', '-')}.field .${inner}`)!

	// @ts-expect-error
	album.textContent = String(data[name][inner])
}

const update = (data: RemixOfOSTTrack) => {
	field('album', data)
	field('artist', data)
	field('catalog_number', data)
	position_in_count('collection', data)
	cover_art(data)
	encoders(data)
	ost(data)
	field('published', data)
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
			console.log(obj)
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
			<div clazz="field album">
				<h3>Album</h3>
				<p></p>
			</div>
			<div clazz="field artist">
				<h3>Artist</h3>
				<p></p>
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
				<p></p>
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
