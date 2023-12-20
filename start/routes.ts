/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import FavoritosController from 'App/Controllers/Http/FavoritosController'
const favoritos=[{id:1, nome: 'Google', url: "http://www.google.com", importante:true}]

Route.get('/', async () => {
  return { app: 'favio-back' }
})

Route.get('/favoritos', async () => {
  return favoritos 
})

Route.get('/favoritos/:id', async ({params, response}) => {
  let favoritoEncontrado=favoritos.find((favoritos)=>favoritos.id==params.id)
  if favoritoEncontrado==undefined
  return response.status(404)
  return favoritoEncontrado
})

Route.get('/favoritos/:nome', async ({params}) => {
  return {id:1, nome:params.nome, url: "http://www.google.com", importante:true }
})

Route.post('/favorito', async ({request,response})=> {
  const {nome,url,importante}=request.body()
  const newFavorito={id:favoritos.length+1,nome,url,importante}
  favoritos.push(newFavorito)
  return response.status(201).send(newFavorito)
})

Route.put('/favoritos/:id', async ({ params, request, response }) => {
  const { nome, url, importante } = request.body()

  const found = favoritos.find((favorito) => favorito.id == params.id)
  if (found == undefined) {
    response.status(404)
  } else {
    const encontrar = favoritos.find((favorito) => favorito.nome == nome && favorito.url == url)
    if (encontrar == undefined) {
      if (nome !== undefined) {
        favoritos[found.id - 1].nome = nome
      }
      if (url !== undefined) {
        favoritos[found.id - 1].url = url
      }
      if (importante !== undefined) {
        favoritos[found.id - 1].importante = importante
      }
      response.status(201).send(favoritos[found.id - 1])
    } else {
      response.status(404)
    }
  }
})

Route.delete('/favoritos/:id', async ({ params, response }) => {
  const found = favoritos.findIndex((favorito) => favorito.id == params.id)

  if (found !== -1) {
    favoritos.splice(found, 1)
    response.status(204)
  } else {
    response.status(404)
  }
})

Route.resource('favoritao', 'FavoritosController').apiOnly()