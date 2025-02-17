import { Directive, ViewContainerRef, TemplateRef, OnInit, OnDestroy, Input, EmbeddedViewRef } from '@angular/core';
import { autorun } from 'mobx';


@Directive({ 
    selector: '[treeMobxAutorun]' 
})
export class TreeMobxAutorunDirective implements OnInit, OnDestroy 
{
    protected templateBindings = {};
    protected dispose: any;
    protected view!: EmbeddedViewRef<any>;
    @Input() treeMobxAutorun: any;

    constructor( protected templateRef: TemplateRef<any>, protected viewContainer: ViewContainerRef ) 
    {
        return;
    }

    public ngOnInit(): void
    {
        this.view = this.viewContainer.createEmbeddedView(this.templateRef);
        if ( this.dispose ) 
        {
            this.dispose();
        }

        if ( this.shouldDetach() ) 
        {
            this.view.detach();
        }
        this.autoDetect( this.view );
        return;
    }

    public shouldDetach(): boolean
    {
        return ( this.treeMobxAutorun && this.treeMobxAutorun.detach );
    }

    public autoDetect( view: EmbeddedViewRef<any> ): void
    {
        this.dispose = autorun( () => view.detectChanges() );
        return;
    }

    public ngOnDestroy(): void 
    {
        if (this.dispose) 
        {
            this.dispose();
        }
        return;
    }
}
