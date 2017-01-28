# sql-schema-lite

## Motivation:

(to be continued)

## Examples:

Define a schema per JS or JSON:

```javascript
const schemaContact = {
  name: 'contact',
  defaultVersion: 1,

  // Version 1:

  1: {
    id: {
      type: SqliteTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: SqliteTypes.TEXT,
      index: true,
      nullable: true,
    },
    last_name: {
      type: SqliteTypes.TEXT,
      index: true,
      nullable: false,
    },
    street: {
      type: SqliteTypes.TEXT,
      index: true,
      nullable: false,
    },
    postalcode: {
      type: SqliteTypes.INTEGER,
      index: true,
      nullable: false,
    },
    city: {
      type: SqliteTypes.TEXT,
      index: true,
      nullable: false,
    },
  }
}
```

Let's create SQL-statements for SELECT, INSERT, UPDATE, DELETE automatically:

```javascript
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

console.log( sql.update(entity) )
```

update() returns a plain object containing the SQL-statement as is with prepared statements
and the parameter-array containing all parameters. It takes note of primary keys
and use them as WHERE-statement for a specific record update:

```javascript
{
  stmt: 'UPDATE contact SET first_name=?, last_name=?, street=?, postalcode=?, city=? WHERE id=?',
  params: ['Alfons', 'Zitterbacke', 'Friedenseck 8', '15232', 'Frankfurt (Oder)', 10]
}
```
