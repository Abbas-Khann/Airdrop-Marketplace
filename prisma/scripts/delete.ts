import { prisma } from "../client";
async function resetData() {
  await prisma.user.deleteMany({});

  // Add other models as necessary
}

resetData()
  .then(() => {
    console.log("Data reset complete.");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
