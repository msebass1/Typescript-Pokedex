const app : HTMLElement | any = document.getElementById('app');
//formas altenativas de la misma variable por si no lo ecuentra por ejemplo (puede tener varios tipos)
const pokemons : number = 100;

interface IPokemon{
  id:number,
  name:string,
  type:string,
  image:string
}

//clase de pokemon

//arrowfunction para usar la variable pokemons deforma directa
const fetchAllPokemons = () => {
  for(var i=1; i <= pokemons;i++){
    getPokemon(i);
  }
}

const getPokemon = async (id:number): Promise<void> => {
  const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const pokemon: any = await data.json()
  const pokemonType: string = pokemon.types
    .map((poke: any) => poke.type.name)
    .join(", ")

  const transformedPokemon = {
    id: pokemon.id,
    name: pokemon.name,
    image: `${pokemon.sprites.front_default}`,
    type: pokemonType,
  }

  showPokemon(transformedPokemon)
}
const showPokemon = (pokemon: IPokemon): void => {
  let output: string = `
        <div class="card">
            <span class="card--id">#${pokemon.id}</span>
            <img class="card--image" src=${pokemon.image} alt=${pokemon.name} />
            <h1 class="card--name">${pokemon.name}</h1>
            <span class="card--details">${pokemon.type}</span>
        </div>
    `
  app.innerHTML += output
}

fetchAllPokemons();
