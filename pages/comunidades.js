import React from "react"
import MainFlex from "../src/components/MainFlex"
import {AlurakutMenu} from "../src/libs/AlurakutCommons.js"
import CommunityBox from '../src/components/CommunityBox'
import nookies from "nookies"
import jwt from "jsonwebtoken"

export default function CommunitiesPage(props) {
    const user = props.githubUser

    const [communities, setCommunities] = React.useState([])

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
    .then((completeResponse) => {
      //o retorno transformado em json, "data" é padrão, e o nome da query retornada do gql
      const datoCommunities = completeResponse.data.allCommunities

      setCommunities(datoCommunities)
    }, [])

  return (
      <>
        <AlurakutMenu />
        <MainFlex>
            <CommunityBox>
                {<h2 className="smallTitle">Comunidades ({communities.length})</h2>}
                <ul>
                    {communities.map(item => {
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
            </CommunityBox>
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