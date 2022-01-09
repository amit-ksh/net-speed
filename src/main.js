import { FastAPI, SpeedUnits } from "fast-api-speedtest";
import ora from "ora";
import chalk from "chalk";

function showHelp() {
  console.log("Usage: fast-speedtest <command>\n");
  console.log("Display download and upload speed.\n");

  console.log("Commands:\n");
  console.log("-p or --ping           Display ping");
  console.log("-s or --server         Display server location");
  console.log("-h or --help           Display help");

  console.log();
}

function showResults(options, result) {
  // show server location
  if (options.server) {
    console.log(`Server Location: ${result.servers[0]}`);
  }

  // show download speed
  console.log(`Download speed: ${result.downloadSpeed} ${result.downloadUnit}`);

  // show upload speed
  console.log(`Upload speed: ${result.uploadSpeed} ${result.uploadUnit}`);

  // show ping if flag present
  if (options.ping) {
    console.log(`Ping: ${result.ping} ms`);
  }
}

async function runSpeedTest() {
  const FastTest = new FastAPI({
    measureUpload: true,
    downloadUnit: SpeedUnits.MBps,
    timeout: 60000,
  });

  let result = {};

  try {
    result = await FastTest.runTest();
  } catch (err) {
    console.log("\n%s Network Error!", chalk.red.bold("ERROR"));
    process.exit(1);
  }

  return result;
}

export async function testNetSpeed(options) {
  if (options.help) {
    showHelp();
  } else {
    const spinner = ora("Loading speedtest results...").start();
    const result = await runSpeedTest();
    spinner.stop();
    showResults(options, result);
  }
}
