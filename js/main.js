let form = document.querySelector('#search_form')

//Fetching data
const getData = async () => {
    let season = document.querySelector("#season").value;
    let round = document.querySelector("#round").value;
    let response = await axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
    return response.data
}

//Harnessing the DOM with const
const DOM_ELEMENTS = {
    racer_data: '#racer_data'
}

//Making a Range list
const make_list = (position, name, nationality, sponsor, points) => {
    const html = `<a href="#" class="list-group-item list-group-item-action list-group-item-light" style="justify-content: space-between"> ${position} ${name} ${nationality} ${sponsor} ${points} </a>`;
    document.querySelector(DOM_ELEMENTS.racer_data).insertAdjacentHTML('beforeend', html)
}

const disp_data = async () => {
    const race_data = await getData(); //Will then return response.data from getData()
    let racers = race_data.MRData.StandingsTable.StandingsLists[0].DriverStandings
    console.log(racers)
    for(i = 0; i < 7; i++){
        //Name
        let first = racers[i].Driver.givenName
        let last = racers[i].Driver.familyName
        let name = first + " " + last
        let disp_name = document.createElement("td")
        console.log(disp_name)
        disp_name.innerHTML = name
        document.querySelector(`#table-row-${i}`).append(disp_name)

        //Nationality
        let nationality = racers[i].Driver.nationality
        let disp_nationality = document.createElement("td")
        console.log(disp_nationality)
        disp_nationality.innerHTML = nationality
        document.querySelector(`#table-row-${i}`).append(disp_nationality)

        //Sponsor
        let sponsor = racers[i].Constructors[0].name
        let disp_sponsor = document.createElement("td")
        console.log(disp_sponsor)
        disp_sponsor.innerHTML = sponsor
        document.querySelector(`#table-row-${i}`).append(disp_sponsor)

        //Points
        let points = racers[i].points
        let disp_points = document.createElement("td")
        console.log(disp_points)
        disp_points.innerHTML = points
        document.querySelector(`#table-row-${i}`).append(disp_points)
    }
}

//Event listener
form.addEventListener('submit', (event) => {
    let season = document.querySelector("#season").value;
    let round = document.querySelector("#round").value;
    event.preventDefault()
    return season, round
})