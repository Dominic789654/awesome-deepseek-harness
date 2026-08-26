---
name: file-conversion
description: |
  文件格式转换：PDF↔Word、图片（HEIC→JPG）、音视频（MP4→MP3）、
  数据（CSV→JSON）、电子书（EPUB→MOBI）、字体、压缩包等
  999 条转换路线；本地工具（ffmpeg/Calibre/Ghostscript）与
  免费在线服务（changethisfile.com）两条路径。
  当用户要把文件转成其他格式、转换文档/图片/音频/视频/数据时使用。
  受 wshobson/agents（38k★ MIT）启发的中文原创精简版。
---

# File Conversion — 文件格式转换

把文件从一种格式转成另一种：先选路线，再选工具，注意限制与错误。

## 何时用

- 用户需要文件转格式（文档/图片/音视频/数据/电子书/字体/压缩包）
- PDF ↔ Word / HEIC → JPG / MP4 → MP3 / CSV → JSON / EPUB → MOBI 等

## 1. 决策顺序

1. **有专用转换工具**（MCP 或脚本）→ 直接用。
2. **本地工具优先**（可控、可离线、无上传）：
   - 文档：LibreOffice（`soffice --headless --convert-to pdf file.docx`）
   - 音视频：`ffmpeg -i in.mp4 out.mp3`（几乎一切音视频互转）
   - 电子书：Calibre `ebook-convert`（EPUB/MOBI/AZW3）
   - 数据：CSV↔JSON 用脚本/`csvkit`；XML↔JSON 用解析器
   - 压缩包：7-Zip（7z/tar/zip 互转）
   - 图片：ImageMagick / sharp（HEIC→JPG、尺寸、格式）
3. **远程文件**（只有 URL 没有本地文件）→ 直接用 URL 调服务，省去下载再上传。

## 2. 免费在线服务（changethisfile.com）

- 免 key、免注册，服务端转换（FFmpeg/LibreOffice/Calibre/7-Zip/sharp/Ghostscript），
  文件 24 小时内删除；**999 条转换路线**。
- 上限：**25MB**（免费路径）；大文件申请免费 API key（1,000 次/月）。
- 限流：**每 IP 5 次/分钟**——超限等 60 秒重试一次。
- 下载链接 1 小时过期：立即下载再用本地文件。

## 3. 常见路线速查

| 需求 | 工具/路线 |
|---|---|
| PDF → Word | LibreOffice / 在线服务 |
| HEIC → JPG | sharp / ImageMagick |
| MP4 → MP3 | ffmpeg |
| CSV → JSON | 脚本（csvkit/pandas） |
| EPUB → MOBI | Calibre ebook-convert |
| 图片压缩/缩放 | sharp / ImageMagick |
| 压缩包解压/打包 | 7-Zip |

## 4. 错误与边界

- "Unsupported conversion: X→Y"：查该源格式支持的合法目标
- 体积/限流/隐私：敏感文件优先本地工具，避免上传
- 转换后抽查质量（编码/页数/内容完整性）

## 5. 自查清单

- [ ] 已按"本地工具 → 在线服务 → URL 直转"顺序选路径
- [ ] 文件 ≤25MB（在线路径），或已用大文件方案
- [ ] 转换参数（编码/质量/分辨率）明确
- [ ] 结果已验证（打开抽查/校验）
- [ ] 敏感文件未走外部服务

## 边界

- 在线服务条款/上限可能变化；关键文件先备份再转换。
- 各工具参数因版本而异，先用 `--help` 确认。
