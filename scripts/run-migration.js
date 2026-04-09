const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

function loadEnv(localPath) {
  const envPath = path.resolve(process.cwd(), localPath);
  if (!fs.existsSync(envPath)) {
    return;
  }

  const envContents = fs.readFileSync(envPath, "utf8");
  envContents.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      return;
    }

    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex === -1) {
      return;
    }

    const key = trimmed.slice(0, equalsIndex).trim();
    let value = trimmed.slice(equalsIndex + 1).trim();

    if (value.startsWith("\"") && value.endsWith("\"")) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  });
}

async function runMigration(filePath) {
  loadEnv(".env.local");
  loadEnv(".env");

  const sqlPath = path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(sqlPath)) {
    console.error(`Migration file not found: ${sqlPath}`);
    process.exit(1);
  }

  const sql = fs.readFileSync(sqlPath, "utf8");
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("DATABASE_URL is not set in environment. Set it in .env.local or .env.");
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  const client = await pool.connect();
  try {
    console.log(`Running migration: ${sqlPath}`);
    await client.query(sql);
    console.log("Migration completed successfully.");
  } catch (error) {
    console.error("Migration failed:", error.message || error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

const migrationFile = process.argv[2] || "scripts/004_create_auth_tables.sql";
runMigration(migrationFile).catch((error) => {
  console.error("Unexpected error:", error);
  process.exit(1);
});
