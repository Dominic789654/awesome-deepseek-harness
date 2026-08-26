---
name: python-development
description: |
  Python 开发模式：项目结构（src 布局/模块内聚/__all__ 公共接口）、
  类型安全（mypy/pyright、泛型、TypedDict）、打包发布（pyproject/
  uv）、性能优化与常见反模式。
  当用户写 Python 项目、组织模块、做类型标注、打包发布或
  排查 Python 性能问题时使用。受 wshobson/agents（38k★ MIT）
  启发的中文原创精简版。
---

# Python Development — Python 开发模式

把 Python 项目组织好：清晰结构、显式接口、类型安全、规范打包。

## 何时用

- 从零建 Python 项目
- 重组混乱代码库
- 定义模块公共 API（__all__）
- 类型标注与静态检查
- 打包发布（pyproject/uv）
- Python 性能与反模式排查

## 1. 项目结构与模块组织

**标准布局**：

```
myproject/
├── src/myproject/        # 源码（src 布局，安装后 import 一致）
│   ├── services/  models/  api/
├── tests/
├── pyproject.toml
└── README.md
```

- **一概念一文件**：单一职责；文件超 300-500 行或多职责时拆分
- **显式接口**：用 `__all__` 声明公共 API，其余都是内部细节
- **浅目录优先**：只在真正子域时加深；命名约定全项目一致
- 测试放 `tests/`，与被测模块对应

## 2. 类型安全

- 全量类型标注 + mypy/pyright 严格模式
- 用泛型表达容器（`list[T]`）、`Optional`/`| None`、`TypedDict` 表达结构化数据
- 边界处校验（I/O、外部数据用断言/校验库）
- 类型是文档：公共 API 签名即契约，改动类型 = 破坏性变更

## 3. 打包与依赖（pyproject.toml / uv）

- `pyproject.toml` 统一配置（构建/依赖/工具）
- 依赖分 dev/main 组；版本范围明确（不裸 pin，不裸 latest）
- uv：极快安装/锁文件，替代 pip+venv 工作流
- 发布：版本语义化、构建产物验证（twine check 等）

## 4. 性能与反模式

- 先 profile 再优化（cProfile/py-spy）
- 热路径注意：循环内避免属性查找/重复计算；用内置容器与 itertools
- 反模式：可变默认参数、全局可变状态、大文件单模块、
  无异常处理裸调外部、忽略 `__init__.py` 导出
- 异步：asyncio 场景用 async 库，别混阻塞调用

## 5. 自查清单

- [ ] src 布局 + 一概念一文件 + __all__ 显式接口
- [ ] 全量类型标注，mypy/pyright 严格通过
- [ ] pyproject.toml 统一配置，依赖分组明确
- [ ] 性能问题已 profile 定位
- [ ] 无已知反模式（可变默认参数等）
- [ ] 测试目录与模块对应

## 边界

- 团队规模/项目大小决定严格度：脚本可轻量，库/服务要全量。
- Python 版本差异（3.11+ 语法）注意团队统一。
