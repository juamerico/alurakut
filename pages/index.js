import React from "react"
import MainGrid from "../src/components/MainGrid"
import Box from "../src/components/Box"
import {AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault} from "../src/libs/AlurakutCommons.js"
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations'
import {user, friendList} from "../social.js"


function ProfileSideBar() {
  return <Box>
    <img src={user.image}/>
  
    <hr />

      <p>
        <a className="boxLink">
          @ {user.title}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
  </Box>  
}

const friends = friendList
console.log(friends)

export default function Home() {
  const [communities, setCommunities] = React.useState([{
    id: "1",
    title: "Odeio acordar cedo",
    image: "https://img10.orkut.br.com/community/52cc4290facd7fa700b897d8a1dc80aa.jpg"
  }])


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
              id: new Date().toISOString,
              title: formData.get("title"),
              image: formData.get("image")
            }

            const updatedCommunities = [...communities, community];
            setCommunities(updatedCommunities);
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
            <h2 className="smallTitle">Pessoas da comunidade ({friends.length})</h2>
            <ul>
             {friends.map(friend => {
                return(
                  <li>
                    <a>
                      <img src={friend.image}/>
                      <span>{friend.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({communities.length})</h2>
            <ul>
              {communities.map(eachCommunity => {
                return(
                  <li key={eachCommunity.id}>
                    <a>
                      <img src={eachCommunity.image}/>
                      <span>{eachCommunity.title}</span>
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
