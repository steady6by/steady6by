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
                            rows: [{ value: "32", text: "Скорость передачи данных при использовании Интернет",size:"30px"},
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
        let s1 = 0;
        let s2 = 0;
        let s3 = 0;
        let s4 =0;
        let s5 =0;
        for (var i in survey.data.quality){

            if (parseInt(survey.data.quality[i].satisfy) === 1)
                s1 +=1;
            else if (parseInt(survey.data.quality[i].satisfy) === 2)
                s2 +=1;
            else if (parseInt(survey.data.quality[i].satisfy) === 3)
                s3 +=1;
            else if (parseInt(survey.data.quality[i].satisfy) === 4)
                s4 +=1;
            else if (parseInt(survey.data.quality[i].satisfy) === 5)
                s5 +=1;
            if (parseInt(survey.data.quality[i].important) === 1)
                s1 +=1;
            else if (parseInt(survey.data.quality[i].important) === 2)
                s2 +=1;
            else if (parseInt(survey.data.quality[i].important) === 3)
                s3 +=1;
            else if (parseInt(survey.data.quality[i].important) === 4)
                s4 +=1;
            else if (parseInt(survey.data.quality[i].important) === 5)
                s5 +=1;
        }


        let wj = (s5 + 0.5 * s4 - 0.5 * s2 - s1)/(s5 + s4 + s3 + s2 + s1);
        alert("s1:"+s1);
        alert("s2:"+s2);
        alert("s3:"+s3);
        alert("s4:"+s4);
        alert("s5:"+s5);



        alert("Wj:"+wj);
        //
        var rj = 0;
        for(var x in survey.data.quality){
            rj += parseInt(survey.data.quality[x].satisfy);
            rj += parseInt(survey.data.quality[x].important);
        }
        rj = 60-rj;
        alert("Rj:"+rj);
        alert("MSQ:"+wj*rj);
        var AA= JSON.stringify({});
        var AB = JSON.parse(AA);
        AB["wj"]=wj;
        AB["rj"]=rj;
        AB["mobilemanager"]=survey.data.mobilemanager;
        AB["location"]=survey.data.location;
        var Results = JSON.stringify(AB);



        var ResultAsString = JSON.stringify({"result":[],"id":3});
        var obj = JSON.parse(ResultAsString);
        for(var i in survey.data) {
            if (i!=null && i!=="quality") {
                obj['result'].push({"id": i, "answer": survey.data[i]});
            }
            if (i!=null && i==="quality"){
                var rows = [];
                var id = "25".toString();
                for(var y in survey.data.quality)
                {
                    rows.push({"id": y, "contentment": survey.data.quality[y].satisfy,"importance": survey.data.quality[y].important});
                }
                obj['result'].push({id,rows});
            }

        }

        var z = parseInt("0");
        for(var x in survey.data.quality){
            z += parseInt(survey.data.quality[x].satisfy);

        }
        z = JSON.stringify(z);
        var obj1 ={"msq":z};
        var MSQResult = JSON.stringify(obj1);

        fetch('http://localhost:3001/api/result', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: Results
        });

        ResultAsString = JSON.stringify(obj);

        fetch('http://localhost:3001/api/survey', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: ResultAsString
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