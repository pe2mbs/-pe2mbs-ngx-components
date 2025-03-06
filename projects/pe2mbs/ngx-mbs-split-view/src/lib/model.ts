import { MbsSplitViewComponent } from "./mbs-split-view.component";

export type MbsSplitDirection  = 'horizontal' | 'vertical';


export type MbsGutterAlignment = 'start' | 'end' | 'center';


export interface MbsDragEvent 
{
    readonly source: MbsSplitViewComponent;
    readonly sizes: ReadonlyArray<number>;
}
