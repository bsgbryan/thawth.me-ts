type OSTProps = {
	composer?: string
	console?: string
	copyright?: string
	game?: string
	title?: string
}

const OST = ({
	composer,
	console,
	copyright,
	game,
	title,
}: OSTProps) =>
	<div clazz="field ost">
		<h3>OST</h3>
		<h5>Copyright</h5>
		<p clazz="copyright">{copyright}</p>
		<h5>Composer</h5>
		<p clazz="composer">{composer}</p>
		<h5>Console</h5>
		<p clazz="console">{console}</p>
		<h5>Game</h5>
		<p clazz="game">{game}</p>
		<h5>Title</h5>
		<p clazz="title">{title}</p>
	</div>

export default OST