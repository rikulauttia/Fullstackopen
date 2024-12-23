import { useEffect, useState } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get('http://localhost:3003/api/users');
				// Calculate the number of blogs for each user
				const usersWithBlogCount = response.data.map((user) => ({
					id: user.id,
					name: user.name,
					blogsCount: user.blogs.length,
				}));
				setUsers(usersWithBlogCount);
			} catch (error) {
				console.error('Error fetching users:', error);
			}
		};
		fetchUsers();
	}, []);

	return (
		<div>
			<h2>Users</h2>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Blogs created</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id}>
							<td>
								<Link to={`/users/${user.id}`}>{user.name}</Link>
							</td>
							<td>{user.blogsCount}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default UserList;
