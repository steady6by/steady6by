import React from 'react';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';


class Chart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chartData: {},
        }
    }

    componentDidMount() {

        axios('/api/result')
            .then((response) => {

                const a = response.data;
                let wj = 0;
                if(a[a.length-1].wj===0)
                    wj=-1;
                else
                    wj=a[a.length-1].wj;
                alert(wj);
                var ball = -8/(wj*a[a.length-1].rj);

                let b=a.filter((c)=>c.mobilemanager === a[a.length-1].mobilemanager);
                let wjmob=0;
                let rjmob=0;
                for(var i=0;i<b.length;i++)
                {
                    wjmob+=b[i].wj;
                    rjmob+=b[i].rj;
                }
                wjmob= wjmob/b.length;
                rjmob = rjmob/b.length;

                let averagemobile =(wjmob*rjmob);

                 let c =a.filter((c)=>c.mobilemanager === a[a.length-1].mobilemanager&&c.location===a[a.length-1].location);
                 alert(c);
                let wjcity=0;
                let rjcity=0;
                for(var i=0;i<c.length;i++)
                {
                    wjcity+=b[i].wj;
                    rjcity+=b[i].rj;
                }
                wjcity= wjcity/b.length;
                rjcity = rjcity/b.length;

                let averagecity =(wjcity*rjcity);
                alert(averagecity);



                const chartData = {
                    labels:[
                    "Ваша оценка качества",
                    "Средняя оценка для "+a[a.length-1].mobilemanager+" по стране",
                    "Средняя оценка для "+a[a.length-1].mobilemanager+" по "+a[a.length-1].location
                ],
                    datasets: [
                        {
                            label: 'msq',
                            data: [wj*a[a.length-1].rj,averagemobile,averagecity],
                            backgroundColor: 'red',
                        },{
                        label: 'В баллах',
                            data:[ball,-8/averagemobile,-8/averagecity],
                            backgroundColor:'blue',
                        }
                    ]
                };

                this.setState({ chartData });
            });
    }


    render() {
        return (
            <div className="App">
                <Bar data={this.state.chartData}  />
            </div>
        );
    }
}

export default Chart;