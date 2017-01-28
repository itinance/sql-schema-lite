import * as SqliteTypes from '../lib/Types';
import { SchemaField, ModelSchema, SqlBuilder } from '../lib';

import schemaContact from './fixtures/schemaContact';

it('SqlBuilder can work with fields correctly', () => {
  const schema = new ModelSchema( schemaContact )
  const sql = new SqlBuilder(schema)

  const fieldsStr = sql.buildFieldList(',')
  expect(fieldsStr).toBe('id,first_name,last_name,street,postalcode,city')

  const fields = sql.buildFieldList()
  expect(fields).toEqual(['id','first_name','last_name','street','postalcode','city'])
});
