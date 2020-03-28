export const routes = [
  {
    path: '/',
    method: 'get',
    fn: (req: any, reply: any) => {
      reply.send('API is working!');
    }
  }
];