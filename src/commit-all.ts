import {owners} from './owners';
import {subNames} from './sub-names';
import {exec} from 'shelljs';

owners.forEach(owner => {
  subNames.forEach(subName => {
    exec('git add . && git commit -am "fix: 把字幕放在站内"', {
      cwd: `output/github/${owner}/${subName}angular.cn`,
      async: false,
      silent: false,
    });
  });
});