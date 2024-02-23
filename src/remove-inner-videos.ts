import {owners} from './owners';
import {subNames} from './sub-names';
import {exec} from 'child_process';

owners.forEach(owner => {
  subNames.forEach(subName => {
    exec(`rm -fr assets/videos`, {cwd: `output/github/${owner}/${subName}angular.cn`});
  });
});
