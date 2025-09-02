function Lista() {
const nomes = ["Sidnei", "Caio", "Bruno", "Cabelo"]
  return (
    <div>
        <ul>
            {nomes.map(nome => (
                <li>{nome}</li>
            ))}
        </ul>
    </div>
  )
}

export default Lista