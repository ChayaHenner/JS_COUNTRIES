import { codeToName } from "./events.js"

export default class Country {
    constructor(item) {
        this.name = item.name.common
        this.population = item.population
        this.languages = Object.values(item.languages)
        this.coin = Object.keys(item.currencies)
        this.capital = item.capital ? item.capital : "none"
        this.lat = item.latlng[0]
        this.lon = item.latlng[1]
        this.borders = item.borders
        this.img = item.flags.png
        this.code = item.cca3
    }
    render() {
        let div = document.createElement("div")
        document.querySelector("#main_row").appendChild(div)
        div.className = "card m-3 p-4 shadow col-md-4  single"
        div.setAttribute('data-aos', 'flip-right');
        div.innerHTML =    `
        <div class="info "><div class="pic">
                        <a href="index.html?name=${this.code}">
                            <img src="${this.img}" class="w-100" alt="${this.name} flag">
                        </a></div>
                        <div class="name text-center display-6 m-2">${this.name}</div>
                    </div> `
    }
    renderSingle() {
        let div = document.createElement("div")
        document.querySelector("#main_row").appendChild(div)
        div.className = "shadow m-2  row w-100 single"
        div.style="height: 600px;"
        div.innerHTML = `<div  class="map col  row align-items-center">
    <iframe class="" id="map" width="100%" height="100%"  frameborder="0" scrolling="no"
        marginheight="0" marginwidth="0"
        src="https://maps.google.com/maps?q=${this.lat},${this.lon}&hl=en&z=6&amp;output=embed">
    </iframe>
</div>
<div class="col p-2 text-center">
    <a href="index.html?name=${this.code}" class=" m-0 p-0">
        <img src="${this.img}" class=" p-3 img " alt="${this.name} flag">
    </a>
    <div class="name  mt-3">${this.name}</div>
        <div id="pop">Population: ${this.population}</div>
        <div id="lang">Languages: ${this.languages}</div>
        <div id="coin">Coin: ${this.coin}</div>
        <div id="cap">Capital: ${this.capital}</div>
        <div id="bor">Borders: </div></div>
</div>`
div.setAttribute('data-aos', 'zoom-out-up');

        div.querySelector(".name").setAttribute('data-aos', 'zoom-out-up');
        div.querySelector(".img").setAttribute('data-aos', 'zoom-out-up');
        div.querySelector("#map").setAttribute('data-aos', 'zoom-out-up');
        const borders = document.querySelector("#bor")

        this.borders.forEach(border => {
            const linkElement = document.createElement('a');
            linkElement.href = ` index.html?name=${border} `;

            (async () => {

                try {
                    const countryName = await codeToName(border);
                    linkElement.innerHTML = ` ${countryName} `;
                } catch (error) {
                    console.error('Error fetching country name:', error);
                    linkElement.innerHTML = '-';
                }
            })();
            borders.appendChild(linkElement);
        })
    }


}
const arrayToString = (ar) => {
    let st = ""
    ar.forEach(element => {
        st = st + ", " + element
    });
    return st
}