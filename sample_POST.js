/*** BOOKS ***/

//POST / add()
http -p HBhb POST localhost:8000/books title='Some Title' author='Some Author' genre='Horror' description='something something' cover_url='site.com/cover.jpg'

//PATCH / update()
http -p HBhb PATCH localhost:8000/books/9 title='Changed Title'
http -p HBhb PATCH localhost:8000/books/9 author='Changed author'
http -p HBhb PATCH localhost:8000/books/9 genre='Changed genre'
http -p HBhb PATCH localhost:8000/books/9 description='Changed desc'
http -p HBhb PATCH localhost:8000/books/9 cover_url='Changed URL'

//PATCH bad - index too high
http -p HBhb PATCH localhost:8000/books/999 cover_url='Changed URL'
//bad - index too low
http -p HBhb PATCH localhost:8000/books/-1 cover_url='Changed URL'
//bad - index nan
http -p HBhb PATCH localhost:8000/books/hi cover_url='Changed URL'

//DELETE remove()
http -p HBhb DELETE localhost:8000/books/10

/*** USERS ***/
//POST / register()
http -p HBhb POST :8000/users first_name='John' last_name='Siracusa' email='john.siracusa@gmail.com'  password='ilikebigcats'