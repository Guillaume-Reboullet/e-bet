# PostgreSQL Commands

## Main commands

### Postgre SuperUser
```bash
sudo -i -u postgres
```
### Access Postgre
```bash
psql
```
### Grant Privileges
```bash
GRANT ALL PRIVILEGES ON DATABASE database_name TO your_username;
```
### Exit psql 
```bash
\q
```

### Postgre SuperUser
```bash
sudo -i -u postgres
```

## Database Commands

### Create Database
```bash
CREATE DATABASE database_name;
```
### Connect to the Database
```bash
psql -h localhost -U your_username -d mydatabase
```

### Delete Database
```bash
DROP DATABASE database_name;
```

## Table Commands

### Create Table
```bash
CREATE TABLE table_name (
    column1_name data_type constraints,
    column2_name data_type constraints,
    ...
);
```
Example:
```bash
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Delete Table
```bash
DROP TABLE table_name;
```

### Add Column
```bash
ALTER TABLE table_name ADD COLUMN column_name data_type constraints;
```
Example:
```bash
ALTER TABLE users ADD COLUMN age INT;
```

### Delete Column
```bash
ALTER TABLE table_name DROP COLUMN column_name;
```
Example:
```bash
ALTER TABLE users DROP COLUMN age;
```

## Data Commands

### Insert Data
```bash
INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...);
```
Example:
```bash
INSERT INTO users (name, email) VALUES ('John Doe', 'john.doe@example.com');
```

### Update Data
```bash
UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE condition;
```
Example:
```bash
UPDATE users SET email = 'john.newemail@example.com' WHERE id = 1;
```

### Delete Data
```bash
DELETE FROM table_name WHERE condition;
```
Example:
```bash
DELETE FROM users WHERE id = 1;
```

## Example Scenario

### Create a Database
```bash
CREATE DATABASE mydatabase;
```

### Connect to the Database
```bash
psql -h localhost -U your_username -d mydatabase
```

### Create a Table
```bash
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Insert Data into the Table
```bash
INSERT INTO users (name, email) VALUES ('John Doe', 'john.doe@example.com');
```

### Update Data in the Table
```bash
UPDATE users SET email = 'john.newemail@example.com' WHERE id = 1;
```

### Delete Data from the Table
```bash
DELETE FROM users WHERE id = 1;
```

### Delete the Table
```bash
DROP TABLE users;
```

### Delete the Database
```bash
DROP DATABASE mydatabase;