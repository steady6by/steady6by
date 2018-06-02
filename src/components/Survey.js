import React, { Component } from 'react';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css'
class Surv extends Component {

    componentWillMount() {
        Survey.Survey.cssType = "bootstrap";
        Survey.defaultBootstrapCss.navigationButton = "btn btn-green";
    }


    constructor() {
        super();

            this.json = { locale:"ru", title: "Сотовая связь", showProgressBar: "top", pages: [
                    {questions:[
                            {type: "dropdown",name: "age",title:"Ваш возраст", isRequired : true, colCount: 0,choices:["До 30 лет","31-45 лет","46-60 лет","Больше 60 лет"]},
                            {type: "radiogroup",name: "sex",title:"Ваш пол", isRequired : true, colCount: 0,choices:["Мужской","Женский"]},
                            {type: "dropdown", name:"location", title: "Вы проживаете", isRequired: true, colCount: 0,choices:["Минск", "Брестская область", "Витебская область", "Гомельская область", "Гродненская область","Минская область","Могилёвская область"]},
                            {type: "dropdown", name:"location1",title:"Выберите город",visibleIf:"{location}='Брестская область'",choices:["Брест"]},
                            {type: "dropdown", name:"location2",title:"Выберите город",visibleIf:"{location}='Витебская область'",choices:["Витебск"]},
                            {type: "dropdown", name:"location3",title:"Выберите город",visibleIf:"{location}='Гомельская область'",choices:["Гомель"]},
                            {type: "dropdown", name:"location4",title:"Выберите город",visibleIf:"{location}='Гродненская область'",choices:["Гродно"]},
                            {type: "dropdown", name:"location5",title:"Выберите город",visibleIf:"{location}='Минская область'",choices:[""]},
                            {type: "dropdown", name:"location6",title:"Выберите город",visibleIf:"{location}='Могилёвская область'",choices:["Могилёв"]}
                        ]},
                    {questions: [
                            {type:"dropdown",name:"mobilemanager",title:"Ваш оператор",isRequired: true,colCount:0,choices:["Velcom","MTS","Life"]},
                            { type: "matrixdropdown", name: "quality", title: "Показатели качества услуг оператора",
                                columns: [{name:"satisfy",title:"Удовлетворённость",choices:[{ value: 1, text: "Очень плохо" },
                                    { value: 2, text: "Плохо" },
                                    { value: 3, text: "Нормально" },
                                    { value: 4, text: "Хорошо" },
                                    { value: 5, text: "Замечательно" }],cellType :"radiogroup"},
                                    {name:"important",title:"Важность показателя", choices:[
                                {value: 1, text: "Совсем  неважен"},
                            {value: 2, text: "Скорее неважен"},
                            {value: 3, text: "Умеренно важен"},
                            {value: 4, text: "Достаточно важен"},
                            {value: 5, text: "Очень важен"}
                        ],cellType:"radiogroup"}],
                                rows: [{ value: "speed", text: "Скорость передачи данных при использовании Интернет",size:"30px"},
                                    { value: "33", text: "Правильность расчета за услуги" },
                                    { value: "34", text: "Сочетание цены и пакета услуг в тарифном плане" },
                                    { value: "35", text: "Четкость передачи речи в телефонном разговоре" },
                                    { value: "36", text:"Зона покрытия сети оператора мобильной связи в регионе проживания" },
                                    { value: "37", text:"Скорость реакции оператора на претензии"}]},
                        ]
                    }
                ]};
        };

    sendDataToServer(survey){





        //
        var rj = [];
        for(var x in survey.data.quality){
            rj.push(parseInt(survey.data.quality[x].important));
        }
        var rw =[];
        for(var x in survey.data.quality){
            rw.push(parseInt(survey.data.quality[x].satisfy));
        }
        let w1 = rj[5];
        let w2 = rj[0];
        let w3 = rj[1];
        let w4 = rj[2];
        let w5 = rj[3];
        let w6 = rj[4];
        let r1 = rw[5]-5;
        let r2 = rw[0]-5;
        let r3 = rw[1]-5;
        let r4 = rw[2]-5;
        let r5 = rw[3]-5;
        let r6 = rw[4]-5;
        alert(r1);
        alert(r2);
        alert(r3);
        alert(r4);
        alert(r5);
        alert(r6);

        var AA= JSON.stringify({});
        var AB = JSON.parse(AA);
        AB["r1"]=JSON.stringify(r1);
        AB["r2"]=JSON.stringify(r2);
        AB["r3"]=JSON.stringify(r3);
        AB["r4"]=JSON.stringify(r4);
        AB["r5"]=JSON.stringify(r5);
        AB["r6"]=JSON.stringify(r6);
        AB["w1"]=w1;
        AB["w2"]=w2;
        AB["w3"]=w3;
        AB["w4"]=w4;
        AB["w5"]=w5;
        AB["w6"]=w6;
        AB["sex"]=survey.data.sex;
        AB["age"]=survey.data.age;
        AB["mobilemanager"]=survey.data.mobilemanager;
        AB["location"]=survey.data.location;
        var Results = JSON.stringify(AB);
        alert(Results);

        fetch('/api/result', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: Results
        });


    };

    render(){
    return(
        <div style={{backgroundColor:'#f1eea6',height:'100%',width:'70vw',margin:'auto',fontSize:'120%'}}>
            <Survey.Survey json={this.json} onComplete={this.sendDataToServer}/>
        </div>
    );
}}
export default Surv;