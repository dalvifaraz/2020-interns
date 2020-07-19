const getData = async(url) => {
    const response = await fetch(url);
    if(!response.ok)
        throw new Error("Status code: " + response.code);
    const data = await response.json();
    return data;
}

const createChart = function(chartData1,chartData2) {//chartData1,chartData2
    //console.log(chartData);
    console.log(chartData1)
    console.log(chartData2)
    labelArray = new Array();
    //dataArray = new Array();
    INRArray = new Array();
    GBPArray = new Array();

    chartData1.forEach(function(item){
    labelArray.push(item['date']);
    INRArray.push(item['rate']);
    });

    chartData2.forEach(function(item){
    GBPArray.push(item['rate']);
    });

    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: labelArray,
            datasets: [
                {
                    label: 'INR to EUR rates',
                    backgroundColor: null,
                    borderColor: 'rgb(0, 255, 255)',
                    //data: dataArray
                    data: INRArray
                },
                {
                    label: 'GBP to EUR rates',
                    backgroundColor: null,
                    borderColor: 'rgb(255, 99, 132)',
                    //data: dataArray
                    data: GBPArray
                }
            ]
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
    //let chartData = new Array();
    let chartData1 = new Array();
    let chartData2 = new Array();
    for(let i = 1; i <=31; i++ ) {
        formattedDay = String(i).padStart(2, '0')
        let day = "2019-01-"+formattedDay;
        let date = dates[day];
        if(isValid(date)){
            //chartData.push({date:day, rate:date["INR"]});
            chartData1.push({date:day, rate:date["INR"]});
            chartData2.push({date:day, rate:date["GBP"]});
//            console.log(date["INR"]);
            count = count + 1;
            //console.log(date["GBP"]);
        }
    }
//        console.log(chartData);
    //createChart(chartData);
    createChart(chartData1,chartData2);
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