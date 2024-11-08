---
slug: vscode-img
title: VSCode copy image
authors: [jason]
tags: [Tool]
---

Auto generate image content in md file when copy or paste image in vscode.

`![Alt text](image.png)`

<!--truncate-->

For example, copy a image and paste in vscode, the image content will be:

```
![Alt text](image.png)
```

## Customize the image directory

You can customize the image directory in the setting.json `markdown.copyFiles.destination`.

```
"markdown.copyFiles.destination": {
  "/docs/api/**/*": "${documentWorkspaceFolder}/docs/images/"
}
```

- `${documentDirName}` — Absolute parent directory path of the Markdown document, e.g. /Users/me/myProject/docs.
- `${documentRelativeDirName}` — Relative parent directory path of the Markdown document, e.g. docs. This is the same as `${documentDirName}` if the file is not part of a workspace.
- `${documentFileName}` — The full filename of the Markdown document, e.g. README.md.
- `${documentBaseName}` — The basename of the Markdown document, e.g. README.
- `${documentExtName}` — The extension of the Markdown document, e.g. md.
- `${documentFilePath}` — Absolute path of the Markdown document, e.g. /Users/me/myProject/docs/README.md.
- `${documentRelativeFilePath}` — Relative path of the Markdown document, e.g. docs/README.md. This is the same as `${documentFilePath}` if the file is not part of a workspace.
- `${documentWorkspaceFolder}` — The workspace folder for the Markdown document, e.g. /Users/me/myProject. This is the same as `${documentDirName}` if the file is not part of a workspace.
- `${fileName}` — The file name of the dropped file, e.g. image.png.
- `${fileExtName}` — The extension of the dropped file, e.g. png.

### The same level directory with the Markdown document

```
"markdown.copyFiles.destination": {
  "**/*": "${documentDirName}/${documentBaseName}/${documentBaseName}-${fileExtName}"
  // "/docs/api/**/*": "images/${documentBaseName}-${fileExtName}"
}
```

### The static directory

```
"markdown.copyFiles.destination": {
  "**/*": "${documentWorkspaceFolder}/${documentBaseName}-${fileExtName}"
  // "**/*": "${documentWorkspaceFolder}/images/${documentBaseName}-${fileExtName}"
}
```
