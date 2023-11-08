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
| id    |          | The ID of the author |               |  1      |
| firstname |       | Author's first and middle names | | Joanne K. |
| lastname | | Author's last name | | Rowling |
| dateOfBirth | | Author's date of birth | | 1965-07-31 |
| aboutAuthor | | The describtion about author | | Description |

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
#### Parameters
| Name  | Required | Description         | Default Value | Example |
|-------|----------|---------------------|---------------|---------|
| authorId | Yes | The ID of the author to get | | 1|
| id    |          | The ID of the author |               |  1      |
| firstname |       | Author's first and middle names | | Joanne K. |
| lastname | | Author's last name | | Rowling |
| dateOfBirth | | Author's date of birth | | 1965-07-31 |
| aboutAuthor | | The describtion about author | | Description |
#### Request
```http
GET https://whale-app-4h4zj.ondigitalocean.app/api/authors/{authorId}
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
#### Parameters
| Name  | Required | Description         | Default Value | Example |
|-------|----------|---------------------|---------------|---------|
| id    |          | The ID of the author |               |  1      |
| firstname | Yes | Author's first and middle names | | Joanne K. |
| lastname | Yes | Author's last name | | Rowling |
| dateOfBirth | Yes | Author's date of birth | | 1965-07-31 |
| aboutAuthor | Yes | The describtion about author | | Description |
#### Request
```http
POST https://whale-app-4h4zj.ondigitalocean.app/api/authors
```
#### Request Body
```http
{
    "firstName": "Name",
    "lastName": "LastName",
    "dateOfBirth": "1835-11-30",
    "aboutAuthor": "Author description"
}
```
#### Response
```http
Status 201
{
    "id": 1,
    "firstName": "Name",
    "lastName": "LastName",
    "dateOfBirth": "1835-11-30",
    "aboutAuthor": "Author description"
}
```
### UpdateAuthor
#### Atnaujina autoriaus aprašymą
#### Autorizacijos lygis: tik administratoriaus funkcija
#### Parameters
| Name  | Required | Description         | Default Value | Example |
|-------|----------|---------------------|---------------|---------|
| authorId | Yes | The ID of the author to update | | 1|
| id    |          | The ID of the author |               |  1      |
| firstname |   | Author's first and middle names | | Joanne K. |
| lastname | | Author's last name | | Rowling |
| dateOfBirth | | Author's date of birth | | 1965-07-31 |
| aboutAuthor | Yes | The describtion about author | | Description |
#### Request
```http
PUT https://whale-app-4h4zj.ondigitalocean.app/api/authors/{authorId}
```
#### Request Body
```http
{
    "aboutAuthor": "New description"
}
```
#### Response
```http
Status 200
{
    "id": 1,
    "firstName": "Name",
    "lastName": "LastName",
    "dateOfBirth": "1835-11-30",
    "aboutAuthor": "New description"
}
```
### DeleteAuthor
#### Ištrina autorių
#### Autorizacijos lygis: tik administratoriaus funkcija
#### Parameters
| Name  | Required | Description         | Default Value | Example |
|-------|----------|---------------------|---------------|---------|
| authorId | Yes | The ID of the author to delete | | 1|
#### Request
```http
DELETE https://whale-app-4h4zj.ondigitalocean.app/api/authors/{authorId}
```
#### Response
```http
Status 204
```
## 2.2. Book API metodai
### GetAllBooks
#### Grąžina visas knygas, kurios priklauso pasirinktam autoriui
#### Autorizacijos lygis: prieinama visiems naudotojams
#### Parameters
| Name  | Required | Description         | Default Value | Example |
|-------|----------|---------------------|---------------|---------|
| authorId | Yes | The ID of the book's author | | 1 |
| id    |          | The ID of the book |               |  1      |
| title | | The title of the book | | Harry Potter |
| description | | The description of the book | | Fiction book |
| releaseDate | | The release date of the book | | "1997-06-26T00:00:00" |
| genre | | The genre of the book | | Fiction |
| firstname |       | Author's first and middle names | | Joanne K. |
| lastname | | Author's last name | | Rowling |
| dateOfBirth | | Author's date of birth | | 1965-07-31 |
| aboutAuthor | | The describtion about author | | Description |
#### Request
```http
GET https://whale-app-4h4zj.ondigitalocean.app/api/authors/{authorId}/books
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
#### Parameters
| Name  | Required | Description         | Default Value | Example |
|-------|----------|---------------------|---------------|---------|
| authorId | Yes | The ID of the book's author | | 1 |
| bookId | Yes | The ID of the book to get | | 1 |
| id    |          | The ID of the book |               |  1      |
| title | | The title of the book | | Harry Potter |
| description | | The description of the book | | Fiction book |
| releaseDate | | The release date of the book | | "1997-06-26T00:00:00" |
| genre | | The genre of the book | | Fiction |
| firstname |       | Author's first and middle names | | Joanne K. |
| lastname | | Author's last name | | Rowling |
| dateOfBirth | | Author's date of birth | | 1965-07-31 |
| aboutAuthor | | The describtion about author | | Description |
#### Request
```http
GET https://whale-app-4h4zj.ondigitalocean.app/api/authors/{authorId}/boooks/{bookId}
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
#### Parameters
| Name  | Required | Description         | Default Value | Example |
|-------|----------|---------------------|---------------|---------|
| authorId | Yes | The ID of the book's author | | 1 |
| id    |          | The ID of the book |               |  1      |
| title | Yes | The title of the book | | Harry Potter |
| description | Yes | The description of the book | | Fiction book |
| releaseDate | Yes| The release date of the book | | "1997-06-26T00:00:00" |
| genre | Yes | The genre of the book | | Fiction |
| firstname |       | Author's first and middle names | | Joanne K. |
| lastname | | Author's last name | | Rowling |
| dateOfBirth | | Author's date of birth | | 1965-07-31 |
| aboutAuthor | | The describtion about author | | Description |
#### Request
```http
POST https://whale-app-4h4zj.ondigitalocean.app/api/authors/{authorId}/books
```
#### Request Body
```http
{
    "title": "Title",
    "description": "Description",
    "releaseDate": "1998-07-02",
    "genre": "Genre"
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
            "firstName": "Name",
            "lastName": "LastName",
            "dateOfBirth": "1835-11-30",
            "aboutAuthor": "Author description"
        }
}
```
### UpdateBook
#### Atnaujina knygos aprašymą ir žanrą
#### Autorizacijos lygis: tik administratoriaus funkcija
#### Parameters
| Name  | Required | Description         | Default Value | Example |
|-------|----------|---------------------|---------------|---------|
| authorId | Yes | The ID of the book's author | | 1 |
| bookId | Yes | The ID of the book to update | | 1 |
| id    |          | The ID of the book |               |  1      |
| title | | The title of the book | | Harry Potter |
| description | Yes | The description of the book | | Fiction book |
| releaseDate | | The release date of the book | | "1997-06-26T00:00:00" |
| genre | Yes | The genre of the book | | Fiction |
| firstname |       | Author's first and middle names | | Joanne K. |
| lastname | | Author's last name | | Rowling |
| dateOfBirth | | Author's date of birth | | 1965-07-31 |
| aboutAuthor | | The describtion about author | | Description |
#### Request
```http
PUT https://whale-app-4h4zj.ondigitalocean.app/api/authors/{authorId}/boooks/{bookId}
```
#### Request Body
```http
{
    "description": "New description",
    "genre": "New genre"
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
            "firstName": "Name",
            "lastName": "LastName",
            "sateOfBirth": "1835-11-30",
            "aboutAuthor": "Author description"
        }
}
```
### DeleteBook
#### Ištrina knygą
#### Autorizacijos lygis: tik administratoriaus funkcija
#### Parameters
| Name  | Required | Description         | Default Value | Example |
|-------|----------|---------------------|---------------|---------|
| authorId | Yes | The ID of the book's author | | 1 |
| bookId | Yes | The ID of the book to delete | | 1 |
#### Request
```http
DELETE https://whale-app-4h4zj.ondigitalocean.app/api/authors/{authorId}/boooks/{bookId}
```
#### Response
```http
Status 204
```
## 2.2. Review API metodai
### GetAllReviews
#### Grąžina visas knygas, kurios priklauso pasirinktai knygai
#### Autorizacijos lygis: prieinama visiems naudotojams
#### Parameters
| Name  | Required | Description         | Default Value | Example |
|-------|----------|---------------------|---------------|---------|
| authorId | Yes | The ID of the book's author | | 1 |
| bookId | Yes | The ID of the review's book | | 1 |
| id | | The ID of the review | | 1 |
| content | | The text content of the review | | Good review |
| creationDate | | Date and time when review was created | | 2023-11-04T17:51:14.283491Z |
| userName | | The username of the user who posted the review | | admin |
| userId | | The ID of the user who posted the review | | 4f71d6d8-6c21-4119-b1b0-c1fbcb835672 |

#### Request
```http
GET https://whale-app-4h4zj.ondigitalocean.app/api/authors/{authorId}/books/{bookId}/reviews
```
#### Response
```http
Status 200
[
    {
        "id": 20,
        "content": "Good book",
        "creationDate": "2023-11-04T17:51:14.283491Z",
        "userName": "admin",
        "userId": "4f71d6d8-6c21-4119-b1b0-c1fbcb835672"
    },
    {
        "id": 21,
        "content": "Great",
        "creationDate": "2023-11-08T18:55:27.995569Z",
        "userName": "admin",
        "userId": "4f71d6d8-6c21-4119-b1b0-c1fbcb835672"
    }
]
```
### GetReviewById
#### Grąžina atsiliepimą pagal id, jei pasirinkta knyga egzistuoja
#### Autorizacijos lygis: prieinama visiems naudotojams
#### Parameters
| Name  | Required | Description         | Default Value | Example |
|-------|----------|---------------------|---------------|---------|
| authorId | Yes | The ID of the book's author | | 1 |
| bookId | Yes | The ID of the review's book | | 1 |
| reviewId | Yes | The ID of the review to get | | 1 |
| id | | The ID of the review | | 1 |
| content | | The text content of the review | | Good review |
| creationDate | | Date and time when review was created | | 2023-11-04T17:51:14.283491Z |
| userName | | The username of the user who posted the review | | admin |
| userId | | The ID of the user who posted the review | | 4f71d6d8-6c21-4119-b1b0-c1fbcb835672 |
#### Request
```http
GET https://whale-app-4h4zj.ondigitalocean.app/api/authors/{authorId}/boooks/{bookId}/reviews/{reviewId}
```
#### Response
```http
Status 200
{
    "id": 20,
    "content": "Good book",
    "creationDate": "2023-11-04T17:51:14.283491Z",
    "userName": "admin",
    "userId": "4f71d6d8-6c21-4119-b1b0-c1fbcb835672"
}
```
### CreateReview
#### Sukuria naują atsiliepimą, jei pasirinkta knyga egzistuoja
#### Autorizacijos lygis: gali atlikti prisijungęs naudotojas ir administratorius
#### Parameters
| Name  | Required | Description         | Default Value | Example |
|-------|----------|---------------------|---------------|---------|
| authorId | Yes | The ID of the book's author | | 1 |
| bookId | Yes | The ID of the review's book | | 1 |
| id | | The ID of the review | | 1 |
| content | Yes | The text content of the review | | Good review |
| creationDate | | Date and time when review was created | | 2023-11-04T17:51:14.283491Z |
#### Request
```http
POST https://whale-app-4h4zj.ondigitalocean.app/api/authors/{authorId}/boooks/{bookId}/reviews
```
#### Request Body
```http
{
    "content": "Content"
}
```
#### Response
```http
Status 201
{
    "id": 21,
    "content": "Great",
    "creationDate": "2023-11-08T18:55:27.9955691Z"
}
```
### UpdateReview
#### Atnaujina atsiliepimo turinį
#### Autorizacijos lygis: gali prisijungęs naudotojas keisti tik savo sukurtą atsiliepimą ir administratorius gali keisti visus atsiliepimus
#### Parameters
| Name  | Required | Description         | Default Value | Example |
|-------|----------|---------------------|---------------|---------|
| authorId | Yes | The ID of the book's author | | 1 |
| bookId | Yes | The ID of the review's book | | 1 |
| reviewId | Yes | The ID of the review to update | | 1 |
| id | | The ID of the review | | 1 |
| content | Yes | The text content of the review | | Good review |
| creationDate | | Date and time when review was created | | 2023-11-04T17:51:14.283491Z |
#### Request
```http
PUT https://whale-app-4h4zj.ondigitalocean.app/api/authors/{authorId}/boooks/{bookId}/reviews/{reviewId}
```
#### Request Body
```http
{
    "content": "New content"
}
```
#### Response
```http
Status 200
{
    "id": 23,
    "content": "New content",
    "creationDate": "2023-11-08T19:36:53.629628Z"
}
```
### DeleteReview
#### Ištrina atsiliepimą
#### Autorizacijos lygis: gali prisijungęs naudotojas ištrinti tik savo sukurtą atsiliepimą ir administratorius gali ištrinti visus atsiliepimus
#### Parameters
| Name  | Required | Description         | Default Value | Example |
|-------|----------|---------------------|---------------|---------|
| authorId | Yes | The ID of the book's author | | 1 |
| bookId | Yes | The ID of the review's book | | 1 |
| reviewId | Yes | The ID of the review to delete | | 1 |
#### Request
```http
DELETE https://whale-app-4h4zj.ondigitalocean.app/api/authors/{authorId}/boooks/{bookId}/reviews/{reviewId}
```
#### Response
```http
Status 204
```
