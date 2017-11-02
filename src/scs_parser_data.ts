export interface ParseError {
    line: number,
    offset: number,
    len: number,
    msg: string
};

export interface TokenLocation {
    line: number,
    offset: number,
    len: number
};

export interface ParseCallbacks {
    onParseError: (err: ParseError) => void;
    onAddIdtf: (idtf: string, loc: TokenLocation) => void;
};
