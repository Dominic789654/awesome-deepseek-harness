# dsh-unit-test-author

单元测试编写技能插件 | Unit Test Author Skill Plugin

## 功能简介

为 DeepSeek Harness 提供专业的单元测试编写能力，支持多种语言和测试框架，能够编写全面、可维护的单元测试。

### 核心特性
- **行为测试优先**：测试可观察行为而非实现细节
- **全面边界覆盖**：系统性地覆盖边界情况和错误路径
- **表驱动测试**：支持表驱动测试模式提高可维护性
- **适当的模拟策略**：合理使用 mock、stub、fake、spy
- **AAA 结构**：Arrange-Act-Assert 清晰结构
- **跨语言支持**：pytest, Jest/Vitest, Go testing, JUnit, RSpec, xUnit, Rust

### 测试编写流程
1. 识别被测单元和其契约
2. 检测测试框架和约定
3. 使用边界情况清单枚举测试用例
4. 选择结构（表驱动或独立测试）
5. 规划测试替身策略
6. 编写具有描述性名称、AAA 布局、精确断言的测试
7. 添加错误路径和边界测试
8. 运行测试并验证

## 安装

### 从本地路径安装

```bash
cd E:\DeepSeek_Harness\plugins\dsh-unit-test-author
dsh plugin --profile web add .
```

### 从 git 仓库安装

```bash
dsh plugin --profile web add "github:your-username/dsh-unit-test-author#main"
```

## 使用方法

安装后，技能会自动注入到系统提示中。当用户提到以下关键词时自动触发：

- "write tests"
- "add unit tests"
- "improve coverage"
- "test this function/class/module"
- "add edge cases"
- "mock this dependency"
- "make these tests table-driven"
- "test error handling"

### 示例对话

**用户**：请为这个函数编写单元测试
**助手**：我会为你编写全面的单元测试。首先分析函数的契约和边界情况，然后使用 AAA 结构编写测试...

**用户**：让这些测试变成表驱动的
**助手**：我会将测试重构为表驱动模式，提高可维护性和可读性...

**用户**：模拟这个外部依赖
**助手**：我会使用适当的测试替身来模拟外部依赖，确保测试的确定性和速度...

## 测试框架支持

| 框架 | 语言 | 特点 |
|------|------|------|
| pytest | Python | 简洁语法，丰富的插件生态 |
| Jest/Vitest | JavaScript/TypeScript | 现代测试运行器，内置断言 |
| Go testing | Go | 内置测试包，表驱动测试 |
| JUnit | Java | 注解驱动，企业级标准 |
| RSpec | Ruby | 行为驱动开发风格 |
| xUnit | C#/.NET | 现代测试框架，多平台支持 |
| Rust | Rust | 内置测试，cargo test |

## 卸载

```bash
dsh plugin --profile web remove dsh-unit-test-author
```

## 许可证

MIT License