const pool = require('../utils/pool');

module.exports = class Item {
  id;
  name;
  type;
  coords;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
    this.coords = row.coords;
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
};
