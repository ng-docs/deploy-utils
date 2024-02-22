import {writeFileSync} from 'fs';
import {subNames} from './sub-names';
import {suffixes} from './suffixes';

subNames.forEach(subName => {
  suffixes.forEach(suffix => {
    const host = subName === '' ? `angular.${suffix}` : `${subName}.angular.${suffix}`;
    const filename = `output/${host}.conf`;
    writeFileSync(filename, `server {
\tserver_name ${host};
\tclient_max_body_size 100M;
\tlocation / {
\t\tproxy_pass https://g${subName}.angular.cn/;
\t\tproxy_ssl_server_name on;
\t\tproxy_set_header Connection '';
\t\tproxy_set_header Host 'g${subName}.angular.cn';
\t\tproxy_http_version 1.1;
\t\tchunked_transfer_encoding off;
\t}
}
`, 'utf8');
  });
});