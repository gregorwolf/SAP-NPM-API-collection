# CDS QL

This package deals with creating a  pool of connection clients, connecting to a driver (read: db) and using these connection clients from the pool to insert, delete, select and update values or rows from a specific table. Performing these insert, delete, select and update operations also includes executing embedded queries and plain statements.

## Overview
TBD


## Installation
~~~~
npm install
~~~~

## Usage/Configuration
### Examples ###
Following is an example of how to set up a connection pool by specifying the maximum and minimum number of connections and a connection by specifying host, port, user and password. These connect options can be client specific. For example SAP Hana might include certificate and schema, while others like SQLite have neither. 
~~~~
cds.connect({
  kind: 'hana',
  pool: {
    min: 1,
    max: 100
  },
  credentials: {
    host: 'hana.tld',
    port: 39015,
    user: 'TECHNICAL_USER',
    password: 'VerySecure'
  }
})
~~~~

Following is an example of a basic SELECT statement:
~~~~
SELECT.from('Authors')
~~~~

Following is an example of a basic INSERT statement:
~~~~
INSERT.into('Authors')
  .rows([ 1, 'Wuthering Heights' ])
~~~~

Following is an example of a basic UPDATE statement:
~~~~
UPDATE('Authors')
  .set({NAME: 'Jon Doe', STOCK: 123})
~~~~

Following is an example of a basic DELETE statement:
~~~~
DELETE.from('Authors')
~~~~

