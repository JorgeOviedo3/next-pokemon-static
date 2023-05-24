import { NextPage, GetStaticPaths, GetStaticProps } from "next";

import { Pokemon, PokemonListResponse } from "@/interfaces";
import { pokeApi } from "@/api";
import { Text } from "@nextui-org/react";

interface Props {
    pokemon: Pokemon
}

const PokemonByNamePage: NextPage<Props> = ( {pokemon} ) => {
    return <>
        <Text h1>{pokemon.name}</Text>
    </>;
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");
    const pokemonListName = data.results.map((pokemon) => (pokemon.name));

    return {
        paths: pokemonListName.map((name) => ({
            params: {name}
        }))
            ,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    
    const {name} = params as {name: string};

    const { data } = await  pokeApi.get<Pokemon>(`/pokemon/${name}`);

    return {
        props: {
            pokemon: data
        }
    }
}

export default PokemonByNamePage;