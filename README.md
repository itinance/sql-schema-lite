# sql-schema-lite

## Motivation:

This is something like a SQL-Builder primarily in the context of mobile applications or web
applications using Sqlite3, which is present on mobile devices and in any modern web browser (websql is sqlite3 under the hood).

It takes concrete schema definitions and supports the developer with building
specific SQL-statements like SELECT, UPDATE, INSERT, DELETE.
(DDL-statements like CREATE TABLE/ALTER TABLE are coming soon)

The library is supposed to be a loosely coupled SQL builder library
without any bindings to concrete OS-related or database-related implementations, but
can be used as a base library around SQL-statement building for those advanced implementations.
So feel free to use this in any environment (whether it is server side with NodeJS, client side
on browsers or cross platform mobile applications with Cordova, ReactNative and so on...)

That means, this library is NOT an ORM-implementation ([Object relational mapper](https://en.wikipedia.org/wiki/Object-relational_mapping)), but it is the
outsourced part of a ReactNative-specific library [react_native_sqlite_orm](https://github.com/itinance/react_native_sqlite_orm)
on top of [react-native-sqlite-storage](https://github.com/andpor/react-native-sqlite-storage/) supporting sqlite3 for both
iOS and Android, that is currently under heavy development and not being published yet (coming very soon).

## Installation:

via yarn:

```
yarn add sqlite-schema-lite
```

via npm:

```
npm install --save sqlite-schema-lite
```

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
const sql = new SqlBuilder(schema)

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

## Contribution:

Contributors are welcome! Feel free to submit pull requests or open [discussions](https://github.com/itinance/sql-schema-lite/issues).

In case of submitting pull requests (highly appreciated) please keep in mind that we are [test driven] (https://github.com/itinance/sql-schema-lite/tree/master/__tests__).

## Author

Hagen Hübel, Munich/Starnberg, Germany
Fullstacker, massive ReactNative developer & consultant
[LinkedIn](https://www.linkedin.com/in/hagenhuebel)
