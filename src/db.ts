import { type D1Database } from '@miniflare/d1';

let getDevDb: any = () => {};

if (import.meta.env.VITE_DEV) {
  const { D1Database, D1DatabaseAPI } = await import('@miniflare/d1');
  const { createSQLiteDB } = await import('@miniflare/shared');

  let devDb: any;

  getDevDb = async () => {
    if (!devDb) {
      const sqlLite = await createSQLiteDB(
        '.wrangler/state/d1/SIMPLE_DB.sqlite3'
      );
      devDb = new D1Database(new D1DatabaseAPI(sqlLite));
    }
    return devDb;
  };
}

const getDb = async (context: any) => {
  if (context.env.get('SIMPLE_DB')) {
    return context.env.get('SIMPLE_DB') as D1Database;
  }

  return getDevDb() as D1Database;
};

export default getDb;
