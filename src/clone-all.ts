import {exec} from 'child_process';
import {suffixes} from './suffixes';
import {subNames} from './sub-names';
import {owners} from './owners';

function cloneAll() {
  owners.forEach(repo => {
    subNames.forEach(subName => {
      suffixes.forEach(suffix => {
        exec(`git clone --depth=1 git@github.com:${repo}/${subName}angular.${suffix}.git output/github/${repo}/${subName}angular.${suffix}`, (err, stdout, stderr) => {
          if (err) {
            console.error(err);
            console.error(stderr);
          }
          console.log(stdout);
        });
      });
    });
  });
}

cloneAll();