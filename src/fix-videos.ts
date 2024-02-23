import {existsSync, readdirSync, readFileSync, statSync, writeFileSync} from 'fs';
import {join} from 'path';
import {subNames} from './sub-names';
import {owners} from './owners';
import {cp, mkdir} from 'shelljs';

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
    for (const subName of subNames.filter(it => it === '' || it.startsWith('v'))) {
      const files = walk(`output/github/${owner}/${subName}angular.cn/generated/docs`);
      for (const file of files) {
        console.log('fix video:', file);
        if (!file.endsWith('README.json') && !file.endsWith('navigation.json') && !file.endsWith('versions.json') && file.endsWith('.json')) {
          const json = JSON.parse(readFileSync(file, 'utf-8'));
          const contents = json.contents as string;
          if (contents?.match(/\/?assets\/videos\//)) {
            json.contents = contents
                .replace(/<div class="(error-)?video-container">\s+<iframe src="\/?assets\/videos\/([^"]*?)(.cn)?\.mp4" .*?><\/iframe>\s+<\/div>/, `<div class="$1video-container">
  <video controls>
    <source src="https://videos.angular.cn/$2.webm" type="video/webm">
    <source src="https://videos.angular.cn/$2.mp4" type="video/mp4">
    <track src="/assets/videos/$2.en.vtt" label="English" kind="subtitles" srclang="en">
    <track src="/assets/videos/$2.cn.vtt" label="简体中文" kind="subtitles" srclang="zh-CN" default>
    <track src="/assets/videos/$2.tw.vtt" label="正體中文" kind="subtitles" srclang="zh-TW">
  </video>
</div>`);
          }
          if (contents?.match(/<video controls>/)) {
            json.contents = contents
                .replace(/<track src="https:\/\/videos.angular.cn\//g, '<track src="/assets/videos/');
          }
          if (json.contents !== contents) {
            mkdir(`output/github/${owner}/${subName}angular.cn/assets/videos`);
            cp(`output/github/${owner}/videos.angular.cn/*.vtt`, `output/github/${owner}/${subName}angular.cn/assets/videos`);
            writeFileSync(file, JSON.stringify(json), 'utf8');
          }
        }
      }
    }
  }
}

fixVideos();
