import { server } from "./server/server.js";

const PORT = 3000;

server.listen(PORT, () => console.log(`Server running in http://localhost:${PORT}`));


