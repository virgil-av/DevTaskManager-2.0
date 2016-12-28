interface Settings {
  dbUrl: string;
  dbList: string;
  dbProjects: string;
  dbCategory: string;
  dbUsers: string;
  dbContacts: string;
}


export const dbSettings: Settings = {
  dbUrl: 'https://avram-virgil-project.getsandbox.com',
  dbList: '/list',
  dbProjects: '/projects',
  dbCategory: '/category',
  dbUsers: '/users',
  dbContacts: '/contacts'

}
