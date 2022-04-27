/* import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

try {
  console.info('🍃 Seeding... 🍃')
  prisma.user.create({
    data: {
      email: 'test@test.com',
      password: 'test',
      name: 'test',
    },
  })
  console.info('🍃 Seeding complete! 🍃')
} catch (error) {
  console.error(error)
}
 */

import { PrismaClient } from '@prisma/client'
const { faker } = require('@faker-js/faker')

// 2
const prisma = new PrismaClient()

// 3
async function main() {
  console.info('🍃 Seeding... 🍃')
  for (let i = 0; i < 10; i++) {
    let randomName = faker.name.findName()
    let randomEmail = faker.internet.email()
    let randomPassword = faker.internet.password()
    await prisma.user.create({
      data: {
        email: randomEmail,
        password: randomPassword,
        name: randomName,
      },
    })
  }
  console.info('🍃 Seeding complete! 🍃')

  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
}

// 4
main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
