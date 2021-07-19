import React from "react"
import MainFlex from "../src/components/MainFlex"
import {AlurakutMenu} from "../src/libs/AlurakutCommons.js"
import ScrapBox from "../src/components/ScrapBox"
import nookies from "nookies"
import jwt from "jsonwebtoken"

export default function ScrapsPage(props) {
    const user = props.githubUser

    const [scraps, setScraps] = React.useState([])

    fetch("https://graphql.datocms.com/", {
        method: "POST",
        headers: {
          "Authorization": "1f4811d07527be614990db0206587c",
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({"query": `query {
          allScraps {
            id
            message
            author
          }
        }`})
      })
      .then(response => response.json())
      .then(completeResponse => {
        //o retorno transformado em json, "data" é padrão, e o nome da query retornada do gql
        const datoScraps = completeResponse.data.allScraps

        setScraps(datoScraps)
      }, [])
  
    return (
        <>
        <AlurakutMenu />
        <MainFlex>
            <ScrapBox>
                {<h2 className="smallTitle">Scraps ({scraps.length})</h2>}
                {scraps.map(item => {
                return(
                    <div className="scrapContainer" key={item.id}>
                        <div className="author">
                            <img src={`http://github.com/${item.author}.png`} />
                            <p>@{item.author}</p>
                        </div>
                        <span>{item.message}</span>
                    </div>
                )
                })}
            </ScrapBox>
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