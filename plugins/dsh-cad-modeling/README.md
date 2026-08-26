# dsh-cad-modeling

DSH（DeepSeek Harness）技能插件：**参数化 CAD 建模**。

从自然语言规格 / 参考图 / 2D 图纸创建或修改参数化 CAD 模型：STEP 优先（build123d Python 源码生成或直接导入 STEP）、装配（source-level joints/mating datum）、几何检查与验证、导出 STL/3MF/GLB 次生工作流。受 [earthtojake/text-to-cad](https://github.com/earthtojake/text-to-cad)（13k★）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-cad-modeling
```

## 触发方式

描述中包含"CAD 模型 / STEP 文件 / 机械零件建模 / 外壳支架设计 / 3D 打印模型 / 从图片建模"等关键词时自动触发。

## 能力

- 自然语言 → 参数化 CAD 模型（build123d）
- 现有 STEP 直接导入与修改
- 装配与配合（source-level joints + 命名 datum）
- 几何检查：闭合性 / 相交 / 体积 / 选择器引用
- 导出 STL / 3MF / GLB（次生工作流）
- 默认假设：毫米、XY 基准面、+Z 向上、闭合正体积实体

## 许可

MIT
