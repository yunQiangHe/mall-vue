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
style：不影响程序逻辑的代码修改(修改空白字符，格式缩进，补全缺失的分号等，没有改变代码逻辑)
refactor：重构代码(既没有新增功能，也没有修复 bug)
perf：性能, 体验优化
test：新增测试用例或是更新现有测试
build：主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
ci：主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交
chore：不属于以上类型的其他类，比如构建流程, 依赖管理
revert：回滚某个更早之前的提交

2. 使用commitlint工具检验commit格式是否符合规范
＃安装commitlint cli和传统配置
npm install --save-dev @commitlint/{config-conventional,cli}
＃对于Windows：
npm install --save-dev @commitlint/config-conventional @commitlint/cli

＃配置commitlint使用传统的config配置文件，在项目根目录生成就可以了 
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
3.
```