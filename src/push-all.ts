import {owners} from './owners';
import {subNames} from './sub-names';
import {exec} from 'shelljs';

owners.forEach(owner => {
  subNames.forEach(subName => {
    exec(`git push -f -u origin main`, {cwd: `output/github/${owner}/${subName}angular.cn`, silent: false});
  });
});