# dsh-python-development

DSH（DeepSeek Harness）技能插件：**Python 开发模式**。

项目结构（src 布局/模块内聚/__all__ 公共接口）、类型安全（mypy/pyright/泛型/TypedDict）、打包发布（pyproject/uv）、性能优化与反模式清单。受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-python-development
```

## 触发方式

描述中包含"Python 项目 / 模块组织 / 类型标注 / mypy / 打包 / pyproject / uv / Python 性能"等关键词时自动触发。

## 能力

- src 布局与一概念一文件组织
- __all__ 显式公共接口
- 类型安全纪律（严格模式/泛型/TypedDict）
- pyproject/uv 打包与性能反模式排查

## 许可

MIT
