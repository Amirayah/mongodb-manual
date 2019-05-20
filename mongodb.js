Manual
#Class 1
%%conjuring MongoDB

%%regular javascript variable assignment
var potion = { 
	"name": "Invisibility",
	"vendor": "Kettlecooked"
}

%%access the variable assignment

>potion

------------------
%%Documents are just JSON-like Objects
%%surranded by curly braces
%%field
%%value
%%separated by a comma

%%Switches to use the database and creates it if doesn't exist 
%%exist when we write to it

>use reviews %%swithed to db reviews
>db %%returns the current database name
>show dbs %%show list os databases 

%%Inserting a document into a collection

%%we can use the insert() collection method to save a potion
%%to the potions collection

>db.potions.insert({
	"name": "Invisibility",
	"vendor": "Kettlecooked"
})

%%whenever we write to the database, we'll always be returned
%%a WriteResult Object 

%%Finding all potions

%%we can use the find() collection method to retrieve the potions
%%from the inventory collection

%%all collection methods must end with parentheses

>db.potions.find()
{
	%%unique id that gets automatically generated
	"_id": ObjectId("47tgr348738983y984398923"),
	"name": "Invisibility",
	"vendor": "Kettlecooked"
}

%%conjuring MongoDB
%%we can find a query of equality by specifying a field to query
%%and the value we'd like

>db.potions.find({"name": "Invisibility"})

%%queries will return all fields of matching Documents

%%adding a lis of ingredients
%%array are a great option for storing lists of data

{
	"name": "Love"
	"vendor": "cupido"
	"price": 300,
	"score": 100,
	"tryDate": new Date(2019,2,14),
	"ingredients": ["tears", 34,"laughteer"]
}
%%we can store any data type within an array


#Class 2
%Mystical Modifications%

%%the $unseet operator can be used to remove specified fields

db.potions.update(
	{},
	{"$unset": {"color": ""}}, %the value we pass doesn't impact the operation
	{"multi": true} %%%Update all potions
)

%%delete a single document

>db.potions.remove(
{
	"name": "Love"
}	)

%%updating a document

>db.potions.update(
	{"name": "Love"},
	{"$set": {"price": 400}}
)
%%update operators always begin with a $

%%the update method can take a third parameter for options
>db.potions.update(
	{"name": "Love"},
	{"$set": {"vendor": "God"}},
	{"multi": true}
)
%%whrn multi is true, the update modifies all matching Documents

