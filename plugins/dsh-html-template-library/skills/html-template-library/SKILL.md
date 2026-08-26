---
name: html-template-library
description: |
  HTML 模板库方法论：34 个设计系统模板（Soft Editorial/Neo-Grid
  Bold/Stencil & Tablet/Sakura Chroma/Vellum/Monochrome…）——
  agent 读 index.json 匹配用户 brief、克隆选定模板、适配内容；
  每个模板 3 张多布局截图 + 元数据 + 可复用设计系统（字体/配色/
  纹理）。当用户要挑选设计系统、自动克隆模板做 HTML 幻灯片时使用。
  受 zarazhangrui/beautiful-html-templates（4k★）启发的中文原创
  精简版。
---

# HTML Template Library — 可复用模板库方法论

34 个 HTML 幻灯片设计系统的库：任何 coding agent 都能挑对的模板，
替用户自动做出漂亮的 deck。

## 何时用

- 需要设计系统/视觉风格的 HTML 幻灯片
- 用户 brief 明确但不知选哪个模板
- 自动克隆模板适配内容

## 1. 核心操作（AGENTS.md 手册）

1. **读 index.json** — 模板清单与元数据
2. **匹配 brief** — 把用户需求映射到合适模板
3. **克隆模板** — 复制选定的模板目录
4. **适配内容** — 换入用户内容，保持设计系统

## 2. 34 个设计系统（示例）

- **Soft Editorial** — Cormorant Garamond 衬线 + 暖纸 + 鼠尾草/腮红/柠檬
- **Editorial Forest** — 森林绿 + 灰粉 + 暖奶油（季度回顾美学）
- **Pin & Paper** — 黄纸 + 安全别针插画 + 手写 Caveat + 纸纹
- **Sakura Chroma** — 复古日式卡带美学（奶油纸/彩虹缎带/粗体）
- **Stencil & Tablet** — 骨纸 + 镂空标题 + 六色土色（考古×品牌）
- **Cobalt Grid** — 电钴蓝斜体衬线 + 图纸画布 + 像素故障装饰
- **Vellum** — 深海军蓝 + 暖黄斜体 Cormorant + 尘土青（学术）
- **Neo-Grid Bold** — 编辑新粗野主义 + 霓虹黄点缀
- **Monochrome** — 象牙账本纸 + 纯黑字（Lora/Jost，无彩色）

## 3. 每个模板的交付物

- 3 张截图（封面/中页/后页）展示不同布局下的表现
- 元数据（风格描述/适用场景）
- 完整 HTML + 可复用设计系统

## 4. 自查清单

- [ ] 读 index.json 选型
- [ ] brief 匹配正确模板（气质/用途）
- [ ] 克隆 + 适配（保留设计系统）
- [ ] 内容替换不破坏视觉
- [ ] 多布局验证（封面/中页/后页）

## 边界

- 模板是弹药不是教条——匹配 brief 而非硬套。
- 适配时保持设计 token（字体/配色/纹理）一致性。
