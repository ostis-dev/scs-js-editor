import { scsLexer } from './syntax/scsLexer';
import { scsParser } from './syntax/scsParser';
import { ParseCallbacks, ParseError, TokenLocation } from './scs_parser_data';

import { ANTLRInputStream, CommonTokenStream, ParserErrorListener } from 'antlr4ts';

class ErrorListener implements ParserErrorListener {
    
    private callback:(err: ParseError) => void = null;

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

    private onParseError(err: ParseError) : void {
        // TODO: implement me
    }

    private onAddIdtf(idtf: string, loc: TokenLocation) {
        // TODO: implement me
    }
};