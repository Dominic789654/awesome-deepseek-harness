---
name: cad-modeling
description: |
  参数化 CAD 建模：从自然语言规格/参考图/2D 图纸创建或修改
  参数化 CAD 模型——STEP 优先（build123d Python 源码生成或
  直接导入 STEP）、装配（source-level joints/mating）、
  几何检查与验证、导出 STL/3MF/GLB 次生工作流。
  当用户要 CAD 文件、STEP/STP、机械零件/装配/外壳/支架等时使用。
  受 earthtojake/text-to-cad（13k★）启发的中文原创精简版。
---

# CAD Modeling — 参数化 CAD 建模

从自然语言/参考图/2D 图纸创建或修改参数化 CAD 模型，产出验证过的 STEP。

## 何时用

- 用户要 CAD 文件 / STEP/STP / build123d 源码
- 机械零件：外壳/支架/夹具/孔/沉孔/槽/凸台/肋/圆角/倒角/壳体
- 装配与配合（source-level joints/mating）
- 从参考图或 2D 技术图纸还原设计意图
- 从 CAD 几何导出 STL/3MF/GLB

**不用**：纯概念艺术渲染、CAM 刀路、工程认证、FEA 结论、
建筑 BIM、自由手绘（除非也要 CAD 几何）。

## 1. 原则

- **STEP 为主制品**；STL/3MF/GLB 是从 STEP 分支的次生导出
- 两条入口：build123d Python 源码生成（默认，从零设计或修改
  生成模型时用）；直接导入现有 STEP（无生成器或用户明确目标）
- 装配：用 assembly helper + source-level joints + 命名 mating
  datum + 原生标签

## 2. 默认假设（除非用户另说）

- 单位：毫米；原点：按零件类型默认（主零件中心）
- 基准面 XY；挤出/向上轴 +Z
- 输出：闭合正体积实体（除非要曲面/构造几何）
- STEP 结构：一个有效实体 / 实体复合 / 带标签的装配复合

**注意**：这些是首轮建模默认，不是可制造性/公差/认证声明。

## 3. 工作流

1. 解析需求（自然语言/图/图纸 → 特征清单与约束）
2. 生成/导入几何（build123d 或 STEP 导入）
3. 几何检查：体积/相交/闭合性；选择器引用验证
4. 测量与配合核对（mating deltas）
5. 验证输出：STEP 有效、标签正确
6. 按需导出 STL/3MF/GLB（次生）

## 4. 自查清单

- [ ] STEP 为主制品（次生导出从 STEP 分支）
- [ ] 默认假设已声明（mm/XY/+Z/正体积）
- [ ] 几何检查（闭合/相交/体积）
- [ ] 装配用 source-level joints + 命名 datum
- [ ] 输出已验证（STEP 有效）
- [ ] 非制造/公差声明（默认是首轮建模）

## 边界

- 制造可行性/公差/认证需专业评估，本技能只管几何建模。
- 复杂装配与 2D 图纸还原：渐进迭代（一次一个特征/约束）。
