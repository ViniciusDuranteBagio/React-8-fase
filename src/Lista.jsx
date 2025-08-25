function Lista(){
    const nomes = ["Gui", "Guilherme", "Roecker", "Viana"]
  return (
    <>
    <ul>
        {nomes.map(nome => <li>{nome}</li>)}
    </ul>
    </>
  )

}

export default Lista;