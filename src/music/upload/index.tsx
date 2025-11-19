import { readTags } from "./functions"

export default () => <>
	<form name="upload">
		<input type="file" id="file" onChange={readTags} />
	</form>
	<section id="song">
		<div clazz="fields">
			<div clazz="field album">
				<h3>Album</h3>
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
			<div clazz="field collection">
				<h3>Collection</h3>
				<p>
					<span clazz="position"></span>
					<span> of </span>
					<span clazz="count"></span>
				</p>
			</div>
			<div clazz="field published">
				<h3>Published</h3>
				<h5>By</h5>
				<p clazz="by"></p>
				<h5>Year</h5>
				<p clazz="year"></p>
			</div>
			<div clazz="field catalog-number">
				<h3>Catalog Number</h3>
				<p></p>
			</div>
			<div clazz="field webpage">
				<h3>Webpage</h3>
				<p></p>
			</div>
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
		<div clazz="fields">
			<div clazz="field artists">
				<h3>Artists</h3>
				<h5>Primary</h5>
				<ul clazz="primary"></ul>
				<h5>Featuring</h5>
				<ul clazz="featuring"></ul>
			</div>
			<div clazz="field encoders">
				<h3>Encoders</h3>
				<ul></ul>
			</div>
		</div>
		<div clazz="field cover-art">
			<h3>Cover Art</h3>
			<img />
		</div>
		<div clazz="field lyrics">
			<h3>Lyrics</h3>
		</div>
	</section>
</>
