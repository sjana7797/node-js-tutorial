const fs = require("fs");

// Sync filesystem
const textIn = fs.readFileSync("./chapter1/fileSystem/file.txt", "utf-8");

console.log(textIn);

const textOut = `This the first text written from fs module in file name fileWrite.txt \ncreated on ${new Date()}`;

fs.writeFileSync("./chapter1/fileSystem/fileWrite.txt", textOut);

// Async filesystem
fs.readFile("./chapter1/fileSytem/read.txt", "utf-8", (err, data1) => {
  fs.readFile(`./chapter1/fileSystem/${data1}`, "utf-8", (err, data2) => {
    fs.readFile("./chapter1/fileSystem/append.txt", "utf-8", (err, data3) => {
      fs.writeFile(
        "./chapter1/fileSytem/final.txt",
        `${data2}\n${data3}`,
        "utf8",
        (err) => {
          console.log("Your file has been written");
        }
      );
    });
  });
});
