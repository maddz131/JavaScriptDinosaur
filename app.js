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

//create human object
const form =  document.querySelector('#dino-compare');
let humanObject = {
    name: "",
    feet: 0,
    inches: 0,
    weight: 0,
    diet: ""
}
const getHumanData = function (human){
    human.name = document.getElementById('name').value;
    human.feet = document.getElementById('feet').value;
    human.inches = document.getElementById('inches').value;
    human.weight = document.getElementById('weight').value;
    human.diet = document.getElementById('diet').value;
    console.log(human);
    return human;
};

//set the action for when the button on the form is clicked (aka display the grid)
const grid = document.querySelector('#grid');

const button = document.getElementById('btn');
button.addEventListener('click', function () {
    humanObject = getHumanData(humanObject);
    form.remove();
    gridMaker();
});

//make the grid using the dinosArray
function gridMaker(){
    for(let i = 0; i < dinosArray.length; i++){
        if(i===Math.round(dinosArray.length/2)){
            cellMaker(humanObject.name, "empty for now");
        }
        cellMaker(dinosArray[i].species, dinosArray[i].fact);
    };
}

function cellMaker(header, content){
    let newHeader = document.createElement('h3');
    newHeader.textContent = header;
    const cell = document.createElement('div');
    cell.className = "grid-item";
    cell.innerHTML = content;
    cell.append(newHeader);
    grid.append(cell);
}
