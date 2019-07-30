import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';
import Clima from './components/Clima';

function App() {

  //state principal
  //ciudad = state, guardarCiudad = this.setState({})
  const [ciudad, guardarCiudad] = useState('')
  //pais = state, guardarPais = this.setState({})
  const [pais, guardarPais] = useState('')
  //error = state, guardarError = this.setState({})
  const [error, guardarError] = useState(false)
  //resultado = state, guardarResultado = this.setState({})
  const [resultado, guardarResultado] = useState({})
  
  const consultaDatos = datos => {
    if (datos.ciudad === '' || datos.pais === '') {
      guardarError(true)
      return 'error';
    }

    //Ciudad y pais existen, se agreagn al state
    guardarCiudad(datos.ciudad)
    guardarPais(datos.pais)
    guardarError(false)
  }

  useEffect(()=>{
    if (ciudad === '') return;

    const consultarAPI = async () => {
      const appid = 'aa133c093eb59dbdf9c8bc5ae4b1f951'
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&APPID=${appid}`
  
      const respuesta = await fetch(url);
      const resultado = await respuesta.json()
      guardarResultado(resultado);
    }

    consultarAPI();

  }, [ ciudad, pais ])

  //Cargar componente condicionalmente
  let componente;
  if (error) {
    // Hay un error, se muestra el error
    componente = <Error mensaje="Ambos campos son obligatorios"/>
  }else if (resultado.cod === "404"){
    //Todo bien pero la ciudad no se encuentra en los registros de la API
    componente = <Error mensaje="La ciudad no existe en nuestros registros"/>
  }else{
    //no hay errores, mostrar componente
    componente = <Clima resultado={resultado}/>
  }

  return (
    <div className="App">
      <Header titulo="React WeatherApp"/>
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario consultaDatos={consultaDatos}/>
            </div>
            <div className="col s12 m6">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
