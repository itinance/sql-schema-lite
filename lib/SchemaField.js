import * as SqliteTypes from './Types';

export class SchemaField {
  constructor( name : String, type : String, {nullable = true, length, autoIncrement, index, unique, primaryKey} ) {
    this.name = name;
    this.type = type;
    this.options = {
      nullable, length, autoIncrement, index, unique, primaryKey
    }
    this.checks = {
      isNullable: typeof nullable !== 'undefined' ? !!nullable : true, // defaults to true
      hasLength: typeof length !== 'undefined',
      isAutoIncrement: typeof autoIncrement !== 'undefined' && autoIncrement === true,
      isIndex: typeof index !== 'undefined' && index === true,
      isUnique: typeof unique !== 'undefined' && unique === true,
      isPrimaryKey: typeof primaryKey !== 'undefined' && primaryKey === true,
    }

    if(this.checks.isAutoIncrement) {
      this.checks.isNullable = false;
      this.checks.isPrimaryKey = true;
    }
  }

  getName() { return this.name }
  getType() { return this.type }
  isNullable() { return this.checks.isNullable }
  isAutoIncrement() { return this.checks.isAutoIncrement }
  isPrimaryKey() { return this.checks.isPrimaryKey }
  isIndex() { return this.checks.isIndex }
  isUnique() { return this.checks.isUnique }
  hasLength() { return this.checks.hasLength }
  getLength() { return this.options.length }

  static create(name, data) {
    let f = new SchemaField(name, data.type, {
      ...data
    })
    return f;
  }
}
