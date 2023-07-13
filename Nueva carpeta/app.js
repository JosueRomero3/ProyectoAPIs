
import { numeroRandom } from "./Api.js";

// const tarjet = document.querySelector('.tarjeta')
// console.log(tarjeta);
const tarjetabody = document.querySelector('.tarjeta-body')
const tarjetaheader = document.querySelector('.tarjeta-header')
const tarjetaAtk = document.querySelector('.ataque')
const tarjetaAtkEsp = document.querySelector('.ataque-Esp')
const tarjetaDef = document.querySelector('.defensa')
const buscar= document.getElementById('buscar')
const numPokedex = document.getElementById('texto')
const ctx = document.getElementById('myChart');


function id (){
    const id = numeroRandom(1,151)
    console.log(id);
    obtenerPokemon(id)
}

// let id = 123
// console.log(id);
// obtenerPokemon(id)

buscar.addEventListener('click', reload)

function reload(){
    location.reload()
}


document.addEventListener('DOMContentLoaded', id)

async function obtenerPokemon(id){

    
    try {
     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

     console.log(response);
 
     const data = await response.json()
 
     tarjeta(data);
 
    } catch (error) {
 
     console.log(error)
    
    }

}
    
function tarjeta(pokemon){
    console.log(pokemon);
    console.log(pokemon.name);

    let numero = document.createElement('h1')

    if(pokemon.id<100){
        numero.innerText=`#0${pokemon.id}`
        if (pokemon.id<10){
            numero.innerText=`#00${pokemon.id}`
        }
    } else{
        numero.innerText=`#${pokemon.id}`
    }
    tarjetaheader.append(numero)

    let img = document.createElement('img')
    img.src=`${pokemon.sprites.other.home.front_default}`
    tarjetaheader.append(img)


    let name = document.createElement('p')
    name.innerText = `${pokemon.name} ${pokemon.stats[0].base_stat}Hp`

    let xp = document.createElement('p')
    xp.innerText = `${pokemon.base_experience} Xp`
    
    tarjetabody.append(name, xp)

    let atk = document.createElement('p')
    atk.innerHTML = `<p>${pokemon.stats[1].base_stat}</p>
    <p>Atk</p>`

    tarjetaAtk.append(atk)

    let atkesp = document.createElement('p')
    atkesp.innerHTML = `<p>${pokemon.stats[3].base_stat}</p>
    <p>Atk Esp</p>`

    tarjetaAtkEsp.append(atkesp)

    let defen = document.createElement('p')
    defen.innerHTML = `<p>${pokemon.stats[2].base_stat}</p>
    <p>Def</p>`

    tarjetaDef.append(defen)



    new Chart(ctx, {
        type: 'bar',
        data: {
        labels: [`${pokemon.stats[0].stat.name}`, `${pokemon.stats[1].stat.name}`, `${pokemon.stats[2].stat.name}`, `${pokemon.stats[3].stat.name}`, `${pokemon.stats[4].stat.name}`, `${pokemon.stats[5].stat.name}`],
        datasets: [{
            label: 'STATS',
            data: [ `${pokemon.stats[0].base_stat}`, `${pokemon.stats[1].base_stat}`, `${pokemon.stats[2].base_stat}`, `${pokemon.stats[3].base_stat}`, `${pokemon.stats[4].base_stat}`, `${pokemon.stats[5].base_stat}`],
            borderWidth: 1,
        }]
        },
        options: {
        scales: {
            y: {
            beginAtZero: true
            }
        }
        }
    });

}



