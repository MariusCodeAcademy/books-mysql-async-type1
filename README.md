# books-mysql-async-type1

## install

1. npm i express morgan cors mysql2 dotenv

# uzd

/\*
Pats laikas pritaikyti savo žinias praktikoje.

Susikuriame dvi lenteles:

    dealer (id, title, town)
    car (id, dealer_id, make, model, year)

Įrašome bent du dealer, ir kiekvienam dealer bent po tris car (t.y. iš viso bent 6 car).

Fronte pasidarom mygtukus kuriu paspaudimu mes generuojame atitinkamus toliau aprasytus duomenis:

    Atvaizduojame lentelę visų car su jų dealer (car.id, dealer.title, dealer.town, car.make, car.model, car.year).
    Atvaizduojame visus dealer ir kiek jie car turi (t.y. dealer.id, dealer.title, dealer.town, count(by car.dealer_id))
    Atvaizduojame visas dealerio cars kai zinome dealerio id
    Atvaizdujame visa dealerio info kai zinome car id
