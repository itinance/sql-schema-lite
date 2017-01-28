

export class SqlBuilder {

  constructor(schema : ModelSchema, nullValue = null) {
    this.schema = schema;
    this.nullValue = nullValue;
  }

  buildFieldList( separator = null, version = -1 ) {
    const fields = this.schema.getFields(version).map( f => f.name )
    if(separator) return fields.join(separator)
    return fields;
  }

  buildParamList( entity : Object, fields : Array = null ) : Array {
    if(!fields) fields = this.buildFieldList()
    const { nullValue } = this;

    return fields.map( f => entity[f] === undefined ? nullValue : entity[f] );
  }

  prepareValue(value, quote = "'") {
    if(Number.isInteger(value)) {
      return parseInt(value);
    }

    return `${quote}${value}${quote}`;
  }

  select( idOrWhere = null, forceParamInjection = false ) {
    const {schema} = this;

    let where = null;

    if(is_scalar(idOrWhere)) {
      const primaryKey = schema.getPrimaryKey();
      if(primaryKey) {
        where = primaryKey.getName() + '='
        if(forceParamInjection) {
          where += this.prepareValue( idOrWhere );
        } else {
          where += '?'
        }
      }
    } else if(idOrWhere) {
      where = idOrWhere.toString()
    }

    let stmt = 'SELECT ' + this.buildFieldList(',') + ' FROM ' + schema.getName();
    if(where) stmt += ' WHERE ' + where;
    return stmt;
  }

  insert( entity : Object, where = null ) {
    const {schema} = this;
    const primaryKey = schema.getPrimaryKey();

    if(!primaryKey && !where) {
      throw Error('UPDATE needs primary key or atleast some where statement');
    }

    if(where && where.length > 0) throw Error("Individual WHERE-statements not supported yet")

    let fields = this.buildFieldList()
      , params;

    if(primaryKey !== undefined && primaryKey.isAutoIncrement) {
      // on auto increment, hide this column for insert-statement
      fields = fields.filter( f => f !== primaryKey.getName() )
      params = this.buildParamList(entity, fields)
    } else {
      params = this.buildParamList(entity, fields)
    }

    let stmt = `INSERT INTO ${schema.getName()} (`
      + fields.map( f => f ).join(', ')
      + ') VALUES ('
      + fields.map( f => '?' ).join(', ')
      + ')'
    ;

    return {stmt, params};
  }

  update( entity : Object, where = null ) {
    const {schema} = this;
    const primaryKey = schema.getPrimaryKey();

    if(!primaryKey && !where) {
      throw Error('UPDATE needs primary key or atleast some where statement');
    }

    if(where && where.length > 0) throw Error("Individual WHERE-statements not supported yet")

    let fields = this.buildFieldList()
      , params;

    if(primaryKey !== undefined) {
      fields = fields.filter( f => f !== primaryKey.getName() )
      params = [...this.buildParamList(entity, fields), entity[primaryKey.getName()]]
    } else {
      params = this.buildParamList(entity, fields)
    }

    let stmt = `UPDATE ${schema.getName()} SET `
      + fields.map( f => `${f}=?` ).join(', ')
    ;

    stmt += ` WHERE ${primaryKey.getName()}=?`;

    return {stmt, params};
  }
}

function is_scalar(obj){return (/string|number|boolean/).test(typeof obj);}
