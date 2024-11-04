const Notification = ({ message, type }) => {
	if (!message) return null

	const notificationStyle = {
		color: type === 'success' ? 'green' : 'red',
		backgroundColor: type === 'success' ? '#d4edda' : '#f8d7da',
		padding: '10px',
		border: `2px solid ${type === 'success' ? 'green' : 'red'}`,
		borderRadius: '5px',
		marginBottom: '15px'
	}

	return <div style={notificationStyle}>{message}</div>
}

export default Notification