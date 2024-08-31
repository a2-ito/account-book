import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const categoryData: Prisma.CategoryCreateInput[] = [
  {
    name: '食費',
  },
  {
    name: '日用品',
  },
  {
    name: '被覆費',
  },
  {
    name: '娯楽費',
  },
  {
    name: '交際費',
  },
  {
    name: '医療費',
  },
  {
    name: '水道光熱費',
  },
  {
    name: '通信費',
  },
  {
    name: '税金',
  },
  {
    name: '交通費',
  },
  {
    name: '住居費',
  },
  {
    name: '投資',
  },
  {
    name: 'その他',
  },
]

const transfer = async () => {
  const categories = [];
  for (const c of categoryData) {
    const category = prisma.category.create({
      data: c,
    })
    categories.push(category);
  }
  return await prisma.$transaction(categories);
}

async function main() {
  console.log(`Start seeding ...`)
  await transfer();
  console.log(`Seeding finished.`)
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
