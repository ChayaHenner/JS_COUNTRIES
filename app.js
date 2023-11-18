// import CountryClass from "./countryClass.js"
import {createStartCountries, doApiSingle ,createCountry, declareEvents, callApi, load, hideLoading, codeToName } from "./events.js"
let ar_url = []

window.onload = () => {
    declareEvents(doApi)
    if (doApiSingle())
            createStartCountries()
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
            console.log(data)
            console.log(ar_url)
            console.log(data[0])
            ar_url = data
            console.log(ar_url)
            localStorage.setItem("list", JSON.stringify(ar_url))

            createCountry(ar_url)
        }
    })
        .catch(err => console.log(err))

}




