# description 写法示例

## 好例

- "Extracts text and tables from PDF files, including scanned documents via OCR. Use when the user mentions PDFs, scanned files, or asks to convert a document to text."
- "Interviews the user relentlessly about a plan until reaching shared understanding. Use when the user wants to stress-test a plan or says 'grill me'."
- "创建并维护项目周报。当用户提到周报、weekly report、汇报时使用，支持从 git 记录和任务列表自动汇总。"

## 差例

- "Helps with PDFs" — 太泛，无法判断何时触发。
- "A skill about things" — 无信息量。
- "周报技能" — 缺触发场景。

## 公式

```
<做什么，动词开头> + <产出/效果> + Use when <触发场景，含关键词>。
```

## 迭代

按真实使用反馈迭代 description：如果 agent 该用时没用，说明触发词不够；
如果误触发，说明范围太宽。每次只调一处，小步验证。
