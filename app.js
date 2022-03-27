//create Dinosaur Object
function DinoObject(species, weight, height, fact, diet, when, where){
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.fact = fact;
    this.diet = diet;
    this.when= when;
    this.where = where;
}

//fetcth the dino data from the json file, map each entry to a new DinoObject and store them in the array dinosArray
fetch("dino.json", { 
    mode: 'no-cors' // 'cors' by default
})
.then(response => response.json())
.then(json => dinosArray = json.Dinos.map(dino => 
    new DinoObject(dino.species, dino.weight, dino.height, dino.fact, dino.diet, dino.when, dino.where)))  

//set the action for when the button on the form is clicked (aka display the grid)
const grid = document.querySelector('#grid');

const button = document.getElementById('btn');
button.addEventListener('click', function () {
    const form =  document.querySelector('.form-container');
    form.remove();
    gridMaker();
});

//make the grid using the dinosArray
function gridMaker(){
    for(let i = 0; i < dinosArray.length; i++){
        const cell = document.createElement('div');
        cell.className = "grid-item";
        cell.innerHTML = dinosArray[i].species;
        grid.append(cell);
    };
}
