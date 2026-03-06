import server    from "./server.js";
import { PORT } from "./configs/envs.js";

server.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});


