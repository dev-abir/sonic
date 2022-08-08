const { exec } = require("child_process");
const util = require("util");
const fs = require("fs");
// const execP = (command) => new Promise((r) => exec(command, r));
const execP = util.promisify(exec);

// ==================================================
// ==================================================
// ==================================================
// ==================================================
// =================JUST FOR TESTS===================
// =============THIS IS NOT A PART OF THE APP========
// ==================================================
// ==================================================
// ==================================================
// ==================================================
// ==================================================

const x = async () => {
    // FIXME: doesn't actually kill the process if TLE
    try {
        // let { stdout, stderr } = await execP("gcc --std=c11 -o test test.c && gedit", {
        //     timeout: 3000,
        //     killSignal: "SIGKILL",
        // });
        // console.log(`[0]stdout: ${stdout}`);
        // console.log(`[0]stderr: ${stderr}`);

        const fileContents = await fs.promises.readFile("./workspace/inp", "utf8");
        console.log(String.raw`${fileContents}`)

        ({ stdout, stderr } = await execP(`printf ${String.raw`${fileContents}`} | ./workspace/test`, {
            timeout: 3000,
            killSignal: "SIGKILL",
        }));
        console.log(`[1]stdout: ${stdout}`);
        console.log(`[1]stderr: ${stderr}`);
    } catch (err) {
        // console.log(JSON.stringify(err, null, 4));

        if (err.killed) console.log("Time Limit Exceeded");
        else console.log(err.stderr);
    }
};

x();
