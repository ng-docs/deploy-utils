import DNS, {AddDomainRecordRequest} from '@alicloud/alidns20150109';
import * as $OpenApi from '@alicloud/openapi-client';

export class DnsClient {
  private client: DNS;

  constructor(accessKeyId: string, accessKeySecret: string) {
    let config = new $OpenApi.Config({});
    // 传AccessKey ID入config
    config.accessKeyId = accessKeyId;
    // 传AccessKey Secret入config
    config.accessKeySecret = accessKeySecret;
    config.regionId = '';
    this.client = new DNS(config);
  }

  async addDnsRecord(subName: string, type: string, value: string): Promise<void> {
    let req = new AddDomainRecordRequest({});
    req.domainName = 'angular.cn';
    req.RR = subName;
    req.type = type;
    req.value = value;

    console.log(`云解析添加域名(${subName})的结果(json)↓`);
    try {
      let resp = await this.client.addDomainRecord(req);
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  }


}