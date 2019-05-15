import React from 'react'

export default () => {
  return (
    <form onSubmit={e => e.preventDefault()}>
      <h3>Actualizar Alumno</h3>
      <section>
        <div>
          Nombre
      <br />
          <input></input>
        </div>
        <div>
          Email
      <br />
          <input></input>
        </div>
        <div>
          Telefono
      <br />
          <input></input>
        </div>
        <div>
          DNI
      <br />
          <input></input>
        </div>
      </section>
      <br />
      <section>
        <button type='button'>Cancelar</button>
        <button type='submit'>Enviar</button>
      </section>
    </form>
  )
}
