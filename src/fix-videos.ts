import {existsSync, readdirSync, readFileSync, statSync, writeFileSync} from 'fs';
import {join} from 'path';
import {subNames} from './sub-names';
import {owners} from './owners';

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

function fixVideos() {
  for (const owner of owners) {
    for (const subName of subNames) {
      const files = walk(`output/github/${owner}/${subName}angular.cn/generated/docs`);
      for (const file of files) {
        console.log('fix video:', file);
        if (!file.endsWith('README.json') && file.endsWith('.json')) {
          const json = JSON.parse(readFileSync(file, 'utf-8'));
          const contents = json.contents as string;
          if (contents?.match(/\/?assets\/videos\//)) {
            json.contents = contents
                .replace(/<div class="error-video-container">\s+<iframe src="\/?assets\/videos\/([^"]*)(.cn)?\.mp4" .*?><\/iframe>\s+<\/div>/, `<div class="video-container">
  <video controls>
  <source src="https://videos.angular.cn/$1.webm" type="video/webm">
  <source src="https://videos.angular.cn/$1.mp4" type="video/mp4">
  <track src="https://videos.angular.cn/$1.en.vtt" label="English" kind="subtitles" srclang="en">
  <track src="https://videos.angular.cn/$1.cn.vtt" label="简体中文" kind="subtitles" srclang="zh-CN" default>
  <track src="https://videos.angular.cn/$1.tw.vtt" label="正體中文" kind="subtitles" srclang="zh-TW">
</video>`)
                .replace(/src="\/?assets\/videos\/([^.]*?).(webm|mp4|en.vtt|cn.vtt|tw.vtt)"/g, 'src="https://videos.angular.cn/$1.$2"');
          }
          if (contents?.match(/<video controls="">/)) {
            json.contents = contents
                .replace(/<video controls="">/g, '<video controls>')
                .replace(/srclang="zh-CN" default="">/g, 'srclang="zh-CN" default>');
          }
          writeFileSync(file, JSON.stringify(json), 'utf8');
        }
      }
    }
  }
}

fixVideos();
