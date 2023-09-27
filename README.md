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
}
```

