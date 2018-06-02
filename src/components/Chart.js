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
                let w1s1=0;
                let w1s2=0;
                let w1s3=0;
                let w1s4=0;
                let w1s5=0;
                for(var i in a){
                    if(a[i].w1===1)
                        w1s1+=1;
                    else if(a[i].w1===2)
                        w1s2+=1;
                    else if(a[i].w1===3)
                        w1s3+=1;
                    else if(a[i].w1===4)
                        w1s4+=1;
                    else if(a[i].w1===5)
                        w1s5+=1;
                }
                let w1 = (w1s5+0.5*w1s4-0.5*w1s2-w1s1)/(w1s5+w1s4+w1s3+w1s2+w1s1);
                let w2s1=0;
                let w2s2=0;
                let w2s3=0;
                let w2s4=0;
                let w2s5=0;
                for(var i in a){
                    if(a[i].w2===1)
                        w2s1+=1;
                    else if(a[i].w2===2)
                        w2s2+=1;
                    else if(a[i].w2===3)
                        w2s3+=1;
                    else if(a[i].w2===4)
                        w2s4+=1;
                    else if(a[i].w2===5)
                        w2s5+=1;
                }
                let w2 = (w2s5+0.5*w2s4-0.5*w2s2-w2s1)/(w2s5+w2s4+w2s3+w2s2+w2s1);
                let w3s1=0;
                let w3s2=0;
                let w3s3=0;
                let w3s4=0;
                let w3s5=0;
                for(var i in a){
                    if(a[i].w3===1)
                        w3s1+=1;
                    else if(a[i].w3===2)
                        w3s2+=1;
                    else if(a[i].w3===3)
                        w3s3+=1;
                    else if(a[i].w3===4)
                        w3s4+=1;
                    else if(a[i].w3===5)
                        w3s5+=1;
                }
                let w3 = (w3s5+0.5*w3s4-0.5*w3s2-w3s1)/(w3s5+w3s4+w3s3+w3s2+w3s1);
                let w4s1=0;
                let w4s2=0;
                let w4s3=0;
                let w4s4=0;
                let w4s5=0;
                for(var i in a){
                    if(a[i].w4===1)
                        w4s1+=1;
                    else if(a[i].w4===2)
                        w4s2+=1;
                    else if(a[i].w4===3)
                        w4s3+=1;
                    else if(a[i].w4===4)
                        w4s4+=1;
                    else if(a[i].w4===5)
                        w4s5+=1;
                }
                let w4 = (w4s5+0.5*w4s4-0.5*w4s2-w4s1)/(w4s5+w4s4+w4s3+w4s2+w4s1);
                let w5s1=0;
                let w5s2=0;
                let w5s3=0;
                let w5s4=0;
                let w5s5=0;
                for(var i in a){
                    if(a[i].w5===1)
                        w5s1+=1;
                    else if(a[i].w5===2)
                        w5s2+=1;
                    else if(a[i].w5===3)
                        w5s3+=1;
                    else if(a[i].w5===4)
                        w5s4+=1;
                    else if(a[i].w5===5)
                        w5s5+=1;
                }
                let w5 = (w5s5+0.5*w5s4-0.5*w5s2-w5s1)/(w5s5+w5s4+w5s3+w5s2+w5s1);
                let w6s1=0;
                let w6s2=0;
                let w6s3=0;
                let w6s4=0;
                let w6s5=0;
                for(var i in a){
                    if(a[i].w6===1)
                        w6s1+=1;
                    else if(a[i].w6===2)
                        w6s2+=1;
                    else if(a[i].w6===3)
                        w6s3+=1;
                    else if(a[i].w6===4)
                        w6s4+=1;
                    else if(a[i].w6===5)
                        w6s5+=1;
                }
                let w6 = (w6s5+0.5*w6s4-0.5*w6s2-w6s1)/(w6s5+w6s4+w6s3+w6s2+w6s1);
                alert (w1);
                alert(w2);
                alert(w3);
                alert(w4);
                alert(w5);
                alert(w6);
                let r1last = parseInt(a[a.length-1].r1);
                let r2last = parseInt(a[a.length-1].r2);
                let r3last = parseInt(a[a.length-1].r3);
                let r4last = parseInt(a[a.length-1].r4);
                let r5last = parseInt(a[a.length-1].r5);
                let r6last = parseInt(a[a.length-1].r6);
                alert(r1last);
                alert(r2last);
                alert(r3last);
                alert(r4last);
                alert(r5last);
                alert(r6last);
                let MSQLast = w1*r1last+w2*r2last+w3*r3last+w4*r4last+w5*r5last+w6*r6last;
                let ball =0;
                if(0<=MSQLast&&MSQLast<6)
                    ball =5;
                else if(6<=MSQLast&&MSQLast<12)
                    ball =4;
                else if(12<=MSQLast&&MSQLast<18)
                    ball =3;
                else if(18<=MSQLast&&MSQLast<24)
                    ball =2;
                else if(24<=MSQLast&&MSQLast<=30)
                    ball =1;




                const chartData = {
                    labels:[
                    "Ваша оценка качества",
                    "Средняя оценка для "+a[a.length-1].mobilemanager+" по стране",
                    "Средняя оценка для "+a[a.length-1].mobilemanager+" по "+a[a.length-1].location
                ],
                    datasets: [
                        {
                            label: 'msq',
                            data: [MSQLast],
                            backgroundColor: 'red',
                        },{
                        label: 'В баллах',
                            data:[ball],
                            backgroundColor:'blue',
                        }
                    ]
                };

                this.setState({ chartData });
            });
    }


    render() {
        return (
            <div style={{backgroundColor:'white'}}>
                <Bar data={this.state.chartData}  />
            </div>
        );
    }
}

export default Chart;