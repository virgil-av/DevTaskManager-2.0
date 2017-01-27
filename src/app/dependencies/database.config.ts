interface Settings {
  dbUrl: string;
  dbList: string;
  dbProjects: string;
  dbActivity: string;
  dbNotes: string;
}


export const dbSettings: Settings = {
  dbUrl: 'https://apitest-123456.getsandbox.com',
  dbList: '/list',
  dbProjects: '/projects',
  dbActivity: '/activity',
  dbNotes: '/notes'
};
