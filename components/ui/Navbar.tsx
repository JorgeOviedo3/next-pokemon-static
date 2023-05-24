import { default as NextLink } from "next/link";
import Image from "next/image";

import { useTheme, Text, Spacer} from "@nextui-org/react";

export const Navbar = () => {
    const { theme } = useTheme();

    return (
        <div
            style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "start",
                padding: "0px 20px",
                backgroundColor: theme?.colors.gray100.value,
            }}
        >
            <NextLink href="/" passHref style={{ display: "flex" }}>
                <Image
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/132.png"
                    alt="logo"
                    width={70}
                    height={70}
                />
                <Text color="white" h2>
                    P
                </Text>
                <Text color="white" h3>
                    ókemon
                </Text>
            </NextLink>
            <Spacer css={{ flex: 1 }} />
            <NextLink href="/favorites">
                <Text color="white">Favoritos</Text>
            </NextLink>
        </div>
    );
};
