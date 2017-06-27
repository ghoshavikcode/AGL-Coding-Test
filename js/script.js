(function() {

    loadJSON( response => {
        // Parse JSON string into object
        var objJSON = JSON.parse(response);

       /* Get pets by genders */ 
        getCatsArr(objJSON);

     });   

})();

function getCatsArr(objJSON) {

     /* Get all genders in array */ 
    var genders = objJSON.map(owner => owner.gender).filter((value, index, self) => self.indexOf(value) === index);

        /*  Loop for pets select for each gender */
       for (var i = 0; i < genders.length; i++) {

            /*Create a Gender title */
            document.getElementById('output').appendChild(document.createTextNode(genders[i]));
      
            
            var pets = objJSON.filter(owner => owner.gender === genders[i]) /* Select owners by gender */
                              .map(owner => {  /* Select they pets */
                                    if( owner.pets !== null ) return owner.pets.filter(pet => pet.type === 'Cat').map(cats => cats.name);  /* Select cats and get it's names */
                                })
                              .reduce((a, b) => a.concat(b), []).sort(); /* Flat an array and sort the names */
    
           printCats(pets); /* Let's go to create list of the cats names  */           
      }
}

function printCats(pets) {

	if (pets.length < 1) return  /* don't continue  if it's  empty arr . Some empty/error message can be added */

    var list = document.createElement('ul');
        
        for (var i = 0, l = pets.length; i < l; i++) {
            
            if ( pets[i] !== undefined ) {
                var listRow = document.createElement('li');
                    listRow.appendChild(document.createTextNode(pets[i]));
                    list.appendChild(listRow);  
            }
    
        }
        document.getElementById('output').appendChild(list);
}

function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'http://agl-developer-test.azurewebsites.net/people.json', true ); /* Error:  No 'Access-Control-Allow-Origin' header is present on the requested resource. The header need to be added on server side.*/
        xobj.onreadystatechange = () => {
                if (xobj.readyState == 4 && xobj.status == "200") {
                    callback(xobj.responseText);
                }
        };
        xobj.send(null);  
}

/* For my tests */
var onlyDogsTest = '[{"name":"Bob","gender":"Male","age":23,"pets":[{"name":"Garfield","type":"Dog"},{"name":"Fido","type":"Dog"}]},{"name":"Jennifer","gender":"Female","age":18,"pets":[{"name":"Garfield","type":"Dog"}]},{"name":"Steve","gender":"Male","age":45,"pets":null},{"name":"Fred","gender":"Male","age":40,"pets":[{"name":"Max","type":"Dog"},{"name":"Sam","type":"Dog"},{"name":"Jim","type":"Dog"}]},{"name":"Samantha","gender":"Female","age":40,"pets":[{"name":"Tabby","type":"Dog"}]}, {"name":"Alice","gender":"Female","age":64,"pets":[{"name":"Nemo","type":"Dog"}]}]';
var onlyCatsTest = '[{"name":"Bob","gender":"Male","age":23,"pets":[{"name":"LGarfield","type":"Cat"},{"name":"AFido","type":"Cat"}]},{"name":"Jennifer","gender":"Female","age":18,"pets":[{"name":"bGarfield","type":"Cat"}]},{"name":"Steve","gender":"Male","age":45,"pets":null},{"name":"Fred","gender":"Male","age":40,"pets":[{"name":"AMax","type":"Cat"},{"name":"DSam","type":"Cat"},{"name":"CJim","type":"Cat"}]},{"name":"Samantha","gender":"Female","age":40,"pets":[{"name":"Tabby","type":"Cat"}]}, {"name":"Alice","gender":"Female","age":64,"pets":[{"name":"Nemo","type":"Cat"}]}]';
var emptyTest = '[]'