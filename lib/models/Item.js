const pool = require('../utils/pool');

module.exports = class Item {
  id;
  name;
  type;
  coords;
  inOperation;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
    this.coords = row.coords;
    this.inOperation = row.in_operation;
  }

  static async insert({ name, type, coords }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
            items (name, type, coords)
        VALUES
            ($1, $2, $3)
        RETURNING
            *
        `,
      [name, type, coords]
    );
    return new Item(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
        SELECT
            *
        FROM
            items
        `
    );
    return rows.map((row) => new Item(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      From
        items
      WHERE
        id=$1
      `,
      [id]
    );
    return new Item(rows[0]);
  }

  static async updateById(id, attributes) {
    const currentItem = await Item.findById(id);
    const newAttributes = { ...currentItem, ...attributes };
    const { name, type, coords, inOperation } = newAttributes;
    const { rows } = await pool.query(
      `
      UPDATE
        items
      SET
        name=$1,
        age=$2,
        coords=$3
        in_operation=$4
      WHERE
        id=$5
      RETURNING
        *
      `,
      [name, type, coords, inOperation, id]
    );
    return new Item(rows[0]);
  }
};
