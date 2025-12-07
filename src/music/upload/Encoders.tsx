import type { Encoder } from "./types"

type EncodersProps = {
	people: Encoder[]
}

const Encoders = ({ people }: EncodersProps) =>
	<div clazz="field encoders">
		<h3>Encoders</h3>
		<ul>
			{people.map(p =>
				<li>
					{p.name && <p clazz="name">{p.name}</p>}
					{p.email && <p clazz="email">{p.email}</p>}
				</li>
			)}
		</ul>
	</div>

export default Encoders