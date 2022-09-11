# connect with aarmy

Connect with aarmy platform ang get authorization to get fitness sessions and videos

## Get started

```
npm i @aarmy/connect
```

OR

```
yarn add @aarmy/connect
```

## Usage

```
// ...
import aarmy, { isAlreadyOpened} from "@aarmy/connect";


// ...


const openWindow = () => {
  /**
   * this response with return if window in the process to prevent multiple windows
   * @params {boolean} opened : if there any window or popup still open
   * @params {string} message : message if window still open you can use your own message as well
   */
    const res= isAlreadyOpened()
      if (res.opened) {
        return;
      }
    const url = 'http://aarmy.com/auth/authorize?client_id={cliend_id}'
    aarmy.connect(url).then(data=>{
      console.log('data', data);
      // whatever do when aarmy user authorized linking or not
    }).catch(err=>{
      console.log('err', err);
    })
}

```
