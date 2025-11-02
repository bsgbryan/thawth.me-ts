import { render } from "@bsgbryan/rnzlr"

import Hello from "./Hello"

const container = document.querySelector('body > main')!

render(Hello(), container)
