import { NextPage } from "next";
import { GetStaticProps } from "next";

import { Card, Grid, Row, Text } from "@nextui-org/react";

import { Layout } from "../components/layouts";
import { PokemonCard } from "@/components/pokemon";
import { pokeApi } from "@/api";
import { PokemonListResponse, SmallPokemon } from "@/interfaces";

interface Props {
    pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
    return (
        <Layout title="Listado de Pokemons">
            <Grid.Container gap={2} justify='flex-start'>
                {pokemons.map((pokemon) => {
                    return (
                        <PokemonCard key={pokemon.id} pokemon={pokemon}/>
                    );
                })}
            </Grid.Container>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { data } = await pokeApi.get<PokemonListResponse>(
        "/pokemon?limit=151"
    );

    const pokemons: SmallPokemon[] = data.results.map(
        (pokemon: SmallPokemon) => {
            const urlString = pokemon.url.slice(0, -1);
            const n = urlString.lastIndexOf("/");
            const id = parseInt(urlString.substring(n + 1));
            const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;

            return {
                ...pokemon,
                image,
                id
            };
        }
    );

    return {
        props: {
            pokemons: pokemons,
        },
    };
};

export default HomePage;
