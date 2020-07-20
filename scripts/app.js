var currency = "INR";

document.getElementById('submit_btn').addEventListener('click', function(){
    var start_date = document.getElementById('start_date').value;
    var end_date = document.getElementById('end_date').value;
    currency = document.getElementById('currency').value;
    if(start_date == ""){
        start_date = "2020-06-01";
    }
    if(end_date == ""){
        end_date = "2020-07-01";
    }

    console.log(start_date);
    console.log(end_date);
    console.log(currency);

    setTimeout(function(){
            getData('https://api.exchangeratesapi.io/history?start_at='+ start_date +'&end_at='+ end_date)
                .then(data => parseData(data))
                .catch(err => console.log(err));
     }, 30);

});

const getData = async(url) => {
    const response = await fetch(url);
    if(!response.ok)
        throw new Error("Status code: " + response.code);
    const data = await response.json();
    return data;
}

const createChart = function(chartData1) {
    console.log(chartData1)
    labelArray = new Array();
    INRArray = new Array();

    chartData1.forEach(function(item){
    labelArray.push(item['date']);
    INRArray.push(item['rate']);
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
                    label: currency,
                    borderColor: 'rgb(0, 255, 255)',
                    data: INRArray
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
    dates.forEach(function(date){
        console.log(date[1][currency]);
            chartData1.push({date:date[0], rate:date[1][currency]});
    });
    createChart(chartData1);
}


getData('https://api.exchangeratesapi.io/history?start_at=2020-06-01&end_at=2020-07-20')
    .then(data => parseData(data))
    .catch(err => console.log(err));
