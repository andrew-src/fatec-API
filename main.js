// Event listener for the "estados" select element
document.getElementById("estados").addEventListener("change", function () {
    var selectedState = this.value;
    console.log("Selected option:", selectedState);
    listByState(selectedState);
});

// Event listener for the "procurarCidade" button
document.getElementById("procurarCidade").addEventListener("click", () => {
    var cityValue = document.getElementById("cidadeInput").value;
    console.log("City:" + cityValue);
    getCityInfo(cityValue);
});

// Function to fetch and list all data
function listAll() {
    const url = "http://localhost:5500/consulta";

    const options = {
        method: 'GET'
    }

    fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error requesting data: " + response.status);
            }
        }).then(data => {
            console.log("API data:", data)
            console.log("Number of records received:", data.length);
        })
        .catch(error => {
            console.log("Error requesting API:", error)
        })
}

// Function to fetch and list data by state
function listByState(state) {
    const url = `http://localhost:5500/consulta/estado/${state}`;

    const options = {
        method: 'GET'
    }

    fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error requesting data: " + response.status);
            }
        }).then(data => {
            console.log("API data:", data)
            console.log("Number of records received:", data.length);

            const cityList = document.getElementById('cityList');
            cityList.innerHTML = '';

            data.forEach(city => {
                addCityToList(city['municipio-nome']);
            });
        })
        .catch(error => {
            console.log("Error requesting API:", error)
        })

    function addCityToList(cityName) {
        const listItem = document.createElement('li');
        listItem.textContent = cityName;
        document.getElementById('cityList').appendChild(listItem);
    }
}

// Function to fetch and display city information
function getCityInfo(city) {
    const url = `http://localhost:5500/consulta/cidade/${city}`;

    const options = {
        method: 'GET'
    }

    fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error requesting data: " + response.status);
            }
        }).then(data => {
            console.log("API data:", data)
            console.log("Number of records received:", data.length);

            document.getElementById('municipio').value = data[0]['municipio-nome'];
            document.getElementById('regiaoMetropolitana').value = data[0]['mesorregiao-nome'];
            document.getElementById('sigla').value = data[0]['UF-sigla'];
            document.getElementById('estado').value = data[0]['UF-nome'];
            document.getElementById('regiao').value = data[0]['regiao-nome'];
        })
        .catch(error => {
            console.log("Error requesting API:", error)
        })
}