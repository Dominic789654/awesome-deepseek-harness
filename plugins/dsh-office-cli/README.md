# dsh-office-cli

DSH（DeepSeek Harness）技能插件：**为 AI 设计的 Office 套件**。

单二进制、无 Office 安装、全平台控制 Word/Excel/PowerPoint：路径选择器（`/slide[1]/shape[1]`）精确定位元素、HTML 渲染引擎给 AI 眼睛（render→look→fix 闭环）、live preview 实时反馈循环、outline/HTML/JSON 多视图、resident session 持久会话。受 [iOfficeAI/OfficeCLI](https://github.com/iOfficeAI/OfficeCLI)（28.8k★）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-office-cli
```

## 触发方式

描述中包含"创建/编辑 Office 文档 / Word / Excel / PowerPoint / 演示文稿 / 报表 / 渲染预览"等关键词时自动触发。

## 能力

- 路径选择器精确定位元素
- HTML 渲染引擎（AI 的眼睛）
- live preview 实时反馈
- outline/HTML/JSON 多视图
- resident session 持久会话
- 单二进制零依赖

## 许可

MIT
