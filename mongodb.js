Manual
#Class 1
#Class 2
%Mystical Modifications%

%%the $unseet operator can be used to remove specified fields

db.potions.update(
	{},
	{"$unset": {"color": ""}}, %the value we pass doesn't impact the operation
	{"multi": true} %%%Update all potions
)

#Clase 3
%
