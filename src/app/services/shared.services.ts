import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    constructor() { }
    toast(message) {
        const div = document.createElement('div');
        div.id = "snackbar";
        div.innerText = message;
        document.getElementsByTagName('body')[0].appendChild(div);
        document.getElementById("snackbar").style.zIndex = "9999";
        div.className = "show";
        setTimeout(() => {
            div.className = "hide";
            document.getElementById("snackbar").remove();
        }, 3000);

    }
}