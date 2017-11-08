

export interface SCsParseError {
    line: number,
    offset: number,
    len: number,
    msg: string
};

export interface SCsTokenLocation {
    line: number,
    offset: number,
    len: number
};

export interface SCsParseCallbacks {
    onParseError: (err: SCsParseError) => void;
    onAddIdtf: (idtf: string, loc: SCsTokenLocation) => void;
};

export enum SCsVisibility {
    Local,          // just in one file
    Global,         // in whole knowledge base, but without system idtf
    System          // system idtf
};
