import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Formulario from './components/Formulario';
import ImagenCripto from './img/imagen-criptos.png'
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';

//styled component del contenedor
const Contenedor = styled.div`
  max-width: 900px;               // maximo ancho de 900px
  margin: 0 auto;                 //margin arriba 0 lados auto
  width: 90%;                      //90% del ancho total
  @media ( min-width: 992px ){
    display: grid;        //activa grid
    grid-template-columns: repeat(2, 1fr);  //crea dos columnas
    column-gap: 2rem;     //agrega espacio 2rem
  }
`;
//coponente de imagen
const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

//styled component para heading
const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`

function App() {
  //se crea un state para traer de Formulario las monedas de los input
  const [monedas, setMonedas ] = useState({})   //inicializa como objeto
  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false); 

  //detecta cuando monedas tenga un cambio y un valor
  useEffect(() => {
    if(Object.keys(monedas).length > 0){ //si se ingresaron monedas en los select
      //Cotizacion con la API
      const cotizarCripto = async () => {
        setCargando(true)                       //cargando es true
        setResultado({})
        const {moneda, criptomoneda} = monedas; //destructuring a las monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        const respuesta = await fetch(url)    //detiene ejecucion hasta establece la conexion con la url 
        const resultado = await respuesta.json() // espera hasta crear objeto js a partir de json
        // console.log(monedas)
        // console.log(resultado)
        // console.log(resultado.DISPLAY[criptomoneda][moneda]) //accede a los subindices de resultado usando corchetes mediante moneda y criptomoneda
        setResultado(resultado.DISPLAY[criptomoneda][moneda])
        setCargando(false)
      }

      cotizarCripto();
    }
  }, [monedas]);

  return (
    <Contenedor>
      <Imagen 
        src={ImagenCripto}
        alt='Imagenes criptomonedas'
      />
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario
          setMonedas = {setMonedas}
        />

        {cargando && <Spinner/>}
        {resultado && resultado.PRICE && <Resultado resultado = {resultado} />} 
      </div>
    </Contenedor>
  
  )
}

export default App
