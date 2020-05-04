# mall-vue

## 1.如何规范git commit提交
[如何规范git commit提交](https://www.cnblogs.com/jiaoshou/p/11190619.html)
```
在向·master 、 develop 、 bugfix 提交Merge Request 的时候做Code review.

用Commitizen替代你的 git commit (使用工具生成符合规范的commit message)

$ npm install --save-dev commitizen
$ npm install commitizen -g 第三个命令不行的就全局安装下
$ commitizen init cz-conventional-changelog --save-dev --save-exact

```