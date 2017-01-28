import * as SqliteTypes from '../lib/Types';
import { SchemaField, ModelSchema, SqlGenerator } from '../lib';

import schemaContact from './fixtures/schemaContact';

it('SqlGenerator can work with fields correctly', () => {
  const schema = new ModelSchema( schemaContact )
  const sql = new SqlGenerator(schema)

  const fieldsStr = sql.buildFieldList(',')
  expect(fieldsStr).toBe('id,first_name,last_name,street,postalcode,city')

  const fields = sql.buildFieldList()
  expect(fields).toEqual(['id','first_name','last_name','street','postalcode','city'])
});

it('SqlGenerator can generate SELECT-statement correctly', () => {
  const schema = new ModelSchema( schemaContact )
  const sql = new SqlGenerator(schema)

  expect(sql.select()).toBe('SELECT id,first_name,last_name,street,postalcode,city FROM contact')
});

it('SqlGenerator can generate UPDATE-statement correctly', () => {
  const schema = new ModelSchema( schemaContact )
  const sql = new SqlGenerator(schema)

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

it('SqlGenerator can generate INSERT-statement correctly', () => {
  const schema = new ModelSchema( schemaContact )
  const sql = new SqlGenerator(schema)

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

it('SqlGenerator can handle null values on INSERT-statement correctly', () => {
  const schema = new ModelSchema( schemaContact )
  const sql = new SqlGenerator(schema)

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

it('SqlGenerator can handle missing values on INSERT-statement correctly', () => {
  const schema = new ModelSchema( schemaContact )
  const sql = new SqlGenerator(schema)

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
