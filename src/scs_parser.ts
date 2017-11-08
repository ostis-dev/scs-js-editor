import { scsLexer } from './syntax/scsLexer';
import { scsParser } from './syntax/scsParser';
import { SCsParseCallbacks, SCsParseError, SCsTokenLocation } from './scs_parser_data';

import { ANTLRInputStream, CommonTokenStream, ParserErrorListener } from 'antlr4ts';

class ErrorListener implements ParserErrorListener {
    
    private callback:(err: SCsParseError) => void = null;

    constructor(callback) {
        this.callback = callback;
    }

    syntaxError(recognizer, offendingSymbol, line, charPositionInLine, msg: string, e) : void {
        this.callback({
            line: line,
            offset: charPositionInLine,
            len: offendingSymbol ? offendingSymbol.text.length : 0,
            msg: msg
        });
    }
};

export class SCsTriplesParser {

    constructor() {

    }

    public Parse(text: string) : boolean {

        try {
            let chars = new ANTLRInputStream(text);
            let lexer = new scsLexer(chars);
            let tokens  = new CommonTokenStream(lexer);
            let parser = new scsParser(tokens);
            
            parser.buildParseTree = false;
            parser.parserCallbacks = {
                onParseError: this.onParseError,
                onAddIdtf: this.onAddIdtf,
            };

            parser.addErrorListener(new ErrorListener(function(err) {
            }));

            parser.syntax();

        } catch (e) {
            return false;
        }

        return true;
    }

    private onParseError(err: SCsParseError) : void {
        // TODO: implement me
    }

    private onAddIdtf(idtf: string, loc: SCsTokenLocation) {
        // TODO: implement me
    }
};