const
	port    = 8080,
	fs      = require('fs' ),
	express = require('express' ),
	app     = express()


app.use(express.static('public'))

app.get('/', (req, res) => {
	res.set('content-type', 'text/html')

	fs.readFile('public/pages/index.html', (err, data) => {
		if(err) {
			return console.log(err)
		}
		res.send(data)
	})
})

app.use((req, res) => {
	const phrase = 'There is no such request!'
	console.log(phrase)
	res.send(phrase)
})

app.listen(port, () => {
	console.info(`App started on port ${port}`)
})