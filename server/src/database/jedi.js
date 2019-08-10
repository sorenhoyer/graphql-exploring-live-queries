import db from './pg-promise/pgAdapter';

export class Jedi {
  constructor(id, name, house_id) {
    this.id = id;
    this.name = name;
    this.house_id = house_id;
  }
}

export const getJedis = async(id) => {
  try {
    const res = await db.manyOrNone(`
      SELECT *
      FROM jedi
    `);

    if (res) {
      const result = res.map(record => {
        return new Jedi(record.id, record.name, record.house_id);
      })

      return result;
    }
    return null;
  } catch(exception) {
    console.log(exception);
  }
}
