import * as SqliteTypes from '../lib/Types';
import { SchemaField, ModelSchema, SqlBuilder } from '../lib';

import schemaContact from './fixtures/schemaContact';

it('SqlBuilder can generate UPDATE-statement correctly', () => {
  const schema = new ModelSchema( schemaContact )
  const sql = new SqlBuilder(schema)

  const entity = {
    id: 10,
    first_name: 'Alfons',
    last_name: 'Zitterbacke',
    street: 'Friedenseck 8',
    postalcode: '15232',
    city: 'Frankfurt (Oder)'
  }

  const result = {
    stmt: 'UPDATE contact SET first_name=?, last_name=?, street=?, postalcode=?, city=? WHERE id=?',
    params: ['Alfons', 'Zitterbacke', 'Friedenseck 8', '15232', 'Frankfurt (Oder)', 10]
  }

  expect(sql.update(entity)).toEqual(result)
});
