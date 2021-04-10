import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import image from "./cryptomonedas.png";
import Formulario from "./Components/Formulario";
import Cotizacion from "./Components/Cotizacion";
import Spinner from "./Components/Spinner";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Image = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {
  const [moneda, guardarMoneda] = useState("");
  const [criptomoneda, guardarCritomoneda] = useState("");
  const [resultado, guardarResultado] = useState({});
  const [cargado, guardarCargando] = useState(false);

  useEffect(() => {
    const cotizarCriptoMoneda = async () => {
      if (moneda === "") return;

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const resultado = await axios.get(url);

      //Mostrar el spinner
      guardarCargando(true);

      setTimeout(() => {
        guardarCargando(false);
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 1000);
    };
    cotizarCriptoMoneda();
  }, [moneda, criptomoneda]);

  //mostrar spinner o resultado
  const componente = cargado ? (
    <Spinner />
  ) : (
    <Cotizacion resultado={resultado} />
  );

  return (
    <Contenedor>
      <div>
        <Image src={image} alt="imagen cripto" />
      </div>
      <div>
        <Heading>Cotiza criptomonedas al instante</Heading>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCritomoneda={guardarCritomoneda}
        />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
