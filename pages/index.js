import React from "react"
import MainGrid from "../src/components/MainGrid"
import Box from "../src/components/Box"
import {AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault} from "../src/libs/AlurakutCommons.js"
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations'


const user = "juamerico"
function ProfileSideBar() {
  return <Box>
    <img src={`http://github.com/${user}.png`}/>
  
    <hr/>

      <p>
        <a className="boxLink">
          {user}
        </a>
      </p>
      <hr/>

      <AlurakutProfileSidebarMenuDefault />
  </Box>  
}

export default function Home() {

  const [following, setFollowing] = React.useState([])
  const [followers, setFollowers] = React.useState([])
  const [communities, setCommunities] = React.useState([])
  
  React.useEffect(function() {
    //Busca quem segue
    fetch("https://api.github.com/users/juamerico/following")
    .then(function(data) {
      return data.json()
    })
    .then(function(completeData) {
      setFollowing(completeData)
    })
  
    //Busca seguidores
    fetch("https://api.github.com/users/juamerico/followers")
    .then(function(data) {
      return data.json()
    })
    .then(function(completeData) {
      setFollowers(completeData)
    })

    //Busca comunidades
    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        "Authorization": "1f4811d07527be614990db0206587c",
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({"query": `query {
        allCommunities {
          title
          id
          creatorSlug
          imageUrl
        }
      }`})
    })
    .then(response => response.json())
    .then(completeResponse => {
      //o retorno transformado em json, "data" é padrão, e o nome da query retornada do gql
      const datoCommunities = completeResponse.data.allCommunities
      console.log(datoCommunities)
      setCommunities(datoCommunities)
    })
  }, [])

  return (
    <>
      <AlurakutMenu/>

      <MainGrid>
        <div className="profileArea" style={{gridArea: "profileArea"}}>
          <ProfileSideBar/>
        </div>

        <div className="welcomeArea" style={{gridArea: "welcomeArea"}}>
          <Box>
            <h1 className="title">Bem-Vindo</h1>
            <OrkutNostalgicIconSet/>
          </Box>
          <Box>
          <h2 className="subTitle">O que você deseja fazer?</h2>
          <form onSubmit={function handleCreateCommunity(e) {
            e.preventDefault();
            const formData = new FormData(e.target);

            const community = {
              title: formData.get("title"),
              imageUrl: formData.get("image"),
              creatorSlug: user
            }

            fetch("/api/datoCommunities", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(community)
            })
            .then(async response => {
              const data = await response.json()
              console.log(`comunidade do dato: ${data.createdRecord}`)
              const community = data.createdRecord
              const updatedCommunities = [...communities, community]
              setCommunities(updatedCommunities)
            })

          }}>
            <div>
              <input
                placeholder="Nome da comunidade"
                name="title"
                aria-label="Nome da comunidade"
                type="text"
              />
            </div>
            <div>
              <input
                placeholder="Imagem da comunidade"
                name="image"
                aria-label="Nome da comunidade"
              />
            </div>
            <button>
              Criar comunidade
            </button>
          </form>
        </Box>
        </div>

        <div className="profileRelationsArea" style={{gridArea: "relationsArea"}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Seguindo ({following.length})</h2>
            <ul>
             {following.slice(0,6).map(item => {
                return(
                  <li>
                    <a href={`https://github.com/${item.login}`}>
                      <img src={`https://github.com/${item.login}.png`}/>
                      <span>{item.login}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Seguidores ({followers.length})</h2>
            <ul>
              {followers.slice(0,6).map(item => {
                return (
                  <li>
                    <a href={`https://github.com/${item.login}`}>
                      <img src={`https://github.com/${item.login}.png`}/>
                      <span>{item.login}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({communities.length})</h2>
            <ul>
              {communities.slice(0,6).map(item => {
                return(
                  <li key={item.id}>
                    <a href={item.imageUrl}>
                      <img src={item.imageUrl}/>
                      <span>{item.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
