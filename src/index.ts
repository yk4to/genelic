import yargs from 'yargs';
import { generate } from './commands/generate';
import { select } from './commands/select';

yargs
  .command("* <id>", "Generate a license file", {}, function(argv) {
    generate(argv.id as string, argv.force as boolean, argv.markdown as boolean);
  })
  .command("select", "Select from all licenses", {}, function(argv) {
    select(argv.force as boolean, argv.markdown as boolean);
  })
  .option('force', {
    alias: 'f',
    type: 'boolean',
    description: 'Force file overwrite'
  })
  .option("markdown", {
    alias: "m",
    describe: "Create a Markdown file",
    type: "boolean",
  })
  .parseSync();
