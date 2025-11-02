const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
	event.preventDefault()
	const formData = new FormData(document.forms.namedItem('post')!)
	console.log(formData.get('content'))
}

export default () =>
	<form name="post" method="post" onSubmit={handleSubmit}>
		<input type="text" name="content" placeholder="What's up?" />
		<button type="submit">post</button>
	</form>
