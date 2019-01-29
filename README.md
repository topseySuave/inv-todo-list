### Invisible Todo Application Demo

Visit app [https://build-h1jvx220l.now.sh](https://build-h1jvx220l.now.sh)

![](https://github.com/topseySuave/inv-todo-list/blob/setup-app/public/Screen%20Shot%202019-01-16%20at%204.49.23%20PM.png)

## to install and run first clone this repo

```
git clone https://github.com/topseySuave/inv-todo-list.git
```
with `http` or 

```
git clone git@github.com:topseySuave/inv-todo-list.git
```
with `ssh`.

```
cd into the directory `cd int-todo-list` and run `yarn install`
```

After installing, you should be able to run the application by simply running this command
```
yarn start
```

and Enjoy!.

### To Deploy
I used `now` for this app, and the way to go about it is to first install `now-cli` if you don't have that already
```
npm install -g now
```

and login
```
now login <email>
```

and then follow instructions. When you have successfully logged in now let's deploy by just running
```
yarn deploy
```

I set up a script in package file `"deploy": "yarn build && cd build && now"` which will first build the application
and then go into the build folder and run `now` to deploy and create a url for the deployed app.

Thanks and have a nice day.
