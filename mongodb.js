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
//successful update

//updating an embedded value
//we can update using the dot notation to specify the field
//we want to update
>db.potions.update(
	{"name": "Oishi"},
	{"$set": {"ratings.strength": 5}}
)
//WriteResult({"nMatched": 1,"nUpserted": 0,"nModified": 1})

//removing the first or last value of an array
//the $pop ooperator will remove either the first or last value
//of an array
>db.potions.update(
	{"name": "Oishi"},
	{"$pop": {"ingredients": 1}}
)
//result "ingredients": ["hippo", "secret"]
//removes the first element -1
//removes the last element 1

//the $push operator will add a value to the the end of an array

>db.potions.update(
	{"name": "Oishi"},
	{"$push": {"ingredients": "crack"}}
)

//result "ingredients": ["hippo","secret","crack"]

//the $pull operator will remove
//any instance of a value from an array.
>db.potions.update(
	{"name": "Oishi"},
	{"$pull": {"ingredients": "secret"}}
)
//result "ingredients": ["secret"]

//Materializing Potions: Query operators

//finding potions that are less than $20
//$lt : less than
>db.potions.find({"price": {"$lt": 20}})
//return values less than 20
//$gt: greater than
>db.potions.find({"price": {"$gt": 20}})

//range queries on an array
// We can use $elemMatch to make sure at least 1 element matches all criteria.
>db.potions.find(
	{"price": {"$elemMatch": {"$gt":8, "$lt": 20}}}
)

//continuing to iterate through the cursor
//typing "it" will display the next 20 documents in the cursor
>it
//cursor methods
>db.potions.find().count()
//it returns the curso object
>db.potions.find().sort({"price": 1})
//we can use the sort() cursor method to sort documents
//-1 descending
//1 ascending

//basic pagination
//limitining and skipping over documents
//limit() method
>db.potions.find().limit(3)
>db.potions.find().skip(3).limit(3)

//Morphing Models: Data modeling

//inserting referenced documents
>db.vendors.insert(
{
	"_id": "Off",
	"phone": "6666666666",
	"organic": true
}
)
>db.potions.insert(
{
	"name": "Oishi",
	"vendor_id": "Off"//referenced document
	...
}
	)

//finding the number of potions per vendor
> db.potions.find({}, {"name": true, "vendor": true})