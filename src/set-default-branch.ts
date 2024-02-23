import {owners} from './owners';
import {subNames} from './sub-names';
import {github} from './github';

async function setDefaultBranch() {
  for (const owner of owners) {
    for (const subName of subNames) {
      await github.repos.update({owner, repo: `${subName}angular.cn`, default_branch: 'main'});
    }
  }
}

setDefaultBranch().then(console.log);