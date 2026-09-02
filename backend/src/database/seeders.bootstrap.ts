import { INestApplication } from '@nestjs/common';
import { LinkedinProfileSeeder } from './seeds/linkedin-profile.seeder';

export async function runSeeders(app: INestApplication): Promise<void> {
  const runSeedFlag = process.env.RUN_SEED?.trim().toLowerCase();
  const shouldRunSeed = runSeedFlag === 'true' || runSeedFlag === '1';
  if (!shouldRunSeed) return;

  const seeder = app.get(LinkedinProfileSeeder);
  await seeder.seed();

  console.log('Seed completed successfully!');
}
