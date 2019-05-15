import React from 'react'

export default (props: { title: string }) => {
  return (
    <>
      <h3>{props.title}</h3>
      <form onSubmit={e => e.preventDefault()}>
        Nombre
        <br />
        <input></input>
        <br />
        Email
        <br />
        <input></input>
        <br/>
        Telefono
        <br />
        <input></input>
        <br/>
        DNI
        <br />
        <input></input>
        <br />
        <br />
        <button type='button'>Cancelar</button>
        <button type='submit'>Enviar</button>
      </form>
    </>
  )
}
