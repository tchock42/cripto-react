import {useEffect, useState} from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectMonedas from '../hooks/useSelectMonedas' //importa hook personalizado
import {monedas} from '../data/monedas'


//styled components
const InputSubmit = styled.input`
    background-color: #9497FF;
    border:none;
    width: 100%;
    padding:10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color 1s ease;
    margin-top: 30px;
    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }
 `

const Formulario = ({setMonedas}) => {

    const [criptos, setCriptos] = useState([]) // state para la API de cryptos
    const [error, setError] = useState(false);
    //crea un Componente SelectMonedas usando el hook personalizado useSelectMonedas, sele pasa etiqueta de select
    //extrae el state con la moneda seleccionada
    const [moneda, SelectMonedas ] = useSelectMonedas('Elige tu moneda', monedas) //asigna al Componente los argumentos 'Elige tu moneda, y las monedas
    const [criptomoneda, SelectCriptomoneda ] = useSelectMonedas('Elige tu criptomoneda', criptos) //ejecuta hook personalizado para renderizar criptos de la API

    //obtención de las monedas desde la API 
    useEffect(() => { //ejecuta al iniciar la pagina
        const consultarAPI = async () => { //funcion asincrona
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"

            const respuesta = await fetch(url) //detiene la ejecucion hasta tener respuesta de conexión
            const resultado = await respuesta.json() //detiene la app hasta obtener un
            // console.log(resultado) //obtiene un objeto resultado de la consulta a la api
            // console.log(resultado.Data) //obtiene el array de objetos de monedas de resultado

            const arrayCryptos = resultado.Data.map(crypto => { //itera sobre 
                // console.log(crypto.CoinInfo.Name) //imprime el nombre y nombre completo
                // console.log(crypto.CoinInfo.FullName)
                const objeto = {            //crea un objeto con la info por cada moneda
                    id: crypto.CoinInfo.Name,
                    nombre: crypto.CoinInfo.FullName
                }
                // console.log(objeto) //imprime cada objeto que contiene id y nombre
                return objeto;
            })       
            // console.log(arrayCryptos)          
            setCriptos(arrayCryptos)  
        }
        consultarAPI();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        //validacion del formulario
        if([moneda, criptomoneda].includes('')){
            //muestra alerta 
            // console.log('ERROR')
            setError(true)
             
            return; //sale del handleSubmit
        }
        setError(false) //si pasa la validación, setError a false
        setMonedas({
            moneda, 
            criptomoneda
        })
    }

    return (    //empieza formulario con form, hook personalizado SelectMonedas
                //y el componente boton InputSubmit
        <>
            {error && <Error>Todos los Campos son Obligatorios</Error>}
            <form
                onSubmit={handleSubmit}
            >

                <SelectMonedas/>
                <SelectCriptomoneda/>
                <InputSubmit 
                    type="submit" 
                    value="Cotizar"
                />
            </form>
        </>
    )
}

export default Formulario
