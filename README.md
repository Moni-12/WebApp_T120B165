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
* Serverinei daliai (angl. back-end) - C# ASP.NET Core
* Duomenų bazė - PostgreSQL

Žemiau pavaizduota sistemos diegimo diagrama. Visas projektas patalpintas saityne Azure serveryje.

![deployment](https://github.com/Moni-12/WebApp_T120B165/assets/79746010/9fce5fd3-4dbc-4afc-adf0-5c466d1aa1e0)

# 2. API dokumentacija
Šioje sistemoje yra trys hierachiškai susiję klasės Author->Book->Review. Kiekvienos klasės objektams skaityti, modifikuoti, atnaujinti ir trinti yra po API metodą.

## 2.1. Author API metodai
### GetAllAuthors
#### Grąžina visus autorius sistemoje
#### Autorizacijos lygis: prieinama visiems naudotojams
#### Parameters
| Name  | Required | Description         | Default Value | Example |
|-------|----------|---------------------|---------------|---------|
| id    |          | The ID of the athor |               |  1      |
| firstname  |       | Author's first and middle names | | Joanne K. |
| lastname | Author's last name | | Rowling |
| dateOfBirth | Author's date of birth | | 1965-07-31 |
| aboutAuthor | The describtion about author | | Describtion |

#### Request
```http
GET https://whale-app-4h4zj.ondigitalocean.app/api/authors
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
#### Autorizacijos lygis: prieinama visiems naudotojams
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
#### Autorizacijos lygis: tik administratoriaus funkcija
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
#### Autorizacijos lygis: tik administratoriaus funkcija
#### Request
```http
PUT https://localhost:7031/api/authors/{authorId}
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
#### Autorizacijos lygis: tik administratoriaus funkcija
#### Request
```http
DELETE https://localhost:7031/api/authors/{authorId}
```
#### Response
```http
Status 204
```
## 2.2. Book API metodai
### GetAllBooks
#### Grąžina visas knygas, kurios priklauso pasirinktam autoriui
#### Autorizacijos lygis: prieinama visiems naudotojams
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
#### Autorizacijos lygis: prieinama visiems naudotojams
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
#### Autorizacijos lygis: tik administratoriaus funkcija
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
#### Autorizacijos lygis: tik administratoriaus funkcija
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
#### Autorizacijos lygis: tik administratoriaus funkcija
#### Request
```http
DELETE https://localhost:7031/api/authors/{authorId}/boooks/{bookId}
```
#### Response
```http
Status 204
```
## 2.2. Review API metodai
### GetAllReviews
#### Grąžina visas knygas, kurios priklauso pasirinktai knygai
#### Autorizacijos lygis: prieinama visiems naudotojams
#### Request
```http
GET https://localhost:7031/api/authors/{authorId}/books/{bookId}/reviews
```
#### Response
```http
Status 200
[
    {
        "id": 1,
        "content": "Content",
        "creationDate": "2023-09-27T23:36:09.7917247",
        "book": {
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
    },
    {
        "id": 2,
        "content": "Nice!",
        "creationDate": "2023-09-27T23:36:22.3938896",
        "book": {
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
    }
]
```
### GetReviewById
#### Grąžina atsiliepimą pagal id, jei pasirinkta knyga egzistuoja
#### Autorizacijos lygis: prieinama visiems naudotojams
#### Request
```http
GET https://localhost:7031/api/authors/{authorId}/boooks/{bookId}/reviews/{reviewId}
```
#### Response
```http
Status 200
{
        "id": 1,
        "content": "Content",
        "creationDate": "2023-09-27T23:36:09.7917247",
        "book": {
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
}
```
### CreateReview
#### Sukuria naują atsiliepimą, jei pasirinkta knyga egzistuoja
#### Autorizacijos lygis: gali atlikti prisijungęs naudotojas ir administratorius
#### Request
```http
POST https://localhost:7031/api/authors/{authorId}/boooks/{bookId}/reviews
```
#### Request Body
```http
{
    "Content": "Content"
}
```
#### Response
```http
Status 201
{
        "id": 1,
        "content": "Content",
        "creationDate": "2023-09-27T23:36:09.7917247",
        "book": {
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
}
```
### UpdateReview
#### Atnaujina atsiliepimo turinį
#### Autorizacijos lygis: gali prisijungęs naudotojas keisti tik savo sukurtą atsiliepimą ir administratorius gali keisti visus atsiliepimus
#### Request
```http
PUT https://localhost:7031/api/authors/{authorId}/boooks/{bookId}/reviews/{reviewId}
```
#### Request Body
```http
{
    "Content": "New content"
}
```
#### Response
```http
Status 200
{
        "id": 1,
        "content": "New content",
        "creationDate": "2023-09-27T23:36:09.7917247",
        "book": {
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
}
```
### DeleteReview
#### Ištrina atsiliepimą
#### Autorizacijos lygis: gali prisijungęs naudotojas ištrinti tik savo sukurtą atsiliepimą ir administratorius gali ištrinti visus atsiliepimus
#### Request
```http
DELETE https://localhost:7031/api/authors/{authorId}/boooks/{bookId}/reviews/{reviewId}
```
#### Response
```http
Status 204
```
