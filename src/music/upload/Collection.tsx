type CollectionProps = {
	count?: number
	position?: number
}

const Collection = ({
	count,
	position,
}: CollectionProps) =>
	<div clazz="field collection">
		<h3>Collection</h3>
		<p>
			<span clazz="position">{position}</span>
			<span> of </span>
			<span clazz="count">{count}</span>
		</p>
	</div>

export default Collection