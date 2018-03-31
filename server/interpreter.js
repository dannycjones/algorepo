import FileSystem from 'fs';
import Path from 'path';
import PEGJS from 'pegjs';

var grammar = FileSystem.readFileSync(Path.resolve(__dirname, './grammar.pegjs')).toString();
var parser = PEGJS.generate(grammar);

export default {
  process (input, variables) {
    parser.symbols = variables;
    return parser.parse(input);
  }
};
