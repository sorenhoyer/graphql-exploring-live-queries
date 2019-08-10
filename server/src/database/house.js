import db from './pg-promise/pgAdapter';

export class House {
  constructor(id, address) {
    this.id = id;
    this.address = address;
  }
}

export const getHouses = async(id) => {
  try {
    const res = await db.manyOrNone(`
      SELECT *
      FROM house
    `);

    if (res) {
      const result = res.map(record => {
        return new House(record.id, record.address);
      })

      return result;
    }
    return null;
  } catch(exception) {
    console.log(exception);
  }
}

export const getHouseById = async(id) => {
  try {
    const res = await db.oneOrNone(`
      SELECT *
      FROM house
      WHERE id = $1
    `, id);

    if (res) return House(record.id, record.address);

    return null;
  } catch(exception) {
    console.log(exception);
  }
}
