import { test } from '@japa/runner'

test.group('Deletar favorito', () => {
  test('deletar favorito', async ({client})=> {
    const resposta=await client.delete('/favorito/1')
    resposta.assertStatus(200)
  })
  
  test('deletar favorito inexistente',)
})
