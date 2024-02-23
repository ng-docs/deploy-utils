import {existsSync, readdirSync, readFileSync, statSync, writeFileSync} from 'fs';
import {join} from 'path';
import {subNames} from './sub-names';

function* walk(dir: string): Generator<string> {
  if (!existsSync(dir)) {
    return;
  }
  const files = readdirSync(dir);

  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      yield* walk(filePath); // 递归进入子目录
    } else {
      yield filePath; // 返回文件路径
    }
  }
}

async function fixVideos() {
  subNames.forEach(subName => {
    const files = walk(`output/github/aigc-spring-angular/${subName}angular.cn/generated/docs`);
    for (const file of files) {
      if (!file.endsWith('README.json') && file.endsWith('.json')) {
        const json = JSON.parse(readFileSync(file, 'utf-8'));
        const contents = json.contents as string;
        if (contents?.match(/\/?assets\/videos\//)) {
          json.contents = contents
              .replace(/<div class="error-video-container">\s+<iframe src="\/?assets\/videos\/([^"]*)\.mp4" .*?><\/iframe>\s+<\/div>/, `<div class="video-container">
  <video controls="">
  <source src="https://angular-videos.oss-cn-hangzhou.aliyuncs.com/$1.webm" type="video/webm">
  <source src="https://angular-videos.oss-cn-hangzhou.aliyuncs.com/$1.mp4" type="video/mp4">
  <track src="https://angular-videos.oss-cn-hangzhou.aliyuncs.com/$1.en.vtt" label="English" kind="subtitles" srclang="en">
  <track src="https://angular-videos.oss-cn-hangzhou.aliyuncs.com/$1.cn.vtt" label="简体中文" kind="subtitles" srclang="zh-CN" default="">
  <track src="https://angular-videos.oss-cn-hangzhou.aliyuncs.com/$1.tw.vtt" label="正體中文" kind="subtitles" srclang="zh-TW">
</video>`)
              .replace(/src="\/?assets\/videos\/([^.]*?).(webm|mp4|en.vtt|cn.vtt|tw.vtt)"/g, 'src="https://angular-videos.oss-cn-hangzhou.aliyuncs.com/$1.$2"');
          writeFileSync(file, JSON.stringify(json, null, 2), 'utf8');
        }
      }
    }
  });
}


fixVideos().then(console.log);