import {owners} from './owners';
import {subNames} from './sub-names';
import {existsSync, readFileSync, writeFileSync} from 'fs';

function fixAngularVersions() {
  owners.forEach(owner => {
    subNames.forEach(subName => {
      const navigationFilename = `output/github/${owner}/${subName}angular.cn/generated/navigation.json`;
      if (existsSync(navigationFilename)) {
        const json = JSON.parse(readFileSync(navigationFilename, 'utf8'));
        json.docVersions = [
          {
            'title': 'v16',
            'url': 'https://v16.angular.cn/',
          },
          {
            'title': 'v15',
            'url': 'https://v15.angular.cn/',
          },
          {
            'title': 'v14',
            'url': 'https://v14.angular.cn/',
          },
          {
            'title': 'v13',
            'url': 'https://v13.angular.cn/',
          },
          {
            'title': 'v12',
            'url': 'https://v12.angular.cn/',
          },
          {
            'title': 'v11',
            'url': 'https://v11.angular.cn/',
          },
          {
            'title': 'v10',
            'url': 'https://v10.angular.cn/',
          },
          {
            'title': 'v9',
            'url': 'https://v9.angular.cn/',
          },
          {
            'title': 'v8',
            'url': 'https://v8.angular.cn/',
          },
          {
            'title': 'v7',
            'url': 'https://v7.angular.cn/',
          },
          {
            'title': 'v6',
            'url': 'https://v6.angular.cn/',
          },
          {
            'title': 'v5',
            'url': 'https://v5.angular.io/',
          },
          {
            'title': 'v4',
            'url': 'https://v4.angular.cn/',
          },
          {
            'title': 'v2',
            'url': 'https://v2.angular.cn/',
          },
        ];

        writeFileSync(navigationFilename, JSON.stringify(json, null, 2), 'utf8');
      }
    });
  });
}

function fixMaterialVersions() {
  owners.forEach(owner => {
    subNames.forEach(subName => {
      const versionsFilename = `output/github/${owner}/${subName}angular.cn/assets/versions.json`;
      if (existsSync(versionsFilename)) {
        const versions = [
          {
            'url': 'https://next.material.angular.io',
            'title': '下一代',
          },
          {
            'url': 'https://rc.material.angular.io',
            'title': '发布候选版',
          },
          {
            'url': 'https://material.angular.cn',
            'title': '16.1.0 (最新)',
          },
          {
            'title': 'v15（中文）',
            'url': 'https://material-15.angular.cn',
          },
          {
            'title': 'v14（中文）',
            'url': 'https://material-14.angular.cn',
          },
          {
            'title': 'v13',
            'url': 'https://v13.material.angular.io',
          },
          {
            'title': 'v12（中文）',
            'url': 'https://material-12.angular.cn',
          },
          {
            'title': 'v11（中文）',
            'url': 'https://material-11.angular.cn',
          },
          {
            'title': 'v10',
            'url': 'https://v10.material.angular.io',
          },
          {
            'title': 'v9',
            'url': 'https://v9.material.angular.io',
          },
          {
            'title': 'v8',
            'url': 'https://v8.material.angular.io',
          },
          {
            'title': 'v7',
            'url': 'https://v7.material.angular.io',
          },
          {
            'title': 'v6',
            'url': 'https://v6.material.angular.io',
          },
          {
            'title': 'v5',
            'url': 'https://v5.material.angular.io',
          },
        ];

        writeFileSync(versionsFilename, JSON.stringify(versions, null, 2), 'utf8');
      }
    });
  });
}

fixAngularVersions();
fixMaterialVersions();