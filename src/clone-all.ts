import {exec} from 'shelljs';
import {suffixes} from './suffixes';
import {subNames} from './sub-names';

function cloneAll() {
  repos.forEach(repo => {
    subNames.forEach(subName => {
      suffixes.forEach(suffix => {
        exec(`git clone git@github.com:${repo}/${subName}.angular.${suffix}.git output/${repo}/${subName}.angular.${suffix}`);
      });
    });
  });
}