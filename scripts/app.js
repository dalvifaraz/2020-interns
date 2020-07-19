const getData = async(url) => {
    const response = await fetch(url);
    if(!response.ok)
        throw new Error("Status code: " + response.code);
    const data = await response.json();
    return data;
}

const createChart = function(chartData) {
    console.log(chartData);
    labelArray = new Array();
    dataArray = new Array();
    chartData.forEach(function(item){
        labelArray.push(item['date']);
        dataArray.push(item['rate']);
    });
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: labelArray,
            datasets: [{
                label: 'INR to EUR rates',
                backgroundColor: null,
                borderColor: 'rgb(255, 99, 132)',
                data: dataArray
            }]
        },

        // Configuration options go here
        options: {
            fill: false
        }
    });
}

const parseData = function(data) {
    const dates = data.rates;
    let count = 0
    let chartData = new Array();
    for(let i = 1; i <=31; i++ ) {
        formattedDay = String(i).padStart(2, '0')
        let day = "2019-01-"+formattedDay;
        let date = dates[day];
        if(isValid(date)){
            chartData.push({date:day, rate:date["INR"]});
//            console.log(date["INR"]);
            count = count + 1;
//            console.log(date["INR"]);
        }
    }
//        console.log(chartData);
    createChart(chartData);
}


const isValid = function(date) {
    if(typeof date === "object"){
        return true;
    }
    return false;
}

getData('../data.json')
    .then(data => parseData(data))
    .catch(err => console.log(err));