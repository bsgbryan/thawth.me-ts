type PublishedProps = {
	by?: string
	year?: number
}

const Published = ({
	by,
	year,
}: PublishedProps) =>
	<div clazz="field published">
		<h3>Published</h3>
		<h5>By</h5>
		<p clazz="by">{by}</p>
		<h5>Year</h5>
		<p clazz="year">{year}</p>
	</div>

export default Published