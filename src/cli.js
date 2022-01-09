import { testNetSpeed } from "./main.js";
import arg from "arg";

function parseArgumnetsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--ping": Boolean,
      "--server": Boolean,
      "--help": Boolean,
      "-p": "--ping",
      "-s": "--server",
      "-h": "--help",
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  return {
    skipPrompts: args["--yes"] || false,
    ping: args["--ping"] || false,
    server: args["--server"] || false,
    help: args["--help"] || false,
  };
}

export async function cli(args) {
  const options = parseArgumnetsIntoOptions(args);
  await testNetSpeed(options);
}
