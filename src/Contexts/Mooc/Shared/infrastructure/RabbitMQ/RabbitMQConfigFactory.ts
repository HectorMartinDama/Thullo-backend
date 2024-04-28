import { ConnectionSettings } from '../../../../Shared/infrastructure/EventBus/RabbitMq/ConnectionSettings';
import { ExchangeSetting } from '../../../../Shared/infrastructure/EventBus/RabbitMq/ExchangeSetting';
import config from '../config';

export type RabbitMQConfig = {
  connectionSettings: ConnectionSettings;
  exchangeSettings: ExchangeSetting;
  maxRetries: number;
  retryTtl: number;
};
export class RabbitMQConfigFactory {
  static createConfig(): RabbitMQConfig {
    return config.get('rabbitmq');
  }
}
