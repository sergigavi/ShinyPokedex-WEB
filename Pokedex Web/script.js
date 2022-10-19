
const poke_container = document.getElementById('poke-container')    //cojo del html el container, ahi es donde voy a ir metiendolo todo
const pokemon_count = 80//905

const colors = {

    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5',
}

const main_types = Object.keys(colors)

const fetchPokemones = async () => {

    for(let i = 1; i <= pokemon_count; i++){
        await getPokemon(i)
    }
}

const getPokemon = async (id) => {
    
    const pUrl = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res =  await fetch(pUrl)
    const data = await res.json()
    
    crearPokemonCard(data)  //console.log(data) me muestra el json que traigo por consola (pero lo que quiero es insertarlo dinamicamente en la pagina obv)
}



const crearPokemonCard = (pokemon) => {
    //como todo esto está realmente en un bucle pues crea una carta por cada pokemon individual que me traigo

    const pokemonElement = document.createElement('div')
    pokemonElement.classList.add('pokemon') //al container le añado un div de la clase pokemon

    //Pongo bonitas las variables como quiero
    const nombre = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)    //slice es como substring

    const id = pokemon.id.toString().padStart(3, '0')

    const poke_types = pokemon.types.map(type => type.type.name)    //Mapeo los tipos de cada uno a un array de strings con los nombres de los tipos
    const type = main_types.find(type => poke_types.indexOf(type) > -1) //Devuelve -1 si no encuentra ese tipo

    const color = colors[type]  //Lo cojo mediante el indice que he sacado antes para sacar los valores

    pokemonElement.style.backgroundColor = color //le pongo su color así

    //  Puedo coger la informacion del pokemon actual ya que lo obtengo de la data parseada a json de cada elemento individual que me llega aqui para crear su tarjeta
    const pokemonInnerHTML = `
    <div class="img-container">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.id}.png" alt="">
            </div>

            <div class="info">
                <span class="number">#${id}</span>
                <h3 class="name">${nombre}</h3>
                <small class="type">Type: <span>${type}</span></small>
            </div>
    `
    
    pokemonElement.innerHTML = pokemonInnerHTML //A mi elemento le meto el codigo de dentro del pokemon

    poke_container.appendChild(pokemonElement)  //Y al container del html le meto cada elemento que he creado pokemon con la info dentro que le he metido arriba

}

fetchPokemones() //Me traigo los pokemons de 1 en 1 hasta el 100 mediante su id