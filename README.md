# https://alurakut-delta-lemon.vercel.app/login

# Imersão React Alura - Projeto Alurakut
Projeto desenvolvido durante a semana de Imersão React, com o objetivo de aprender fundamentos do framework de JavaScript **React**, utilizando **Styled Components** e **Next.JS** para criar uma versão do *Orkut*. No caso, o login é efetuado apenas com informação do nome de usuário do Github.

## Principais aprendizados adquiridos durante o desenvolvimento da aplicação
- Conceitualização sobre componentização e reaproveitamento de código
- Ênfase em operações assíncronas
- Gerenciamento de conteúdos por meio de um gerenciador externo

### Autenticação de usuário
A autenticação é realizada por meio de cookies, manipulados com auxílio da biblioteca Nookies.

#### Login
alurakut/pages/[login.js](https://github.com/juamerico/alurakut/blob/main/pages/login.js)\
\
Na tela de login, ao informar o nome de usuário do Github e submeter o formulário, uma requisição do tipo POST é realizada criando e inserindo cookies com as credenciais do usuário. Neste momento também ocorre o redirecionamento para a página inicial da plataforma.

#### Acessando uma página
alurakut/[pages](https://github.com/juamerico/alurakut/tree/main/pages)\
\
Ao tentar acessar qualquer página, a função `getServerSideProps(context)` - sendo o parâmetro `context` os cookies do usuário - realiza uma verificação se existem cookies. Caso existam, a função `jwt.decode(cookies)` faz a decodificação das informações encontradas e, caso sejam diferentes das credenciais informadas, o usuário é redirecionado à tela de login. Caso sejam compatíveis, as credenciais são retornadas como parâmtro para a função `Container(props)`, para serem utilizadas no perfil do usuário logado.

### Integração com o gerenciador de conteúdos DatoCMS
O conteúdo é gerenciado através da plataforma DatoCMS, e manipulado com auxílio da biblioteca datocms-client.
#### Criando um novo conteúdo na interface do usuário
alurakut/pages/[index.js](https://github.com/juamerico/alurakut/blob/main/pages/index.js)\
\
Uma constante é criada utilizando o *hook* `React.useState([])` - sendo o parâmetro um array vazio - para instanciar os diversos conteúdos que serão enviados ao banco de dados, entre eles **seguidores**, **comunidades**, **recados** etc. 
No momento da submissão de um formulário de criação de novo conteúdo, uma requisição do tipo POST é enviada à respectiva API, contendo em seu corpo os dados informados pelo usuário.

#### Buscando os conteúdos no banco de dados
alurakut/[pages](https://github.com/juamerico/alurakut/tree/main/pages)\
\
O hook `React.useEffec` realiza uma requisição usando o método `fetch()`, da qual retorna uma promise e, em seguida, os dados da API requisitada. Esses dados são inseridos na array da constante referente ao respectivo conteúdo.\
Em alguns casos, como **seguidores** e **seguindo**, essa busca é feita na API do Github (externa).\
Já no caso dos **recados**, **depoimentos**, **comunidades** e outros conteúdos criados pelo próprio usuário, a requisição é feita para a API do DatoCMS gerenciada pelo próprio servidor.

#### Inserindo novos conteúdos no banco de dados
alurakut/pages/[api](https://github.com/juamerico/alurakut/tree/main/pages/api)\
\
A API é responsável por receber as requisições de inserção de novo conteúdo no banco de dados. Na função `requestReceiver(req, res)` é executada uma verificação do método da requisição. Caso seja do tipo POST, a operação assíncrona `client.items.create`, da bliblioteca *datocms-cliet* envia os dados do corpo da requisição ao banco de dados. A resposta é o dado retornado.


#### Tecnologias utilizadas
- [React](https://github.com/facebook/react)
- [Styled Components](https://github.com/styled-components/styled-components)
- [NextJs](https://github.com/vercel/next.js/)
- [Nookies](https://github.com/maticzav/nookies)
- [JWT - JSON Web Token](https://github.com/auth0/node-jsonwebtoken)
- [DatoCMS](https://www.datocms.com/)
- [DatoCMS Client](https://github.com/datocms/js-datocms-client)    
