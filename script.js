const urlAPI = 'http://economia.awesomeapi.com.br/json/';
const dolar = urlAPI.concat('BRL-USD/');
const euro = urlAPI.concat('BRL-EUR/');
const peso = urlAPI.concat('BRL-ARS/');
const iene = urlAPI.concat('BRL-JPY/');
const yuan = urlAPI.concat('BRL-CNY/');

async function retornaValor(url){
    let response = await fetch(url)
    .then(result => result.json())
    .then(json => json[0].ask)
    //.catch(e); 
    //console.log(response);
    //console.log(parseFloat(response));
    return parseFloat(response);
}



const form = document.getElementById("form");
form.addEventListener('submit', handleSubmit);

const inputValue = document.getElementById("value-real");
const selectedCurrency = document.getElementById("currency");
const result = document.getElementById("result");

let valueConverted = 0;

function handleSubmit(e){
    e.preventDefault();
    
    if(!inputValue.value || inputValue.value < 0){
        alert("Informe um valor válido.");
    }else if(!selectedCurrency.value){
        alert("Escolha uma moeda.");
    }

    converter();
};

function delay(sec) {
    return new Promise(resolve => setTimeout(resolve, (sec * 1000)));
}

async function converter(){
    if(selectedCurrency.value === "eur"){
        let valor = await retornaValor(euro);
        console.log(valor);
        valueConverted = inputValue.value * valor;
        result.innerHTML = valueFormatter('pt-BR', 'EUR');
        animateResult();        

    }else if(selectedCurrency.value === "dol"){
        let valor = await retornaValor(dolar);
        console.log(valor);
        valueConverted = inputValue.value * valor;
        result.innerHTML = valueFormatter('pt-BR', 'USD');
        animateResult();
    }else if(selectedCurrency.value === "ars"){
        let valor = await retornaValor(peso);
        console.log(valor);
        valueConverted = inputValue.value * valor;
        result.innerHTML = valueFormatter('pt-BR', 'ARS');
        animateResult();
    }else if(selectedCurrency.value === "jpy"){
        let valor = await retornaValor(iene);
        console.log(valor);
        valueConverted = inputValue.value * valor;
        result.innerHTML = valueFormatter('pt-BR', 'JPY');
        animateResult();
    }else if(selectedCurrency.value === "cny"){
        let valor = await retornaValor(yuan);
        console.log(valor);
        valueConverted = inputValue.value * valor;
        result.innerHTML = valueFormatter('pt-BR', 'CNY');
        animateResult();
    }

    inputValue.value = '';
    selectedCurrency.value = '';
};

function valueFormatter(locale, currency){
    const value = valueConverted.toLocaleString(`${locale}`,{style: 'currency', currency: `${currency}`});

    return value;
};

function animateResult(){
    return result.animate([
        {transform: 'translateY(-30px)'},        
        {transform: 'translateY(0px)'},
    ], {duration: 500});
};