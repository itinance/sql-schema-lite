import * as SqliteTypes from '../lib/Types';
import { SchemaField, ModelSchema, SqlBuilder } from '../lib';

import schemaContact from './fixtures/schemaContact';

it('SqlBuilder can generate SELECT-statement correctly', () => {
  const schema = new ModelSchema( schemaContact )
  const sql = new SqlBuilder(schema)

  expect(sql.select()).toBe('SELECT id,first_name,last_name,street,postalcode,city FROM contact')
});

it('SqlBuilder can generate SELECT-statement correctly for a specific record per primaryKey', () => {
  const schema = new ModelSchema( schemaContact )
  const sql = new SqlBuilder(schema)

  expect(sql.select(101)).toBe(
    'SELECT id,first_name,last_name,street,postalcode,city FROM contact WHERE id=?'
  )
});

it('Build SELECT-statement with selection by ID and with parameter injection', () => {
  const schema = new ModelSchema( schemaContact )
  const sql = new SqlBuilder(schema)

  expect(sql.select(101, true)).toBe(
    'SELECT id,first_name,last_name,street,postalcode,city FROM contact WHERE id=101'
  )
});

it('Build SELECT-statement with selection by ID and with alphanumeric parameter injection', () => {
  const schema = new ModelSchema( schemaContact )
  const sql = new SqlBuilder(schema)

  expect(sql.select('1337-ddde-1233122', true)).toBe(
    "SELECT id,first_name,last_name,street,postalcode,city FROM contact WHERE id='1337-ddde-1233122'"
  )
});
