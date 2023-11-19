// import CountryClass from "./countryClass.js"
import {createStartCountries, doApiSingle ,createCountry, declareEvents, callApi, load, hideLoading, codeToName } from "./events.js"
let ar_url = []

window.onload = () => {
    declareEvents(doApi)
    if (doApiSingle())
        if (id_input.value.length > 1)
                doApi(id_input.value);
        else createStartCountries()
}

const doApi = async (name) => {
    load()
    localStorage.setItem("search", JSON.stringify(name))

    let url = `https://restcountries.com/v3.1/name/${name}`

    callApi(url).then(data => {
        if (data.status && data.status === 404) {
            alert("No country found. Back to home page")
            console.error('Error: Country Not Found (404)');
            createStartCountries()
        }

        else {
            ar_url = data
            localStorage.setItem("list", JSON.stringify(ar_url))
            createCountry(ar_url)
        }
    })
        .catch(err => console.log(err))

}




