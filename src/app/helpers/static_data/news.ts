import { INewMessages } from "projects/pe2mbs/ngx-mbs-newsbar/src/public-api";


export const FakeNewsFeed: INewMessages = {
    enabled: false,
    messages: [
        {
            message: 'Normal RSS message',
            alert: false
        },
        {
            message: 'Alert RSS message',
            alert: true
        }
    ]
}