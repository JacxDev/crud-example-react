import React, { useState } from 'react';
import shortid from 'shortid';

function App() {

  const [tarea, setTarea ] = useState('')
  const [tareas, setTareas] = useState([])
  const [modoEdicion, setModoEdicion] = useState(false);
  const [id, setId] = useState('')
  const [error, setError] = useState(null)

  const agregarTarea = (e) => {
    e.preventDefault()
    if(!tarea.trim()){
      console.log("Elemento vacio")
      setError('Olvidaste escribir una tarea')
      return
    }
    console.log(tarea)

    setTareas([
      ...tareas,
      {id: shortid.generate(), tarea:tarea}
    ])
    setTarea('')
    setError(null)
  }

  const eliminarTarea = (id) => {
    const arrayFiltrado = tareas.filter(item => item.id !== id);
    setTareas(arrayFiltrado);
  }

  const editar = (item) => {
    console.log(item)
    setModoEdicion(true)
    setTarea(item.tarea)
    setId(item.id)
  }

  const editarTarea = (e) => {
    e.preventDefault()
    if(!tarea.trim()){
      console.log("Elemento vacio")
      setError('Olvidaste escribir una tarea')
      return
    }
    const arrayEditado = tareas.map(item => item.id === id ? {id:id, tarea:tarea} :  item)

    setTareas(arrayEditado)
    setModoEdicion(false)
    setTarea('')
    setId('')
    setError(null)
  } 

  return (
    <div className="App container mt-5">
      <h1 className="text-center">CRUD REACT HOOKS</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista Tareas</h4>
          <ul className="list-group">
            {
              tareas.length === 0 ? (
                <li className="list-group-item">No hay Tareas</li>
              ) : ( 
                tareas.map(item => {
                  return(
                      <li className="list-group-item" key={item.id}>
                        <span className="lead"> {item.tarea} </span>
                        <button 
                          className="btn btn-warning btn-sm float-right"
                          onClick={() => editar(item)}
                        >
                          Editar
                        </button>
                        <button 
                          className="btn btn-danger btn-sm float-right mx-2" 
                          onClick={() => eliminarTarea(item.id)}
                        >
                          Eliminar
                        </button>
                      </li>
                  )
                })
              )
            }

          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {
              modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
            }
          </h4>
          <form onSubmit={ modoEdicion ? editarTarea : agregarTarea}>
            {
              error ? <span className="text-danger"> {error} </span> : null
            }
            <input 
              type="text" 
              className="form-control mb-2"
              placeholder="Ingrese Tarea"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />

            {
              modoEdicion ? (
                <button className="btn btn-warning btn-block" type="submit">Editar</button>
              ) : (
                <button className="btn btn-dark btn-block" type="submit">Agregar</button>
              )
            }
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
