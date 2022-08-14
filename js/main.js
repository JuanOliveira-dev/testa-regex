function execute(event) {

    event.preventDefault();
    
    clearResults();
    
    var data = getFormData();
    
    if(data){
        var results = execRegex(data);
        postResults(results);
    }
}


function clearResults() {
    
    console.clear();
    
    document.querySelector('#results').value = '';
    document.querySelector('#results').placeholder = 'Insira um alvo e uma expressão';
    document.querySelector('#matchInfo').innerHTML = '';
}


function getFormData() {
    
    var inputTarget = document.querySelector('#target');
    var inputPattern = document.querySelector('#pattern');

    console.log('Alvo: ' + (inputTarget.value ? inputTarget.value : 'Nenhum alvo definido'));
    console.log('Expressão: ' + (inputPattern.value ? inputPattern.value : 'Nenhuma expressão definida'));

    if(inputTarget.value && inputPattern.value) {
        return { 
                'target': inputTarget.value,
                'pattern': inputPattern.value   
            }
    } else if(!inputTarget.value && inputPattern.value ){
        document.querySelector('#results').placeholder = 'Insira um alvo';
    } else if(inputTarget.value && !inputPattern.value ){
        document.querySelector('#results').placeholder = 'Insira uma expressão';
    }
}


function execRegex(data) {
    
    var pattern = data.pattern;
    var target = data.target;
    
    var results = [];
    var result = null;

    var objectRegex = new RegExp(pattern, 'g');
    
    while (result = objectRegex.exec(target)) {

        results.push(result[0])
    }

    console.log('Resultados: ' + results);
    
    return (results)   
}


function postResults(results){
    var inputResults = document.querySelector('#results');
    var macthInfo = document.querySelector('#matchInfo');

    var resultsArray = results.map(function(item){ return item })

    if(resultsArray.length > 0){
        inputResults.value = resultsArray.join(' | ');
        macthInfo.innerHTML = resultsArray.length.toString().padStart(2, '0') + ' resultado(s) encontrado(s)';
    
        console.log(resultsArray.length.toString().padStart(2, '0') + ' resultado(s) encontrado(s)')
    } else {
        inputResults.placeholder = 'Nenhum resultado encontrado';
        inputResults.value = '';
    
        console.log('Nenhum resultado encontrado')
    }
}
