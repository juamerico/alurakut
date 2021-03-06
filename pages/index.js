import React from "react"
import MainGrid from "../src/components/MainGrid"
import Box from "../src/components/Box"
import {AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault} from "../src/libs/AlurakutCommons.js"
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations'
import nookies from "nookies"
import jwt from "jsonwebtoken"

export default function Home(props) {

  const user = props.githubUser

  const [following, setFollowing] = React.useState([])
  const [followers, setFollowers] = React.useState([])
  const [communities, setCommunities] = React.useState([])
  const [scraps, setScraps] = React.useState([])
  const [testimonials, setTestimonials] = React.useState([])
  
  React.useEffect(function() {
    //Busca quem segue
    fetch(`https://api.github.com/users/${user}/following`)
    .then(function(data) {
      return data.json()
    })
    .then(function(completeData) {
      setFollowing(completeData)
    })
  
    //Busca seguidores
    fetch(`https://api.github.com/users/${user}/followers`)
    .then(function(data) {
      return data.json()
    })
    .then(function(completeData) {
      setFollowers(completeData)
    })

    //Busca comunidades, scraps e depoimentos
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
        },
        allScraps {
          id
          message
          author
        },
        allTestimonials {
          id
          author
          text
        }
      }`})
    })
    .then(response => response.json())
    .then(completeResponse => {
      //o retorno transformado em json, "data" é padrão, e o nome da query retornada do gql
      const datoCommunities = completeResponse.data.allCommunities
      const datoScraps = completeResponse.data.allScraps
      const datoTestimonials = completeResponse.data.allTestimonials

      setCommunities(datoCommunities)
      setScraps(datoScraps)
      setTestimonials(datoTestimonials)
    })
  }, [])

  return (
    <>
      <AlurakutMenu/>

      <MainGrid>
        <div className="profileArea" style={{gridArea: "profileArea"}}>
          <Box>
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
        </div>

        <div className="welcomeArea" style={{gridArea: "welcomeArea"}}>
          <Box>
            <h1 className="title">Bem-Vindo(a)</h1>
            <OrkutNostalgicIconSet/>
          </Box>

          <Box>
            <h2 className="subTitle">Deixar um recado</h2>
            <form onSubmit={function handleCreateScrap(e) {
              e.preventDefault()
              const formData = new FormData(e.target)

              const scrap = {
                message: formData.get("scrap"),
                author: user
              }

              fetch("/api/scrap", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(scrap)
              })
              .then(async (response) => {
                const data = await response.json()
                const scrap = data.createdRecord
                const updatedScraps = [...scraps, scrap]
                setScraps(updatedScraps)
              })

              document.querySelector(`[data-input="scrap"]`).value = ""
            }}>
              <div>
                <textarea
                  data-input="scrap"
                  placeholder="Escreva seu recado"
                  name="scrap"
                  aria-label="Recado"
                  type="text"
                />
              </div>
              <button>
                Enviar recado
              </button>
            </form>
          </Box>

          <Box>
          <h2 className="subTitle">Criar comunidade</h2>
          <form onSubmit={function handleCreateCommunity(e) {
            e.preventDefault()
            const formData = new FormData(e.target)

            const community = {
              title: formData.get("title"),
              imageUrl: formData.get("image"),
              creatorSlug: user
            }

            fetch("/api/community", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(community)
            })
            .then(async (response) => {
              const data = await response.json()
              const community = data.createdRecord
              const updatedCommunities = [...communities, community]
              setCommunities(updatedCommunities)
            })

            document.querySelector(`[data-input="communityTitle"]`).value = ""
            document.querySelector(`[data-input="communityImg"]`).value = ""
          }}>
            <div>
              <input
                data-input="communityTitle"
                placeholder="Nome da comunidade"
                name="title"
                aria-label="Nome da comunidade"
                type="text"
              />
            </div>
            <div>
              <input
                data-input="communityImg"
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

        <Box>
            <h2 className="subTitle">Deixar um depoimento</h2>
            <form onSubmit={function handleCreateTestimonial(e) {
              e.preventDefault()
              const formData = new FormData(e.target)

              const testimonial = {
                text: formData.get("testimonial"),
                author: user
              }

              fetch("/api/testimonial", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(testimonial)
              })
              .then(async (response) => {
                const data = await response.json()
                const testimonial = data.createdRecord
                const updatedTestimonial = [...testimonials, testimonial]
                setTestimonials(updatedTestimonial)
              })

            document.querySelector(`[data-input="testimonial"]`).value = ""

            }}>
              <div>
                <textarea
                  data-input="testimonial"
                  placeholder="Escreva seu depoimento"
                  name="testimonial"
                  aria-label="Depoimento"
                  type="text"
                />
              </div>
              <button>
                Enviar depoimento
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
                  <li key={item.id}>
                    <a href={`https://github.com/${item.login}`}>
                      <img src={item.avatar_url}/>
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
                  <li key={item.id}>
                    <a href={`https://github.com/${item.login}`}>
                      <img src={item.avatar_url}/>
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

//autenticação
export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN
  const {githubUser} = jwt.decode(token)
  
  if(!cookies.USER_TOKEN) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    }
  }

  return {
    props: {
      githubUser
    }
  }
}