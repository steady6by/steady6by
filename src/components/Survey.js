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
                        {type: "text",name: "28",title:"Ваше имя", isRequired : true, colCount: 0},
                        {type: "text",name: "26",title:"Род занятий", isRequired : true, colCount: 0},
                        {type: "dropdown", name:"27", title: "Возраст", isRequired: true, colCount: 0,choices:["10-20", "20-30", "30-40", "40-50", "50 и старше"]},

                    ]},
                {questions: [

                        { type: "matrixdropdown", name: "quality", title: "Показатели качества услуг оператора",
                            columns: [{name:"satisfy",title:"Удовлетворённость",choices:[{ value: 1, text: "Очень плохо" },
                                { value: 2, text: "Плохо" },
                                { value: 3, text: "Нормально" },
                                { value: 4, text: "Хорошо" },
                                { value: 5, text: "Замечательно" }],cellType :"radiogroup"},
                                {name:"important",title:"Важность показателя", choices:[
                            {value: 1, text: "Совсем  неважен"},
                        {value: 2, text: "Скорее неважен, чем важен"},
                        {value: 3, text: "Умеренно важен"},
                        {value: 4, text: "Достаточно важен"},
                        {value: 5, text: "Очень важен"}
                    ],cellType:"radiogroup"}],
                            rows: [{ value: "32", text: "Скорость передачи данных при использовании Интернет" },
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

        ResultAsString = JSON.stringify(obj);

        alert(ResultAsString);
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
            <div style={{backgroundColor:'#f1eea6',height:'100vh'}}>
                <Survey.Survey json={this.json} onComplete={this.sendDataToServer}/>
            </div>
        );
    }}
export default Surv;