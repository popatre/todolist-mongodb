const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const password = process.env.password;

mongoose.connect(
    "mongodb+srv://jmcguire:password@cluster0.ytwqw.mongodb.net/todolistdb"
);

const itemsSchema = {
    name: String,
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({ name: "Welcome to your todo list" });
const item2 = new Item({ name: "Hit the + to add a new item" });
const item3 = new Item({ name: "<-- Click this to delete" });

const defaultItems = [item1, item2, item3];

const listSchema = { name: String, items: [itemsSchema] };

const List = mongoose.model("List", listSchema);

app.get("/", function (req, res) {
    Item.find({}, (err, results) => {
        if (results.length === 0) {
            Item.insertMany(defaultItems, (err) => {
                if (err) console.log(err);
                else {
                    console.log("Success - defaults saved");
                }
            });
            res.redirect("/");
        } else {
            res.render("list", { listTitle: "Today", newListItems: results });
        }
    });
});

app.get("/:newlist", function (req, res) {
    const newlist = _.capitalize(req.params.newlist);
    List.findOne({ name: newlist }, (err, results) => {
        if (!results) {
            const list = new List({ name: newlist, items: defaultItems });
            list.save();
            res.redirect("/" + newlist);
        } else {
            res.render("list", {
                listTitle: results.name,
                newListItems: results.items,
            });
        }
    });
});

app.post("/", function (req, res) {
    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({ name: itemName });

    if (listName === "Today") {
        item.save();
        res.redirect("/");
    } else {
        List.findOne({ name: listName }, (err, results) => {
            results.items.push(item);
            results.save();
            res.redirect("/" + listName);
        });
    }
});

app.post("/delete", (req, res, next) => {
    const listName = req.body.listName;
    const checkedItem = req.body.checkbox;

    if (listName === "Today") {
        Item.findByIdAndRemove(checkedItem, (err) => {
            if (err) console.log(err);
            else {
                console.log(`deleted item ${checkedItem}`);
                res.redirect("/");
            }
        });
    } else {
        List.findOneAndUpdate(
            { name: listName },
            { $pull: { items: { _id: checkedItem } } },
            (err, foundList) => {
                if (!err) {
                    res.redirect("/" + listName);
                }
            }
        );
    }
});

app.get("/about", function (req, res) {
    res.render("about");
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, function () {
    console.log("Server started successfully");
});
