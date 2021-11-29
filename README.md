# Todo List

This todo list has been created using:

-   HTML5
-   CSS3
-   Mongoose/MongoDB
-   Express
-   Nodejs
-   EJS

A hosted version can be found here: https://jmg-todo-list.herokuapp.com/

The pages are dynamically loaded using EJS templates and partials and stores/deletes the items via MongoDB.

## Creating a new list

The app will load with the default list named 'Today'.

This can be added to by using the '+' symbol, or items can be deleted using the checkboxes next to each item.

To create a new list, add a '/' followed by your new list name, in the url. e.g. `https://jmg-todo-list.herokuapp.com/shoppinglist`

This will create a new list, which will store independently of the default today list.

lodash is used to ensure can capitalisation does not matter on the new list item url.

## Running a local version

The project can be run locally by cloning to your machine in your usual place for projects. Run the following command to install

        git clone https://github.com/popatre/todolist-mongodb.git

Open the directory in your usual code editor.

Run the following command to install the dependencies (this requires node v.14.15.0 or higher)

        npm install

You must also have MongoDB v4.2 or higher, installed, which can be installed by following the guide [here](https://docs.mongodb.com/manual/installation/)

To run the project type the following command in the terminal

        node app.js

In your browser, navigate to http://localhost:3000 to view the project on the localserver
