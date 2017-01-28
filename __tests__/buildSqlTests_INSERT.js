import * as SqliteTypes from '../lib/Types';
import { SchemaField, ModelSchema, SqlBuilder } from '../lib';

import schemaContact from './fixtures/schemaContact';

it('SqlBuilder can generate INSERT-statement correctly', () => {
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

  const stmt = `
  INSERT INTO contact (first_name, last_name, street, postalcode, city) VALUES (?, ?, ?, ?, ?)
  `.trim()

  const params = ['Alfons', 'Zitterbacke', 'Friedenseck 8', '15232', 'Frankfurt (Oder)']

  expect(sql.insert(entity)).toEqual({stmt, params})
});

it('SqlBuilder can handle null values on INSERT-statement correctly', () => {
  const schema = new ModelSchema( schemaContact )
  const sql = new SqlBuilder(schema)

  const entity = {
    id: 10,
    first_name: null,
    last_name: 'Zitterbacke',
    street: 'Friedenseck 8',
    postalcode: '15232',
    city: 'Frankfurt (Oder)'
  }

  const stmt = `
  INSERT INTO contact (first_name, last_name, street, postalcode, city) VALUES (?, ?, ?, ?, ?)
  `.trim()

  const params = [null, 'Zitterbacke', 'Friedenseck 8', '15232', 'Frankfurt (Oder)']

  expect(sql.insert(entity)).toEqual({stmt, params})
});

it('SqlBuilder can handle missing values on INSERT-statement correctly', () => {
  const schema = new ModelSchema( schemaContact )
  const sql = new SqlBuilder(schema)

  const entity = {
    id: 10,
//    first_name: null,   <------ missing
    last_name: 'Zitterbacke',
    street: 'Friedenseck 8',
    postalcode: '15232',
    city: 'Frankfurt (Oder)'
  }

  const stmt = `
  INSERT INTO contact (first_name, last_name, street, postalcode, city) VALUES (?, ?, ?, ?, ?)
  `.trim()

  const params = [null, 'Zitterbacke', 'Friedenseck 8', '15232', 'Frankfurt (Oder)']

  expect(sql.insert(entity)).toEqual({stmt, params})
});
