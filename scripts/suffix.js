const fs = require("fs");
const path = require("path");

// 指定目录路径
const directoryPath = "C:\\code\\harmonyOS_bilibili\\website\\build";

// 匹配的路径格式
const matchPatterns = ["/docs", "/blog", "/en"];

// 修改函数，将指定格式的内容追加 '/index.html'
function modifyFile(filePath) {
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }

    // 匹配指定格式的内容，并在末尾追加 '/index.html'
    matchPatterns.forEach((pattern) => {
      console.log("pattern: ", pattern);
      const regex = new RegExp(`href="${pattern}(.*?)"`, "g");
      data = data.replace(regex, (match, p1) => {
        console.log("match: ", match, "p1:", p1);
        if (p1.indexOf(".") === -1) {
          const newPath = `${pattern}${p1
            .trim()
            .replace(/\/$/, "")}/index.html`;
          console.log("matched: ", newPath);
          return `href="${newPath}"`;
        } else {
          console.log("not match");
          return match; // 保持原样
        }
      });
    });

    // 写回文件
    fs.writeFile(filePath, data, "utf8", function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("File modified:", filePath);
    });
  });
}

// 遍历指定目录下的所有文件和文件夹
function traverseDirectory(directoryPath) {
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }

    files.forEach(function (file) {
      const filePath = path.join(directoryPath, file);
      fs.stat(filePath, function (err, stat) {
        if (err) {
          return console.log(err);
        }

        if (stat.isDirectory()) {
          traverseDirectory(filePath);
        } else if (stat.isFile()) {
          if (path.extname(filePath).toLowerCase() === ".html") {
            modifyFile(filePath);
          }
        }
      });
    });
  });
}

// 调用遍历函数
traverseDirectory(directoryPath);
