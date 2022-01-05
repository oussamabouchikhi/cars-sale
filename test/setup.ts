import { rm } from "fs/promises";
import { join } from "path/posix";
import { getConnection } from "typeorm";

global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.db'));
  } catch (error) {}
});

global.afterEach(async () => {
  const con = getConnection();
  await con.close();
});