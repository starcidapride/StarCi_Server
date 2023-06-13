export default () => {
	const port = process.env.PORT
	return {
		port,
		serverUrl: `http://localhost:${port}/api/`
	}
}