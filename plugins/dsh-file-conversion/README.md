# dsh-file-conversion

DSH（DeepSeek Harness）技能插件：**文件格式转换**。

PDF↔Word、HEIC→JPG、MP4→MP3、CSV→JSON、EPUB→MOBI 等常见路线；本地工具优先（ffmpeg/LibreOffice/Calibre/7-Zip），免费在线服务兜底（999 条路线，25MB 上限、5 次/分钟限流）。受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-file-conversion
```

## 触发方式

描述中包含"转换文件 / 转格式 / PDF 转 / HEIC / MP4 转 MP3 / CSV 转 JSON / EPUB 转"等关键词时自动触发。

## 能力

- 转换决策顺序（本地工具 → 在线服务 → URL 直转）
- 常见路线速查表与工具命令
- 限制与错误处理（体积/限流/隐私/下载过期）

## 许可

MIT
