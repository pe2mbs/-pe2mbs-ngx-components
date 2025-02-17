import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class TreeDraggedElement 
{
    _draggedElement: any = null;

    public set( draggedElement: any ): void 
    {
        this._draggedElement = draggedElement;
    }

    public get(): any 
    {
        return ( this._draggedElement ); 
    }

    public isDragging(): boolean 
    {
        return !!this.get();
    }
}
