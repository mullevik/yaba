# yaba
Yet another budget app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Compiles and serves PWA locally
```
npm run build && npx http-server dist
```

### Deploy new build to GitHub Pages presented [here](https://mullevik.github.io/yaba/)
```
git checkout github-pages
git rebase -i master
npm run build
git add dist -f
git commit -m "New build for GitHub Pages"
git subtree push --prefix dist origin github-pages

# or use this to force push
git push origin `git subtree split --prefix dist github-pages`:github-pages --force)
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
