import { hash } from "bcrypt";
import { v4 as uuid } from "uuid";

import createConnection from "..";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuid();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO users(id, name, email, password, "isAdmin", created_at, driver_license)
    values('${id}', 'admin', 'admin@admin.com.br', '${password}', 'true', 'now()', 'abc1234')`
  );

  await connection.close();
}

create().then(() => console.log("User admin created"));
