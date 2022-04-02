//create Dinosaur Object
class DinoObject {
    constructor(species, weight, height, fact, diet, when, where) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.fact = fact;
        this.diet = diet;
        this.when = when;
        this.where = where;
        this.comparisons = [];
    }
    
    #compareWeight = function() {
        if (this.weight > human.weight) {
            this.comparisons.push(`${this.species} is ${this.weight - human.weight}lbs heavier than you!`);
        } else {
            this.comparisons.push(`You are ${human.weight - this.weight}lbs heavier than ${this.species}!`);
        }
    };

    #compareHeight = function() {
        if (this.height > human.feet) {
            this.comparisons.push(`${this.species} is ${this.height - (human.feet)} feet taller than you!`);
        } else {
            this.comparisons.push(`You are taller than ${this.species} by ${this.height - human.height} feet.`);
        }
    }
    #compareDiet = function() {
        if (this.diet === human.diet) {
            this.comparisons.push(`You and ${this.species} are both ${human.diet}s!`);
        } else {
            this.comparisons.push(`Your diet is different than ${this.species}.`);
        }
    };

    addComparisons = function(){
        this.#compareWeight();
        this.#compareHeight();
        this.#compareDiet();
    };

    getFact(){
        let factNum = Math.floor(Math.random() * 10) % (this.comparisons.length);
        if(this.species === 'Pigeon' || factNum === 0){
            return this.fact
        }
        return(this.comparisons[factNum-1]);
    }
}

//create human object
let human = {
    name: '',
    feet: 0,
    inches: 0,
    weight: 0,
    diet: '',
}

//fetcth the dino data from the json file, map each entry to a new DinoObject and store them in the array dinosArray
fetch('dino.json', { 
    mode: 'no-cors' // 'cors' by default
})
.then(response => response.json())
.then(json => dinosArray = json.Dinos.map(dino => 
    new DinoObject(dino.species, dino.weight, dino.height, dino.fact, dino.diet, dino.when, dino.where)))  

const form =  document.querySelector('#dino-compare');

//fill human object with form data
const getHumantDataFromForm = function (){
    for(let property in human){
        if (human.hasOwnProperty(property)){
            human[property] = document.getElementById(property).value;
        }
    }
    human.species = 'human';
    console.log(human);
};

const getImage =  function(fileName){
    let image = new Image();
    image.src =`./images/${fileName}.png`;
    return image;
};

const grid = document.querySelector('#grid');

const button = document.getElementById('btn');

//create and display the grid when the button on the form is clicked
button.addEventListener('click', function () {
    getHumantDataFromForm();
    form.remove();
    createGrid();
});

//make the grid using the dinosArray
function createGrid(){
    for(let i = 0; i < dinosArray.length; i++){
        const species = dinosArray[i].species;
        dinosArray[i].addComparisons();
        if(i === Math.round(dinosArray.length/2)){
            grid.append(creatCell(human.name, '', getImage(human.species)));
        }
        grid.append(creatCell(species, dinosArray[i].getFact(), getImage(species)));
    };
}

function creatCell(title, content, image){
    const cell = document.createElement('div');
    cell.className = 'grid-item';
    let header = document.createElement('h3');
    header.textContent = title;
    cell.append(header);
    let fact = document.createElement('p');
    fact.textContent = content;
    cell.append(fact);
    cell.append(image);
    return cell;
}
