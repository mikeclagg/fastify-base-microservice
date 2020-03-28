import { Shortcode, ShortcodeModel } from './Shortcodes';

export const routes = [
  {
    path: '/',
    method: 'get',
    fn: async (req: any, reply: any) => {
      const getCount = Shortcode.count({ });
      const total = await getCount;
      const limit = 200 > total ? 200: total;
      const getCodes = Shortcode.find({}).sort({ createdAt: -1 }).limit(limit);
      const codes = await getCodes;

      reply.send({ response: { total, limit, items: codes } });
    }
  },
  {
    path: '/:context',
    method: 'post',
    fn: async (req: any, reply: any) => {
      const context = req.params.context || '';
      const { model } = new ShortcodeModel({ context });
      const shortcode = new Shortcode(model);
      const saving = shortcode.save();
      const stored = await saving;
      reply.send({ response: { stored } });
    }
  },
  {
    path: '/__REMOVE_ALL_CODES',
    method: 'delete',
    fn: async (req: any, reply: any) => {
      const removed = await Shortcode.deleteMany({});
      reply.send({ response: { removed } });
    }
  }
];