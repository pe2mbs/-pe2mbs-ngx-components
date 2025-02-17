

export interface MbsMenuItem 
{
    id:         string;
    caption:    string;
    icon:       string;
    link?:      string | undefined;   
    children?:  Array<MbsMenuItem> | undefined;

}


export class MbsMenuItem implements MbsMenuItem
{           
    constructor( id: string, caption: string, icon: string, link: string | undefined, 
                 children: Array<MbsMenuItem> | undefined )
    {
        this.id       = id;
        this.caption  = caption;
        this.icon     = icon;
        this.link     = link;   
        this.children = children;
        return;
    }
}
