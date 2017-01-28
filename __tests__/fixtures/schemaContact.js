import * as SqliteTypes from '../../lib/Types';

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

export default schemaContact;
