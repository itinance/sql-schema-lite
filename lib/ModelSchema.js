/**
 *
 * @flow
 */

import * as SqliteTypes from './Types';
import { SchemaField } from './SchemaField';


export class ModelSchema {
  constructor( schema = null ) {
    this.fields = [];

    this.name = '';
    this.defaultVersion = 1;

    if(schema) {
      this.assignSchema(schema)
    }
  }

  add( field: SchemaField ) {
    this.fields.push( field )
  }

  getFields( maxVersion = -1 ) {
    return this.fields;
  }

  hasPrimaryKey() {
    return undefined !== this.getPrimaryKey()
  }

  getPrimaryKey() {
    return this.fields.find( f => f.isPrimaryKey() )
  }

  assignSchema( schema : Object ) {
    const s = {...schema}

    this.name = s.name;
    this.defaultVersion = parseFloat( s.defaultVersion );

    delete s.name
    delete s.defaultVersion

    Object.keys(s).forEach( (function (key) {
      // iterate over versions

      if(!isNumeric(key)) return;

      let field = s[key];

      for (let [name, data] of entries(field)) {
         // do something with key|value
         const schemaField = SchemaField.create(name, data)
         this.fields.push(schemaField)
      }
    }).bind(this) );

  }

  getName() { return this.name }
  getDefaultVersion() { return this.defaultVersion }

}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// using a generator function
function* entries(obj) {
   for (let key of Object.keys(obj)) {
     yield [key, obj[key]];
   }
}
