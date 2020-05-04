# mall-vue

## 1.如何规范git commit提交
[如何规范git commit提交](https://www.cnblogs.com/jiaoshou/p/11190619.html)
```
在向·master 、 develop 、 bugfix 提交Merge Request 的时候做Code review.

1. 用Commitizen替代你的 git commit (使用工具生成符合规范的commit message)
    $ npm install --save-dev commitizen
    $ npm install commitizen -g 第三个命令不行的就全局安装下
    $ commitizen init cz-conventional-changelog --save-dev --save-exact
    feat：新增功能
    fix：bug 修复
    docs：文档更新
    ...

2. 使用commitlint工具检验commit格式是否符合规范
    ＃安装commitlint cli和传统配置
    npm install --save-dev @commitlint/{config-conventional,cli}
    ＃对于Windows：
    npm install --save-dev @commitlint/config-conventional @commitlint/cli

    ＃配置commitlint使用传统的config配置文件，在项目根目录生成就可以了 
    echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

## 2. vant
```
babel-plugin-import 是一款 babel 插件，它会在编译过程中将 import 的写法自动转换为按需引入的方式
npm i vant -S
npm i babel-plugin-import -D
```

## 3. 如何管理代码风格--较统一的代码风格利于阅读，也利于协作。
[使用ESLint+Prettier来统一前端代码风格](https://blog.csdn.net/weixin_34023863/article/details/89688514)
```
使用 eslint 约束基本风格和语法，使用 prettier 自动格式化你的代码。
```
## TodoMVC
```
本例是一个完全和规范一致的 TodoMVC 实现，只用了 120 行有效的 JavaScript (不包含注释和空行)。
```