import {owners} from './owners';
import {exec, ExecOptions} from 'shelljs';
import {subNames} from './sub-names';

owners.forEach(owner => {
  subNames.forEach(subName => {
    const cwd = `output/github/${owner}/${subName}angular.cn`;
    const options: ExecOptions = {cwd, async: false, silent: false};
    exec('git init', options);
    exec('git add CNAME', options);
    exec('git commit -m "Initial commit"', options);
    exec('git add .', options);
    exec('git commit -am "feat: re-init git repo"', options);
    exec(`git remote add origin git@github.com:${owner}/${subName}angular.cn.git`, options);
  });
});
