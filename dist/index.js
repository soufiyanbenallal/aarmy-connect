"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAlreadyOpened = exports.connect = void 0;
var aarmyWindow;
const openWindow = (url, options = {}) => {
    const { height: h, width: w } = options;
    var width = w || 600, height = h || 600;
    var left = (window.innerWidth / 2) - (width / 2);
    var top = (window.innerHeight / 2) - (height / 2);
    const params = new URLSearchParams(url || location.href);
    if (!params.has('redirect_to')) {
        url += `&redirect_to=${location.origin}`;
    }
    url += `&popup=1`;
    return window.open(url, '', `toolbar=no, location=no, directories=no, status=no, menubar=no, 
          scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
          height=${height}, top=${top}, left=${left}`);
};
// const checkPopup = (popup: Window | null)=> {
//     const check = setInterval(() => {
//       if (!popup || popup.closed || popup.closed === undefined) {
//         clearInterval(check)
//       }
//     }, 200)
//   }
// Kicks off the processes of opening the popup on the server and listening 
// to the popup. It also disables the login button so the user can not 
// attempt to login to the provider twice.
const connect = (url, options = {}) => {
    aarmyWindow = openWindow(url, options);
    let data = null;
    // checkPopup(aarmyWindow)
    window.addEventListener("message", (event) => {
        data = event.data;
    }, false);
    return new Promise((resolve, reject) => {
        const check = setInterval(() => {
            if (!aarmyWindow || aarmyWindow.closed || aarmyWindow.closed === undefined) {
                clearInterval(check);
                data = 'cancled';
                return resolve({
                    status: "cancled",
                    data: {
                        message: 'cancled'
                    }
                });
            }
            else if (aarmyWindow && data) {
                clearInterval(check);
                !aarmyWindow.closed && aarmyWindow.close();
                window.removeEventListener('message', () => { });
                return resolve({
                    status: "success",
                    data: data
                });
            }
        }, 450);
    });
};
exports.connect = connect;
const isAlreadyOpened = () => {
    let opened = false;
    if (aarmyWindow && aarmyWindow.closed === false) {
        opened = true;
    }
    const message = opened ? 'You still have a popup opening' : 'No popup is opening';
    return {
        opened: opened,
        message
    };
};
exports.isAlreadyOpened = isAlreadyOpened;
exports.default = {
    connect: exports.connect,
    isAlreadyOpened: exports.isAlreadyOpened
};
//# sourceMappingURL=index.js.map