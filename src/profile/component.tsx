import { type ProfileProps } from './types'

import './styles.scss'

export default ({ id, name }: ProfileProps) =>
	<section id="profile">
		<img src="https://i.pravatar.cc/250?u=bsgbryan@gmail.com" />
		<h1>{id ?? "unknown"}</h1>
		<h2>{name ?? "unknown"}</h2>
		<h3>Currently Playing</h3>
		<ol>
			<li>Unicorn Overlord</li>
			<li>Cyberpunk 2077</li>
			<li>DOOM: The Dark Ages</li>
			<li>Super Mario Wonder</li>
		</ol>
		<h3>Plays on</h3>
		<ul>
			<li>Steam</li>
			<li>PS5</li>
			<li>Switch</li>
		</ul>
	</section>
