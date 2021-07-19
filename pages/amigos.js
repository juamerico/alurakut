import React from "react"
import MainFlex from "../src/components/MainFlex"
import {AlurakutMenu} from "../src/libs/AlurakutCommons.js"
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations'
import nookies from "nookies"
import jwt from "jsonwebtoken"

export default function FriendsPage(props) {
    const user = props.githubUser

    const [following, setFollowing] = React.useState([])
    const [followers, setFollowers] = React.useState([])
    
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
    }, [])

    return (
        <>
            <AlurakutMenu />
            <MainFlex>     
                <ProfileRelationsBoxWrapper>
                    <h2 className="smallTitle">Seguindo ({following.length})</h2>
                    <ul>
                        {following.map(item => {
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
                    <h2 className="smallTitle">Seguidores ({followers.length})</h2>
                    <ul>
                        {followers.map(item => {
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
            </MainFlex>
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