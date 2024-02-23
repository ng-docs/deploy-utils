import {github} from './github';

// TODO: 找出页面的验证信息
export async function getPageInfo() {
  const page = await github.repos.getPages({owner: 'ng-docs', repo: 'awesome.angular.cn'});
  return page.data;
}

getPageInfo().then(info => {
  console.log(info);
});
