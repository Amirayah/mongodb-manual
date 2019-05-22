Manual
#Class 1
//conjuring MongoDB

//regular javascript variable assignment
var potion = { 
	"name": "Invisibility",
	"vendor": "Kettlecooked"
}

//access the variable assignment

>potion

------------------
//Documents are just JSON-like Objects
//surranded by curly braces
//field
//value
//separated by a comma

//Switches to use the database and creates it if doesn't exist 
//exist when we write to it

>use reviews //swithed to db reviews
>db //returns the current database name
>show dbs //show list os databases 

//Inserting a document into a collection

//we can use the insert() collection method to save a potion
//to the potions collection

>db.potions.insert({
	"name": "Invisibility",
	"vendor": "Kettlecooked"
})

//whenever we write to the database, we'll always be returned
//a WriteResult Object 

//Finding all potions

//we can use the find() collection method to retrieve the potions
//from the inventory collection

//all collection methods must end with parentheses

>db.potions.find()
{
	//unique id that gets automatically generated
	"_id": ObjectId("47tgr348738983y984398923"),
	"name": "Invisibility",
	"vendor": "Kettlecooked"
}

//conjuring MongoDB
//we can find a query of equality by specifying a field to query
//and the value we'd like

>db.potions.find({"name": "Invisibility"})

//queries will return all fields of matching Documents

//adding a lis of ingredients
//array are a great option for storing lists of data

{
	"name": "Love"
	"vendor": "cupido"
	"price": 300,
	"score": 100,
	"tryDate": new Date(2019,2,14),
	"ingredients": ["tears", 34,"laughteer"]
}
//we can store any data type within an array


#Class 2
//%Mystical Modifications%

//the $unseet operator can be used to remove specified fields

db.potions.update(
	{},
	{"$unset": {"color": ""}}, %the value we pass doesn't impact the operation
	{"multi": true} //%Update all potions
)

//delete a single document

>db.potions.remove(
{
	"name": "Love"
}	)

//updating a document

>db.potions.update(
	{"name": "Love"},
	{"$set": {"price": 400}}
)
//update operators always begin with a $

//the update method can take a third parameter for options
>db.potions.update(
	{"name": "Love"},
	{"$set": {"vendor": "God"}},
	{"multi": true}
)
//where multi is true, the update modifies all matching Documents

//adding a Potion's Ratings
//An embedded document doesn't require an id since
//it's child of the main document'
>db.potions.insert(
	{
		"name": "Paradise",
		"vendor": "Gxxd",
		"price": 10.80,
		"score": 70,
		"tryDate": new Date(2019,4,9),
		"ingredients": ["Acid", 4, "drugs"],
		"ratings": {"strength": 2, "flavor":1}
	}
)

//we embed documents simply by adding the document as a value 
//for given field

//finfing potions by ingredients

>db.potions.find({"ingredients": "Acid"})

//Update a Document's count'

//We can use the $inc operator to increment the count
//of a existing log document

>db.logs.update(
	{ "potion": "Paradise"},
	{"$inc": {"count": 1}}	
)
//we can increment by any number, positive or negative
//if field coesn't exist, it gets created with the value

//Find or create with Upsert
//the ipsert option either updates an existing document or 
//creates a new one

>db.logs.update(
	{"potion": "Invisibility"},
	{"$inc": {"count": 1}},
	{"upsert": true} //create a document using the values from the query
)

//result
WriteResult(
	{"nMatched": 0,
	"nUpserted": 1, //1 document created
	"nModified": 0
	})

//Removing fields from Documents 
//the $unset operator can be used to remove specified fields.

>db.potions.update(
	{}, //query for all potions
	{"$unset": {"color": ""}},
	{"multi": true}//update all potions
)

//Updating a field name with $rename
//we can use $rename to change field names

>db.potions.update(
	{}, //query for all potions
	{"$rename": {"score": "grade"}},//rename specified field
	{"multi": true}
)

////Updating Array values by location
//insert potions
>db.potions.insert(
	{
		"name": "Oishi",
		"vendor": "Off",
		"price": 11,
		"score": 50,
		"tryDate": new Date(2018,4,9),
		"ingredients": ["hippo", "secret", "wasabi"],
		"ratings": {"strength": 2, "flavor":1}
	}
)

//updating single array value
>db.potions.update(
	{"name": "Oishi"},
	{"$set": {"ingredients.2": 35}}
)

//WriteResult({"nMatched": 1, "nUpserted": 0, "nModified: 1"})
