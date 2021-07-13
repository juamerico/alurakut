import MainGrid from "../src/components/MainGrid"
import Box from "../src/components/Box"
import {AlurakutMenu, OrkutNostalgicIconSet } from "../src/libs/AlurakutCommons.js"
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations';


function ProfileSideBar(user) {
  return <Box>
    <img src={`https://www.github.com/${user.inputUser}.png`}/>
  </Box>  
}

const friends = [
  "jensimmons",
  "marcobrunodev",
  "juunegreiros",
  "omariosouto",
  "rafaballerini",
  "peas"
]

export default function Home() {
  const user = "juamerico"

  return (
    <>
      <AlurakutMenu/>

      <MainGrid>
        <div className="profileArea" style={{gridArea: "profileArea"}}>
          <ProfileSideBar inputUser={user}/>
        </div>

        <div className="welcomeArea" style={{gridArea: "welcomeArea"}}>
          <Box>
            <h1 className="title">Bem-Vindo</h1>
            <OrkutNostalgicIconSet/>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{gridArea: "relationsArea"}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Pessoas da comunidade ({friends.length})</h2>
            <ul>
              {friends.map(friend => {
                return(
                  <li>
                    <a href={`/users/${friend}`} key={friend}>
                      <img src={`https://www.github.com/${friend}.png`}/>
                      <span>{friend}</span>
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
