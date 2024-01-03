import {useState} from 'react'
import styled from '@emotion/styled';
//Creacion del hook personalizado

//Styled components
const Label = styled.label`
    color: #FFF;
    display: block;
    font-family: 'Lato', sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin: 15px 0;
`;

const Select = styled.select`
    width: 100%;
    font-size: 18px;
    padding:14px;
    border-radius: 10px;
`;
const useSelectMonedas = (label, opciones) => {            //declaracion del hook personalizado
    //crear un state generico para guardar la moneda seleccionada
    const [state, setState] = useState('');


    const SelectMonedas = () => (           //contiene una funcion imprime en la consola
        <>
            <Label>{label}</Label>          {/*Imprime el texto para el label */}
            <Select
                value={state}
                onChange={ e => setState(e.target.value) }
            >          {/* Crea un select para el formulario*/}
                <option value="">Seleccione</option> { /*value vacio */}
                {opciones.map( opcion => (            //itera sobre el arreglo de objetos, parentesis son return
                    <option                         //crea un option por cada opcion
                        key= {opcion.id}            //inserta key de react
                        value = {opcion.id}     //inserta el nombre en el value para render
                    >{opcion.nombre}</option>
                ))}


            </Select>
        </>
    )
    return [ state,  SelectMonedas ];               //hook devuelve un array con la funcion SelectMonedas y el state
}

export default useSelectMonedas;
