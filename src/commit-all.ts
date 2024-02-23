import {owners} from './owners';
import {subNames} from './sub-names';
import {exec} from 'shelljs';

owners.forEach(owner => {
  subNames.forEach(subName => {
    exec('git commit -am "fix: update versions"', {cwd: `output/github/${owner}/${subName}angular.cn`});
  });
});