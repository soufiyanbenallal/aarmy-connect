export interface IWindowOpenOptions {
  width: number,
  height:number
}
export interface IisAlreadyOpened {
  opened: boolean,
  message: string 
}
export type ICallback =  (resolve: (arg0: any) => void, reject: (arg0: string) => void) => {}
 
var aarmyWindow: Window | null;
const openWindow = (url: string ,options: IWindowOpenOptions | {} = {}): Window | null  => {
  const {height:h, width: w} = options as IWindowOpenOptions
    var width = w || 600, height = h|| 600
    var left = (window.innerWidth / 2) - (width / 2)
    var top= (window.innerHeight / 2) - (height / 2)
    const params = new URLSearchParams(url || location.href);
    if (!params.has('redirect_to')) {
      url += `&redirect_to=${location.origin}`
    }
    url += `&popup=1`
    return window.open(url, '',       
          `toolbar=no, location=no, directories=no, status=no, menubar=no, 
          scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
          height=${height}, top=${top}, left=${left}`
        )
}

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
export const connect = (url: string ,options: IWindowOpenOptions | {} = {}): Promise<PromiseConstructor> => {  
      aarmyWindow = openWindow(url, options)  
      let data: any= null
      // checkPopup(aarmyWindow)
      window.addEventListener("message",(event): void => {
        data = event.data
      }, false);
      return new Promise((resolve: (arg0: any) => void, reject: (arg0: any) => void) => {
        const check = setInterval(() => {
          if (!aarmyWindow || aarmyWindow.closed || aarmyWindow.closed === undefined) {
            clearInterval(check)
            data= 'cancled'
            return resolve({
              status: "cancled",
              data: {
                message: 'cancled'
              }
            })
          } else if (aarmyWindow && data) {
            clearInterval(check)
            !aarmyWindow.closed && aarmyWindow.close()
            window.removeEventListener('message', ()=>{})
            return resolve({
              status: "success",
              data: data
            })
          }
        }, 450)
      })
}

export const isAlreadyOpened = (): IisAlreadyOpened=> {

  let opened = false
  if (aarmyWindow && aarmyWindow.closed=== false ) {
    opened =  true
  }
  const message = opened ? 'You still have a popup opening': 'No popup is opening'
  return {
    opened: opened,
    message
  }
}

export default {
  connect,
  isAlreadyOpened
}