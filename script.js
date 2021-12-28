const pokedex = document.getElementById('pokedex');

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 50; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id,
            ability: result.abilities.map((ability)=> ability.ability.name).join(''),
            moves : result.moves.map((move)=> move.move.name).join(','),
            weight : result.weight 
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <li class="card">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle">Type: ${pokeman.type}</p>
            <p class="card-subtitle">Abilities_:${pokeman.ability}</p>
            <p class="card-subtitle">Moves__: ${pokeman.moves}</p>
            <p class="crad-subtitle">Weight: ${pokeman.weight}</p>
        </li>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();