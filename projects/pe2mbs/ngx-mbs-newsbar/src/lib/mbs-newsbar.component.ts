import { Component, ViewEncapsulation, ElementRef, Renderer2, 
         ViewChild, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { INewMessage, INewMessages, MbsNewsService } from './mbs-newsbar.service';


export type ETickerDirection = 'left' | 'right' | 'alternate';


@Component( {
    selector: 'mbs-newsbar',
    templateUrl: './mbs-newsbar.component.html',
    styleUrls: [ './mbs-newsbar.scss' ],
    encapsulation: ViewEncapsulation.None
} )
export class MbsNewsbarComponent implements OnDestroy, OnInit
{
    @ViewChild( 'ticker' )     ticker!:     ElementRef;
    @ViewChild( 'content' )    contentRef!: ElementRef;

    /**
    *     Defines direction of ticker content. [left, right, alternate].
    *     type: string
    */
    @Input() direction: ETickerDirection = 'left';

    /**
    *     Defines speed of ticker content. [time in seconds, miliseconds].
    *     type: time in string
    */
    @Input() speed = '30s';

    /**
    *     Defines whether ticker stop on hover. [true, false].
    *     type: boolean
    */
    @Input() stopOnHover = true;

    /**
    *     Set ticker animation transition play state [true, false].
    *     type: boolean
    */
    @Input() playState = true;

    /**
    *     Set ticker update interval. 
    *     type: number
    */
    @Input() updateInterval: number = 300;

    /**
    *     Internal class variables.
    * 
    */
    private directions: any = { left: 'normal', right: 'reverse', alternate: 'alternate' };
    private children: Array<any> = new Array<any>();
    private sub!: Subscription;
    private timer: any;

    /**
    *    Constructor 
    *  
    *    @param renderer         Angular renderer2 class injectable.
    * 
    *    @returns                nothing 
    */
    constructor( private renderer: Renderer2, private newsService: MbsNewsService ) 
    {   
        return;
    }   
    
    /**
    *    This destroys the subscriber and cancel the interval timer.
    * 
    *    @returns                nothing
    */
    public ngOnDestroy(): void
    {
        clearInterval( this.timer );
        this.sub.unsubscribe();
        return;
    }

    /**
    *    This initialize the interval timer.
    * 
    *    @returns                nothing
    */
    public ngOnInit(): void
    {
        this.update();
        this.timer = setInterval( () => { 
            this.sub.unsubscribe();
            this.update();
        }, this.updateInterval * 1000 );
        return;
    }
   
    /**
    *    Internal update function called by the interval timer.
    * 
    *    @returns                nothing
    */
    private update(): void 
    {
        this.sub = this.newsService.getNews().subscribe( (news: INewMessages) => {
            // console.log( 'update', news );
            if ( this.children.length > 0 )
            {
                this.children.forEach( (element:any) => {
                    this.renderer.removeChild( this.contentRef.nativeElement, element );
                    
                } );
                this.children = new Array<any>();
            }
            this.renderer.setStyle( this.ticker.nativeElement, 'display', news.enabled ? 'block' : 'none' );
            if ( news.enabled && news.messages )
            {
                news.messages.forEach( (message: INewMessage) => {
                    const node = this.renderer.createElement( 'span' );                       
                    this.children.push( node );
                    this.renderer.appendChild( node, this.renderer.createText( message.message ) )
                    this.renderer.addClass( node, 'ticker-message' );
                    this.renderer.addClass( node, (message.alert ? 'ticker-alert' : 'ticker-normal' ) );
                    this.renderer.appendChild( this.contentRef.nativeElement, node );

                } );
                this.renderer.setStyle( this.contentRef.nativeElement, 'animation-direction', this.directions[ this.direction ] );
                this.renderer.setStyle( this.contentRef.nativeElement, 'animation-duration', this.speed );
                this.renderer.setStyle( this.contentRef.nativeElement, 'animation-timing-function', 'linear' );
            }
        } );
        return;
    }
}
