import { prisma } from './generated/prisma-client'

// A `main` function so that we can use async/await
async function main() {

  // Create a new user called `Alice`
  const newUser = await prisma.createUser({ name: 'Alice' })
  console.log(`Created new user: ${newUser.name} (ID: ${newUser.id})`)
  const newArticle = await prisma.createArticle({
    title: 'A article title',
    description: 'a descriptions',
    href: 'https://sdlfk.com',
    date: new Date()
  })
  const allArticles = await prisma.articles()
  console.log(allArticles)
  // Read all users from the database and print them to the console
  const allUsers = await prisma.users()
  console.log(allUsers)
}

main().catch(e => console.error(e))