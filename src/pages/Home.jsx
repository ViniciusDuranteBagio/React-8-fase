import secret from "../assets/secret.png"
import "./css/home.css"

export default function Home() {
  return (
    <div className="home-container">
      <img src={secret} alt="secret" className="home-image" />
      <h1 className="home-title">Wanna play a game?</h1>
    </div>
  )
}