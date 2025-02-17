import { Injectable, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";


@Injectable()
export class NgxSubscribers implements OnDestroy 
{
    private obSubs = Array<Subscription>();
    constructor()
    {
        return;
    }

    public regSub( subscription: Subscription | undefined | null ): void
    {
        if ( subscription )
        {
            this.obSubs.push( subscription );
        }
        return;   
    }

    public unregSub( subscription: Subscription ): void
    {
        this.obSubs.splice( this.obSubs.indexOf( subscription ), 1 );
        return;
    }
    
    /**
    * @deprecated Old format call are now replaced by regSub()
    */
    public registerSubscription( subscription: Subscription | undefined | null ): void
    {
        if ( subscription )
        {
            this.obSubs.push( subscription );
        }
        return;
    }

    /**
    * @deprecated Old format call are now replaced by unregSub()
    */ 
    public unregisterSubscription( subscription: Subscription ): void
    {
        this.obSubs.splice( this.obSubs.indexOf( subscription ), 1 );
        return;
    }

    public ngOnDestroy(): void
    {
        for ( const subscription of this.obSubs )
        {
            subscription.unsubscribe();
        }
        return;
    }

}