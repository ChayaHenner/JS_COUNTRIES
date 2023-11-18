import CountryClass from "./countryClass.js"

export const declareEvents = (doApi) => {

    let search_btn = document.querySelector("#search_btn")
    let id_input = document.querySelector("#id_input")
    let id_select = document.querySelector("#id_select");


// // When leaving the homepage (e.g., clicking a link)
// window.addEventListener('beforeunload', () => {
//     history.replaceState({ scrollX: window.scrollX, scrollY: window.scrollY }, '');
// });

// // When returning to the homepage
// window.addEventListener('DOMContentLoaded', () => {
//     // Disable automatic scroll restoration
//     history.scrollRestoration = 'manual';

//     // Check if there's a stored scroll position in the history state
//     if (history.state && history.state.scrollX && history.state.scrollY) {
//         // Restore the scroll position
//         window.scrollTo(history.state.scrollX, history.state.scrollY);
//     }
// });



    search_btn.addEventListener("click", () => {
        if (id_input.value.length > 1)
            doApi(id_input.value)
    })
    id_input.addEventListener("keydown", (e) => {
        console.log(e.key)
        if (e.key == "Enter") {
            if (id_input.value.length > 1)
                doApi(id_input.value);
        }
    })
    id_select.addEventListener("change", () => {
        if(localStorage["list"]){
          
            let ar_url=JSON.parse( localStorage["list"]);
            createCountry(ar_url);
        }
          
    
    })

}
export const callApi = async (url) => {
    const resp = await fetch(url);
    return await resp.json();
}

export const load = () => {
    document.querySelector(".loading").style.display = "block";
    document.querySelector("#main_row").style.display = "none";
}


export const hideLoading = () => {
    document.querySelector(".loading").style.display = "none";
    document.querySelector("#main_row").style.display = "flex";
}
export const codeToName = async (code) => {
    let url = `https://restcountries.com/v3.1/alpha/${code}`
    console.log(url);
    let resp = await fetch(url)
    console.log(resp);

    let data = await resp.json();
    console.log(data);
    console.log(data[0].name.common);

    return data[0].name.common

}
export const createCountry = (ar_url) => {
    hideLoading()
    console.log(ar_url)

    ar_url = sortAtlas(ar_url)
    console.log(ar_url)

    document.querySelector("#main_row").innerHTML = ""
    ar_url.forEach(element => {
        let country = new CountryClass(element)
        country.render()
    });

}
export const sortAtlas = (data) => {
    let sorted_data = data
    let select_val = document.querySelector("#id_select").value;
    console.log("|" + select_val + "|")

    if (select_val == "name") {
        console.log("|" + sorted_data + "|")
        sorted_data = _.sortBy(data, obj => obj.name.common)
        console.log("|" + sorted_data + "|")

        console.log(1)
    }
    if (select_val == "population") {
        sorted_data = _.sortBy(data, obj => obj.population)
    }
    return sorted_data

}

export const doApiSingle = () => {
    load()
    const urlParams = new URLSearchParams(window.location.search)
    let country = urlParams.get("name")
    console.log(country)
    if (country) {
        let url = `https://restcountries.com/v3.1/alpha/${country}`
        console.log(url);

        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                hideLoading()
                let country = new CountryClass(data[0])
                country.renderSingle()

            })
        return false

    }
    return true
}

export const createStartCountries = () => {
    // console.log(ar_url)
    const ar_countries = ["usa", "israel", "Thailand", "france", "britain"]
    const ar_url = []

    ar_countries.forEach(element => {
        let url = `https://restcountries.com/v3.1/name/${element}?fields=name,population,languages,currencies,capital,latlng,borgers,flags,cca3`
        callApi(url).then(data => {
            ar_url.push(data[0])
            // console.log(data)
             console.log(ar_url)
            hideLoading()
            console.log(ar_url)
            localStorage.setItem("list", JSON.stringify(ar_url))

            let country = new CountryClass(data[0])
            country.render()


        })
    })
}

