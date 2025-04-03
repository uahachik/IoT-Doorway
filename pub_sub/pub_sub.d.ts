import { Argv } from "yargs";

declare global {
  interface PubSubArgv extends Argv {
    topic: string;
    message: string;
  }
}