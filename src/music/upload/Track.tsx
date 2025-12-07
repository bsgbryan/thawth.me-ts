type TrackProps = {
	count?: number
	position?: number
}

const Track = ({
	count,
	position,
}: TrackProps) =>
	<div clazz="field track">
		<h3>Track</h3>
		<p>
			<span clazz="position">{position}</span>
			<span> of </span>
			<span clazz="count">{count}</span>
		</p>
	</div>

export default Track