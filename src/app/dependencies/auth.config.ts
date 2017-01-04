interface AuthConfiguration {
  clientID: string,
  domain: string,
  domainUrl: string,
  token: string,
  usersApiUrl: string,
  usersQuery: string
  userAvatar: string
}

export const myConfig: AuthConfiguration = {
  domain: 'devtask.eu.auth0.com',
  domainUrl: 'https://devtask.eu.auth0.com',
  clientID: 'MUxV0hsTsP1L04sd3hzS4UbaVvF3fWTM',
  token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJIbm5BQ1lFRXltUW01bzdlc2ZsdHVZNXdxMUpiUWYxcyIsInNjb3BlcyI6eyJ1c2VycyI6eyJhY3Rpb25zIjpbImNyZWF0ZSIsImRlbGV0ZSIsInVwZGF0ZSIsInJlYWQiXX19LCJpYXQiOjE0ODMzODY1MjIsImp0aSI6ImQxM2Y4ZDMwZTMwNmI1MTg2ZjRiMWUyMzE1MTNjZmVlIn0.S4P8kM_C2zJIFvw4RiXhWlzx8q-tom95WL6zarHYll4',
  usersApiUrl: '/api/v2/users',
  usersQuery: '?per_page=100&include_totals=false&sort=created_at%3A1&fields=picture%2Cnickname&include_fields=false&search_engine=v2',
  userAvatar: 'http://i64.tinypic.com/kal4t0.jpg'
};
