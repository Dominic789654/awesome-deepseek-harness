---
name: blockchain-web3
description: |
  Web3 与智能合约安全：Solidity 漏洞预防（重入/溢出/访问控制）、
  CEI 模式、DeFi 协议设计、审计准备、web3 测试。
  当用户写智能合约、审计合约、做 DeFi 协议、防止重入攻击或
  准备合约审计时使用。受 wshobson/agents（38k★ MIT）启发的中文原创精简版。
---

# Blockchain Web3 — Web3 与智能合约安全

写安全的 Solidity：防常见漏洞、用 CEI 模式、为专业审计做准备。

## 何时用

- 编写安全智能合约
- 审计现有合约漏洞
- 实现安全 DeFi 协议
- 防重入、溢出、访问控制问题
- 优化 gas 同时保安全
- 为专业审计做准备
- 理解常见攻击向量

## 1. 常见漏洞与预防

| 漏洞 | 预防 |
|---|---|
| 重入（Reentrancy） | CEI 模式 + ReentrancyGuard |
| 整数溢出/下溢 | Solidity 0.8+ 自动检查 / SafeMath |
| 访问控制缺失 | Ownable/角色权限，默认拒绝 |
| 委托调用漏洞 | 校验目标地址，防 delegatecall 劫持 |
| 预言机操纵 | 用去中心化/时间加权价格 |
| 闪电贷攻击 | 状态更新先行 + 外部调用后置 |

## 2. CEI 模式（防重入核心）

```
// CHECKS     — 先校验（余额/权限/状态）
require(amount <= balances[msg.sender], "Insufficient balance");

// EFFECTS    — 再更新状态
balances[msg.sender] -= amount;

// INTERACTIONS — 最后做外部调用
(bool success, ) = msg.sender.call{value: amount}("");
require(success, "Transfer failed");
```

顺序不可颠倒：外部调用前必须先完成状态更新。

## 3. DeFi 协议设计要点

- 池/金库资金安全：提款限额、暂停开关（circuit breaker）
- 清算逻辑：激励正确、防抢先交易（MEV）
- 治理代币：投票权、时间锁（timelock）防恶意提案
- 复合收益/再平衡：滑点与无常损失管理

## 4. 审计准备

- 合约文档化：`@title/@dev/@notice/@param`（审计师靠注释理解意图）
- 附测试：覆盖正常路径 + 攻击路径（重入/溢出/越权都要有反例测试）
- 用专业工具扫描 + 人工审计结合

## 5. 测试要点（Hardhat 示例）

- 重入攻击测试：攻击合约尝试重入 → 断言 revert 且余额不变
- 溢出测试：MaxUint256 转账 → 断言 revert
- 访问控制测试：非 owner 提款 → 断言 revert("Ownable: ...")

## 6. 自查清单

- [ ] 所有外部调用遵循 CEI（状态先更新）
- [ ] 重入/溢出/越权都有测试反例
- [ ] 权限默认拒绝，关键操作有时间锁
- [ ] 价格源防操纵
- [ ] 合约文档化完整（可交审计）
- [ ] 专业审计前自检通过

## 边界

- 智能合约不可变、资金风险高：重大协议务必专业审计 + bug 赏金。
- 合规（证券法/反洗钱）因司法辖区而异，需要法律确认。
