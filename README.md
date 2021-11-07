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
