import React from 'react';
import {Bar} from 'react-chartjs-2';
function chartData() {
    return {

            labels: [
                "Ваша оценка качества",
                "Средняя оценка для оператора по стране",
                "Средняя оценка для оператора по городу"
            ],
            datasets: [
                {
                    label: "MSQ",
                    data: [
                        -7.9,-4.6,-5.6
                    ],
                    backgroundColor: [
                        'rgba(2, 190, 242, 1)',
                        'rgba(2, 190, 242, 1)',
                        'rgba(2, 190, 242, 1)'
                    ],



                }, {
                    label: "В баллах",
                    data: [
                        3,4,4
                    ],
                    backgroundColor: [
                        'rgba(22, 32, 240, 1)',
                        'rgba(22, 32, 240, 1)',
                        'rgba(22, 32, 240, 1)',
                    ]

                }
    ]
    }
}

const options = {
    responsive: true,
    scales: {
        xAxes: [{
            ticks: {
                fontSize: 15
            }
        }]
    },


};





class Chart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: chartData()
        }
    }

    render() {
        return (
            <div style={{backgroundColor:'#f1eea6',height:'100vh'}}>
                <Bar data={this.state.data}
                           options={options}
                     height={100}
                />
            </div>
        )
    }
}

export default Chart;