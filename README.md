# Read and share
T120B165 Saityno taikomųjų programų projektavimas

# 1. Uždavinio aprašymas
## 1.1. Sistemos paskirtis
Projekto tikslas – padaryti internetinę svetainę, kurioje bus galima ieškoti informacijos ir palikti atsiliepimus apie knygas ir jų autorius.
Neprisiregistravęs naudotojas svetainėje galės tik peržiūrėti informaciją apie knygas ir autorius bei matyti kitų paliktus komentarus. Prisijungęs naudotojas taip pat galės komentuoti. Tik administratorius galės pridėti/redaguoti/ištrinti informaciją apie autorius ir knygas. Kiekvienas autorius gali turėti keletą knygų, o kiekviena knyga gali turėti keletą komentarų.

## 1.2. Sistemos funkciniai reikalavimai
Sistemoje yra trys naudotojų rolės: svečias, prisijungęs naudotojas ir administratorius\
Svečias galės:
> Peržiūrėti knygas ir jų komentarus\
> Peržiūrėti autorius\
> Filtruoti norimus duomenis\
> Prisijungti\
> Registruotis

Prisijungęs naudotojas galės:
> Viską gali atlikti, ką atlieka svečias\
> Atsijungti nuo svetainės\
> Palikti komentarą apie knygą\
> Redaguoti savo komentarą\
> Pašalinti savo komentarą

Administratorius galės:
> Viską gali atlikti, ką atlieka prisijungęs naudotojas\
> Valdyti autorių (sukurti naują, redaguoti, ištrinti)\
> Valdyti knygą (sukurti naują, redaguoti, ištrinti)\
> Ištrinti nepageidautinus komentarus

# 2. Architektūra
Šiai internetinei svetaine realizuoti naudojama trijų sluoksnių architektūra.
* Klientinei daliai (angl. front-end) - React.js
* Serverinei daliai (angl. back-end) - C# .NET Core
* Duomenų bazė - MySQL

Žemiau pavaizduota sistemos diegimo diagrama. Visas projektas patalpintas saityne Azure serveryje.

![deployment](https://github.com/Moni-12/WebApp_T120B165/assets/79746010/6d2f6669-b23d-4971-9898-64bb7e4553f9)

# 2. API dokumentacija
Šioje sistemoje yra trys hierachiškai susiję klasės Author->Book->Review. Kiekvienos klasės objektams skaityti, modifikuoti, atnaujinti ir trinti yra po API metodą.

## 2.1. Author API metodai
### GetAllAuthors
#### Grąžina visus autorius sistemoje
#### Request
```http
GET https://localhost:7031/api/authors
```
#### Response
```http
Status 200
[
    {
        "id": 1,
        "firstName": "Name",
        "lastName": "LatName",
        "dateOfBirth": "1965-07-31T00:00:00",
        "aboutAuthor": "Description"
    },
    {
        "id": 2,
        "firstName": "Name",
        "lastName": "LatName",
        "dateOfBirth": "1978-04-21T00:00:00",
        "aboutAuthor": "Description"
    }
]
```
### GetAuthorById
#### Grąžina autorių pagal id
#### Request
```http
GET https://localhost:7031/api/authors/{authorId}
```
#### Response
```http
Status 200
{
    "id": 1,
    "firstName": "Name",
    "lastName": "LastName",
    "dateOfBirth": "1965-07-31T00:00:00",
    "aboutAuthor": "Description"
}
```
### CreateAuthor
#### Sukuria naują autorių
#### Request
```http
POST https://localhost:7031/api/authors
```
#### Request Body
```http
{
    "FirstName": "Name",
    "LastName": "LastName",
    "DateOfBirth": "1835-11-30",
    "AboutAuthor": "Author description"
}
```
#### Response
```http
Status 201
{
    "id": 1,
    "FirstName": "Name",
    "LastName": "LastName",
    "DateOfBirth": "1835-11-30",
    "AboutAuthor": "Author description"
}
```
### UpdateAuthor
#### Atnaujina autoriaus aprašymą
#### Request
```http
PUT https://localhost:7031/api/authors/1
```
#### Request Body
```http
{
    "AboutAuthor": "New description"
}
```
#### Response
```http
Status 200
{
    "id": 1,
    "FirstName": "Name",
    "LastName": "LastName",
    "DateOfBirth": "1835-11-30",
    "AboutAuthor": "New description"
}
```
### DeleteAuthor
#### Ištrina autorių
#### Request
```http
DELETE https://localhost:7031/api/authors/1
```
#### Response
```http
Status 204
```
## 2.2. Book API metodai
### GetAllBooks
#### Grąžina visas knygas, kurios priklauso pasirinktam autoriui
#### Request
```http
GET https://localhost:7031/api/authors/{authorId}/books
```
#### Response
```http
Status 200
[
    {
        "id": 2,
        "title": "Harry Potter and the Philosopher’s Stone",
        "description": "Description",
        "releaseDate": "1997-06-26T00:00:00",
        "genre": "Fiction",
        "author": {
            "id": 1,
            "FirstName": "Name",
            "LastName": "LastName",
            "DateOfBirth": "1835-11-30",
            "AboutAuthor": "Author description"
        }
    },
    {
        "id": 3,
        "title": "Harry Potter and the Chamber of Secrets",
        "description": "Description",
        "releaseDate": "1997-06-26T00:00:00",
        "genre": "Fiction",
        "author": {
            "id": 1,
            "FirstName": "Name",
            "LastName": "LastName",
            "DateOfBirth": "1835-11-30",
            "AboutAuthor": "Author description"
        }
    }
]
```
### GetBookById
#### Grąžina knygą pagal id, jei pasirinktas autorius irgi egzistuoja
#### Request
```http
GET https://localhost:7031/api/authors/{authorId}/boooks/{bookId}
```
#### Response
```http
Status 200
{
        "id": 2,
        "title": "Harry Potter and the Philosopher’s Stone",
        "description": "Description",
        "releaseDate": "1997-06-26T00:00:00",
        "genre": "Fiction",
        "author": {
            "id": 1,
            "FirstName": "Name",
            "LastName": "LastName",
            "DateOfBirth": "1835-11-30",
            "AboutAuthor": "Author description"
        }
}
```
### CreateBook
#### Sukuria naują knygą, jei pasirinktas autorius egzistuoja
#### Request
```http
POST https://localhost:7031/api/authors/{authorId}/books
```
#### Request Body
```http
{
    "Title": "Title",
    "Description": "Description",
    "ReleaseDate": "1998-07-02",
    "Genre": "Genre"
}
```
#### Response
```http
Status 201
{
        "id": 3,
        "title": "Title",
        "description": "Description",
        "releaseDate": "1998-07-02T00:00:00",
        "genre": "Genre",
        "author": {
            "id": 1,
            "FirstName": "Name",
            "LastName": "LastName",
            "DateOfBirth": "1835-11-30",
            "AboutAuthor": "Author description"
        }
}
```
### UpdateBook
#### Atnaujina knygos aprašymą ir žanrą
#### Request
```http
PUT https://localhost:7031/api/authors/{authorId}/boooks/{bookId}
```
#### Request Body
```http
{
    "Description": "New description",
    "Genre": "New genre"
}
```
#### Response
```http
Status 200
{
        "id": 3,
        "title": "Title",
        "description": "New description",
        "releaseDate": "1998-07-02T00:00:00",
        "genre": "New genre",
        "author": {
            "id": 1,
            "FirstName": "Name",
            "LastName": "LastName",
            "DateOfBirth": "1835-11-30",
            "AboutAuthor": "Author description"
        }
}
```
### DeleteBook
#### Ištrina knygą
#### Request
```http
DELETE https://localhost:7031/api/authors/{authorId}/boooks/{bookId}
```
#### Response
```http
Status 204
```
