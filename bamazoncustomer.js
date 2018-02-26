var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "fA1sE3r0",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  showProducts();
});

function showProducts() {
  console.log("\nHere is our fine selection of merchandise\n");
  connection.query("SELECT product_name, department_name, price, stock_quantity FROM products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("_____________________________________________");
      console.log(res[i].product_name);
      console.log("Department: " + res[i].department_name);
      console.log("Price: $" + res[i].price);
      console.log("Quantity in Stock: " + res[i].stock_quantity);
    }
    console.log("\n");
    makePurchase();
  });
}


let productList = [];

function makeProductList() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      productList.push(res[i].product_name)
    }
  });
}

makeProductList();

function makePurchase() {
  inquirer
    .prompt([{
        name: "product",
        type: "list",
        message: "What would you like to purchase?",
        choices: productList
      },
      {
        name: "quantity",
        type: "input",
        message: "How many of this item would you like to purchase?"
      }
    ])
    .then(function(answers) {
      connection.query("SELECT * FROM products WHERE ?", {
          product_name: answers.product
        },
        function(err, res) {
          // console.log(res[0].stock_quantity);
          // console.log(parseInt(answers.quantity));
          if (res[0].stock_quantity >= parseInt(answers.quantity)) {
            console.log("\nYour total cost for the " + answers.product + " is: $" + res[0].price * parseInt(answers.quantity));
            var updatedQuantity = res[0].stock_quantity - parseInt(answers.quantity);
            console.log(answers.product + " remaining in stock: " + updatedQuantity);
            connection.query("UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: updatedQuantity
              },
              {
                product_name: answers.product
              }
            ],
            function(err, res) {
              buyAgain();
            });
          } else{
            console.log("\nWe are sorry, we do not have enough of this item in stock to complete your order.");
            buyAgain();
          }
        });
        return;
    });
}

function buyAgain() {
  inquirer.prompt({
    name: "again",
    message: "\nMake another purchase?",
    type:"list",
    choices: ["Yes", "No"]
  })
  .then(function(answer) {
    if (answer.again == "Yes") {
      showProducts();
    }else {
      console.log("\nGoodbye");
      connection.end();
      return;
    }
  });
}
