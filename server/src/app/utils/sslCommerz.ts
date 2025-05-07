import config from "../config";

interface SSLCommerzConfig {
  store_id: string;
  store_passwd: string;
  sandbox: boolean;
}

export const sslCommerzConfig: SSLCommerzConfig = {
  store_id: config.sslCommerz.store_id!,
  store_passwd: config.sslCommerz.store_passwd!,
  sandbox: config.sslCommerz.sandbox,
};
