import { IMbsMenuItem } from "projects/pe2mbs/ngx-mbs-menubar/src/lib/mbs-base-item";


export const FakeMenu: Array<IMbsMenuItem> = [
    {
        id: "0",
        caption: "Home",
        routerLink: "/",
        visible: true,
        icon: [ 'fas', "home" ]
    },
    {
        id: "1",
        caption: "Test CRUD",
        routerLink: "test-crud",
        visible: true,
        icon: [ 'fas', "landmark" ]
    },
    {
        id: "2",
        caption: "Editor",
        visible: true,
        icon: [ 'fas', "tools" ],
        items: [
            {
                id: "2.1",
                caption: "Editor",
                routerLink: "test-editor",
                visible: true,
                icon: [ 'fas', "trash-alt" ]
            },
            {
                id: "2.2",
                caption: "Diff editor",
                routerLink: "test-diff-editor",
                visible: true,
                icon: [ 'fas', "trash-alt" ]
            },
        ]
    },
    {
        id: "3",
        caption: "Extras",
        icon: [ 'fas', "sms" ],
        visible: true,
        items: [      
            {
                id: "3.1",
                caption: "Test tree",
                visible: true,
                routerLink: "test-tree",
                icon: [ 'fas', "trash" ]
            },
            {
                id: "3.2",
                caption: "Test split dual tree",
                visible: true,
                routerLink: "test-dual-tree",
                icon: [ 'fas', "trash" ]
            },
            {
                id: "3.3",
                caption: "Link 3.3 - google.es",
                visible: true,
                icon: [ 'fas', "sync" ],
                items: [
                    {
                        id: "3.3.1",
                        caption: "Link 3.3.1 - google.nl",
                        routerLink: "#https://www.google.nl",
                        visible: true,
                        icon: [ 'fas', "trash-alt" ]
                    },
                    {
                        id: "3.3.2",
                        caption: "Link 3.3.2 - google.com",
                        routerLink: "#https://www.google.com",
                        visible: true,
                        icon: [ 'fas', "trash" ]
                    }
                ]
            }

        ]
    },
    {
        id: "4",
        caption: "3D Scene at Sea",
        routerLink: "#https://davidmartinezros.com/Angular2/3d-scene-at-sea/",
        visible: true,
        icon: [ 'fas', "cubes" ]
    },
    {
        id: "5",
        caption: "About",
        routerLink: "#https://davidmartinezros.com/Angular2/3d-scene-at-sea/",
        visible: true,
        icon: [ 'fab', "google" ]
    }
];

