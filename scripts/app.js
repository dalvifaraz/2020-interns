var latestrateINR = "";
var latestrateGBP = "";
const getData = async(url) => {
    const response = await fetch(url);
    if(!response.ok)
        throw new Error("Status code: " + response.code);
    const data = await response.json();
    return data;
}

const createChart = function(chartData1,chartData2) {
    console.log(chartData1)
    console.log(chartData2)
    labelArray = new Array();
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
                    label: 'INR (current: ' + latestrateINR + ')',
                    borderColor: 'rgb(0, 255, 255)',
                    data: INRArray
                },
                {
                    label: 'GBP (current: ' + latestrateGBP + ')',
                    borderColor: 'rgb(255, 99, 132)',
                    data: GBPArray
                }
            ]
        },
        // Configuration options go here
        options: {
            fill: false,
            title: {
            display: true,
            text: 'Chart for Currency Exchange'
            },
            tooltips:{
                callback: {
                    label: function(tooltipItem, data) {
                        alert('CALLED');
                        var label = "current ";
                        var item = data.datasets[tooltipItem.datasetIndex];
                        console.log(item);

                    }
                }

            }
        }
    });
}

const parseData = function(data) {
    console.log(Object.entries(data.rates));
    const dates = Object.entries(data.rates);
    let count = 0
    let chartData1 = new Array();
    let chartData2 = new Array();
    dates.forEach(function(date){
        console.log(date[1].INR);
            chartData1.push({date:date[0], rate:date[1].INR});
            chartData2.push({date:date[0], rate:date[1].GBP});
    });
    createChart(chartData1,chartData2);
}
const setData = function(latestdata) {
    const latestrate = latestdata.rates;
    //console.log(latestrate['INR'])
    latestrateINR = String(latestrate['INR']);
    //console.log(latestrate['GBP'])
    latestrateGBP = String(latestrate['CAD']);
}

getData('https://api.exchangeratesapi.io/latest')
    .then(latestdata => setData(latestdata))
    .catch(error => console.log(error));

getData('https://api.exchangeratesapi.io/history?start_at=2020-07-01&end_at=2020-07-20')
    .then(data => parseData(data))
    .catch(err => console.log(err));
