import * as dotenv from "dotenv";

import * as server from "./server";

dotenv.config();

const serverOptions: server.ServerOptions = {
    port: parseInt(process.env.PORT, 10) || 80
}

server.launch(serverOptions);