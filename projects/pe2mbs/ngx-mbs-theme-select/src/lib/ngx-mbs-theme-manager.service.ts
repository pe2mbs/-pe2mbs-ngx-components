import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class MbsThemeManagerService 
{
    /**
     * Set the stylesheet with the specified key.
     */
    public setStyle( key: string, href: string ): void
    {
        this.getLinkElementForKey( key ).setAttribute( 'href', href );
        return;
    }
    
    /**
     * Remove the stylesheet with the specified key.
     */
    public removeStyle( key: string ): void
    {
        const existingLinkElement = this.getExistingLinkElementByKey( key );
        if ( existingLinkElement ) 
        {
            document.head.removeChild( existingLinkElement );
        }
        return;
    }
    
    public getLinkElementForKey( key: string ): Element 
    {
        return ( this.getExistingLinkElementByKey( key ) || this.createLinkElementWithKey( key ) );
    }
    
    public getExistingLinkElementByKey(key: string): Element 
    {
        return ( document.head.querySelector( `link[rel="stylesheet"].${ this.getClassNameForKey( key ) }`) as Element );
    }
    
    public createLinkElementWithKey( key: string ): Element 
    {
        const linkEl = document.createElement( 'link' );
        linkEl.setAttribute( 'rel', 'stylesheet' );
        linkEl.classList.add( this.getClassNameForKey( key ) );
        document.head.appendChild( linkEl );
        return ( linkEl );
    }
    
    public getClassNameForKey( key: string ): string 
    {
        return ( `style-manager-${ key }` );
    }
}
