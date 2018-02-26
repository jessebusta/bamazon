DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

use bamazon;

CREATE TABLE products(
 item_id INT NOT NULL AUTO_INCREMENT,
 product_name  VARCHAR(45) NULL,
 department_name VARCHAR(45) NULL,
 price decimal(10,3) Null,
 stock_quantity int NULL,
 PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Soap", "Home Essentials", 2.50, 80);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Toilet Paper", "Home Essentials", 3, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laundry Detergent", "Home Essentials", 4, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apples", "Food", 3.50, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pasta", "Food", 2, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chips", "Food", 1, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TV", "Electronics", 300, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laptop", "Electronics", 500, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cell Phone", "Electronics", 400, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tazer", "Electronics", 9000, 2);
