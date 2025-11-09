import { process } from "./ID3Tag"

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
	  },
		// @ts-expect-error
	  onError: function(error) {
	    console.log(error);
	  }
	})
}

export default () => <form name="upload">
	<h1>Upload Music</h1>
	<input type="file" id="file" onChange={readTags} />
</form>
