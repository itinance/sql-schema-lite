import * as SqliteTypes from '../lib/Types';
import { SchemaField } from '../lib/SchemaField';
import { ModelSchema } from '../lib/ModelSchema';

import schemaContact from './fixtures/schemaContact';

it('creates autoinc integer primarykey correctly', () => {
  const f = new SchemaField('id', SqliteTypes.INTEGER, {autoIncrement: true, primaryKey: true})

  expect(f.getType()).toBe( SqliteTypes.INTEGER )
  expect(f.isAutoIncrement()).toBeTruthy()
  expect(f.isPrimaryKey()).toBeTruthy()
  expect(f.isNullable()).toBeFalsy()
  expect(f.hasLength()).toBeFalsy()
});


it('creates schema from json correctly', () => {
  const schema = new ModelSchema( schemaContact )

  expect(schema.getName()).toBe('contact')
  expect(schema.getDefaultVersion()).toBe(1)

  expect(schema.fields.length).toBe(6)

  expect(schema.fields[0].getName()).toBe('id')
  expect(schema.fields[0].isPrimaryKey()).toBeTruthy()
  expect(schema.fields[0].getType()).toBe(SqliteTypes.INTEGER)

  expect(schema.fields[1].getName()).toBe('first_name')
  expect(schema.fields[1].isPrimaryKey()).toBeFalsy()
  expect(schema.fields[1].isIndex()).toBeTruthy()
  expect(schema.fields[1].getType()).toBe(SqliteTypes.TEXT)

  expect(schema.fields[2].getName()).toBe('last_name')
  expect(schema.fields[2].isPrimaryKey()).toBeFalsy()
  expect(schema.fields[2].isIndex()).toBeTruthy()
  expect(schema.fields[2].getType()).toBe(SqliteTypes.TEXT)

  expect(schema.fields[3].getName()).toBe('street')
  expect(schema.fields[3].isPrimaryKey()).toBeFalsy()
  expect(schema.fields[3].isIndex()).toBeTruthy()
  expect(schema.fields[3].getType()).toBe(SqliteTypes.TEXT)

  expect(schema.fields[4].getName()).toBe('postalcode')
  expect(schema.fields[4].isPrimaryKey()).toBeFalsy()
  expect(schema.fields[4].isIndex()).toBeTruthy()
  expect(schema.fields[4].getType()).toBe(SqliteTypes.INTEGER)

  expect(schema.fields[5].getName()).toBe('city')
  expect(schema.fields[5].isPrimaryKey()).toBeFalsy()
  expect(schema.fields[5].isIndex()).toBeTruthy()
  expect(schema.fields[5].getType()).toBe(SqliteTypes.TEXT)
});

it('finds primary key of schema correctly', () => {
  const schema = new ModelSchema( schemaContact )
  expect(schema.hasPrimaryKey()).toBeTruthy();
  expect(schema.getPrimaryKey().getName()).toBe('id');
});
