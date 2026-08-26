---
name: scientific-research
description: |
  科学技能包：把 agent 变成桌面上的 AI 科学家——100+ 科学数据库
  查询（PubChem/ChEMBL/UniProt/COSMIC/ClinicalTrials.gov/FRED…）、
  文献综述与证据有界假设生成、实验方案设计与预算、同行评审回复、
  基金写作、分析方法验证（ICH Q2/USP/CLSI）、论文级图表与证据可
  溯源写作。当用户要科研/文献/实验方案/数据库查询时使用。
  受 K-Dense-AI/scientific-agent-skills（33.9k★ MIT）启发的中文
  原创精简版。
---

# Scientific Research — 科学技能包

把 AI agent 变成研究助手：跨生物/化学/医学/材料/地球科学执行
复杂多步科研工作流。

## 何时用

- 文献综述与假设生成（grounded hypotheses）
- 科学数据库查询（确定性、带来源）
- 实验方案设计 + 预算
- 同行评审回复 / 基金写作 / 论文写作

## 1. 100+ 数据库统一查询

- 单一 database-lookup 技能：确定性、带来源（provenance-rich）
  访问 78 个公共库：PubChem / ChEMBL / UniProt / COSMIC /
  ClinicalTrials.gov / FRED / USPTO …
- 专用技能：DepMap / Imaging Data Commons / PrimeKG / NCATS ARAX /
  美国财政部数据 / Hugging Science / OneKGPd / Genomic Intelligence
- 多库包：BioServices（~40 生物信息服务）/ BioPython（39 个 NCBI
  子库）/ gget（20+ 基因组库）

## 2. 研究核心工作流

- **文献综述 + 假设生成**：搜索文献 → 生成有证据支撑的假设
- **证据有界**（evidence-bounded）：候选假设必须被证据约束，
  不凭空猜测
- **实验方案**：把计划实验变成带成本的书面方案
- **同行评审**：逐条回应审稿意见（point-by-point rebuttal）
- **论文级图表**：出版质量图形、示意图、海报（无宏 PPTX）

## 3. 关键原则

- 每个技能带：文档 + 代码示例 + 用例 + 集成指南 + 测试套件
- 版本感知的包指导（RDKit/Scanpy/PyTorch Lightning/pydicom/
  pymatgen/Qiskit…）——agent 仍可用任意 Python 包，这些是
  预先文档化的可靠路径
- 安全边界：不替代诊断/治疗/认证决策——证据准备供合格审阅

## 4. 自查清单

- [ ] 数据库查询带来源（provenance）
- [ ] 假设有证据支撑（evidence-bounded）
- [ ] 实验方案含成本预算
- [ ] 写作可溯源（line-pinned 引用）
- [ ] 方法验证按 ICH/USP/CLSI 框架（供审阅非认证）
- [ ] 图表出版级质量

## 边界

- 研究辅助非临床决策：不提供患者级诊断/治疗建议。
- 验证与合规产物"供合格审阅"，永不作为认证/放行结论。
