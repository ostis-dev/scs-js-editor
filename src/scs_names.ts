import { ScType } from '@ostis/sc-core';
import { SCsVisibility } from './scs_parser_data';

export namespace SCsNameUtils {
    const rIdtfLevel1 = /(sc_node|sc_link|sc_edge_dcommon|sc_edge_ucommon|sc_edge_main|sc_edge_access)#([a-zA-Z0-9_]*)$/;
    const rIsVar = /[.]{0,2}[_][a-zA-Z0-9_]+$/;
    const rIsUnnamed = /[.]{3}[_]?$/;
    
    export function IsLevel1(idtf: string) {
        return rIdtfLevel1.test(idtf);
    }

    /* Split scs-level 1 identifier to a parts.
     * If it can't be splitted, then returns null.
     * When identifier splitted, then returned array with two strings
     */
    export function SplitLevel1(idtf: string) : string[] {

        const match = rIdtfLevel1.exec(idtf);

        if (match && match.length > 1 && match.length < 4) {
            if (match.length == 3) {
                return [match[1], match[2]];
            }

            return [match[1], ''];
        }

        return null;
    }

    export function IsVar(idtf: string) : boolean {
        return rIsVar.test(idtf) || (idtf == '..._');
    }

    export function GetVisibility(idtf: string) : SCsVisibility {
        if (idtf.startsWith('..')) {
            return SCsVisibility.Local;
        } else if (idtf.startsWith('.')) {
            return SCsVisibility.Global;
        }

        return SCsVisibility.System;
    }

    export function IsUnnamed(idtf: string) : boolean {
        return rIsUnnamed.test(idtf);
    }

}
