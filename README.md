# mmpr
Multimeediumi praktikum


Töötav lahendus saadaval aadressil: 
https://tigu.hk.tlu.ee/~siim.seppi/mmpr/app/

Mina keskendun programmeerimisel hetkel ainult funktsionaalsusele, ma ei säti mingeid fonte, kirjasuuruseid, värve, tauste jms. Ainult minimaalselt (nt see juhiste nupu vajutamisel tekkiv modaalaken on natuke tuunitud.) KUI SUL ON HUVI JA TAHTMIST VÕID UURIDA JA KATSETADA MINGIT DISAINI. Nt nupud, taustad, värvid, tekstid. 

1. Tee oma arvutis, kus iganes nt kooliasju hoiad, üks tühi kaust
2. Visual Studio Code (VSC) pane käima, siis File->Open Folder..-> ja vali see kaust, mis tegid. Peaks vist uue aknaga lahti viskama selle kausta.
3. VSC Terminalis (Terminal->New Terminal, kui pole all juba lahti) peaks näitama, kas oled õiges kaustas. Nt mul: <br><br>
 ![image](https://user-images.githubusercontent.com/80106964/155364571-004bc688-8c38-40a3-bb6c-3309d425122f.png)

4. Sinna saad kirjutada järgmised käsud, et asjad githubist kopeerida oma arvutisse:
5. git clone https://github.com/siimsep/mmpr.git
6. Ja peakski kopeerima ühe kausta sulle, kus need failid. Sisesta Terminali uuesti järgmine käsk:
7. cd .\mmpr\
8. See viib sind Terminali vaates sinna kausta, kus nt index.html asub. See on hea siis kui tahad muudatusi tagasi üles laadida. (cd tähendab change directories :P)
9. Nüüd peaks Terminali aken välja nägema midagi sellist: <br><br>
 ![image](https://user-images.githubusercontent.com/80106964/155365726-c0e50ec3-2be0-4157-8ecb-6cab1d601e64.png)
10. Explorer aknas näed kõiki faile ja sealt saad muutmiseks avada.<br><br>
![image](https://user-images.githubusercontent.com/80106964/155365865-f6a2da6d-fe44-41ad-87de-bc1792d6fcca.png)
11. Kui oled muudatusi teinud, saad katsetada avades oma veebibrauseris see index.html 
12. Kui tahad muudatusi githubi tagasi üles laadida, et me kõik sellest osa saaks siis pead sisestama Terminali järgmised käsud:
13. git add .
14. git commit -m "Väike kirjeldus tehtu kohta"
15. git push

16. Kui tahad mingi muu päev jälle nikerdada, aga tõenäoliselt ma olen Githubis mingeid muudatusi sisse viinud, siis saad oma kausta sisu värskendada Terminali käsuga:
17. git pull 
