
const PageNotFound = () => {
  return (
    <main>
      <div className="container--page-not-found" >
        <img className="page--not-found-img" alt="sad-face" src="https://images.vexels.com/media/users/3/134546/isolated/preview/b1b61276fef1c4a683aabaa53833c7ca-emoji-emoticon-cara-triste.png"  />
        <div className="container--text">
          <h1 className="page--not-found-title">Error, codigo 404</h1>
          <h2 className="page--not-found-subtitle">Ooops, pagina no encontrada</h2>
          <p className="page--not-found-text">La pagina que estas buscando no existe o otro error ocurrio</p>
        </div>
      </div>
    </main>
  )
}

export default PageNotFound;