import { Pool } from "pg";

export const db = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "priyam12", // ⚠️ use the password you set
  database: "reachinbox",
});
