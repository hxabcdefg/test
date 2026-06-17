# 实战教学站

这是一个多页静态教学网站，不再只是做概念介绍。首页展示真实用例卡片，点击每张卡片会进入对应的详细教学页面。

## 本地预览

直接用浏览器打开 `index.html`，或者启动本地服务：

```bash
python3 -m http.server 8080
```

然后访问：

```text
http://localhost:8080
```

## 页面结构

- `index.html`：真实用例入口、分类筛选、学习路径、使用说明。
- `pages/landing-page.html`：从一句需求做出活动落地页。
- `pages/design-to-page.html`：把设计稿内容整理成可开发页面。
- `pages/refund-troubleshooting.html`：用户说退款失败时怎么排查。
- `pages/feedback-priority.html`：把用户反馈整理成优先级清单。
- `pages/retention-dashboard.html`：做一个看得懂的用户留存看板。
- `pages/release-checklist.html`：上线前写一份人人能用的测试清单。

## 这次改进重点

- 把抽象介绍改成真实业务用例。
- 每个用例都可以点击进入独立详情页。
- 详情页包含真实场景、准备材料、操作步骤、示例模板和检查清单。
- 首页支持按“网页制作、客服运营、数据分析、质量检查”筛选。
- 文案尽量使用普通人能看懂的表达，减少难懂术语。
