const urlAPI = 'https://economia.awesomeapi.com.br/json/BRL-';
const dolar = urlAPI.concat('usd');
const euro = urlAPI.concat('eur');
const peso = urlAPI.concat('ars');
const iene = urlAPI.concat('jpy');
const yuan = urlAPI.concat('cny');

async function retornaValor(url){
    let response = await fetch(url)
    .then(result => result.json())
    .then(json => json[0].ask)
    
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
    switch(selectedCurrency.value){        
        case 'eur':
            valor = await retornaValor(euro);
            break;
        case 'usd':
            valor = await retornaValor(dolar);
            break;
        case 'ars':
            valor = await retornaValor(peso);
            break;
        case 'jpy':
            valor = await retornaValor(dolar);
            break;
        case 'cny':
            valor = await retornaValor(dolar);
            break;
    }

    console.log(valor);
    valueConverted = inputValue.value * valor;
    result.innerHTML = valueFormatter('pt-BR', 'EUR');
    animateResult();

    await delay(1);

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