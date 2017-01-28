import * as SqliteTypes from '../lib/Types';
import { SchemaField, ModelSchema, SqlBuilder } from '../lib';

import schemaContact from './fixtures/schemaContact';

it('SqlBuilder can generate SELECT-statement correctly', () => {
  const schema = new ModelSchema( schemaContact )
  const sql = new SqlBuilder(schema)

  expect(sql.select()).toBe('SELECT id,first_name,last_name,street,postalcode,city FROM contact')
});
