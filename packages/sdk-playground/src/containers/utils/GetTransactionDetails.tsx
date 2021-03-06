import React from 'react';
import { Example, Screen, InputText } from '../../components';
const code = (hash: string) => `
const hash = ${hash ? `"${hash}"` : 'null'};

sdk
  .getTransactionDetails(hash)
  .then(transactionDetails => console.log('transactionDetails', transactionDetails))
  .catch(console.error);
`;

interface IState {
  hash: string;
}

export class GetTransactionDetails extends Screen<IState> {
  public state = {
    hash: '',
  };

  public componentWillMount(): void {
    this.run = this.run.bind(this);

    this.hashChanged = this.hashChanged.bind(this);
  }

  public renderContent(): any {
    const { enabled } = this.props;
    const { hash } = this.state;
    return (
      <div>
        <Example
          title="Get Transaction Details"
          code={code(hash)}
          enabled={hash && enabled}
          run={this.run}
        >
          <InputText
            value={hash}
            label="hash"
            type="text"
            onChange={this.hashChanged}
          />
        </Example>
      </div>
    );
  }

  private hashChanged(hash: string): void {
    this.setState({
      hash,
    });
  }

  private run(): void {
    const { hash } = this.state;
    this
      .logger
      .wrapSync('sdk.getTransactionDetails', async (console) => {
        console.log('transactionDetails', await this.sdk.getTransactionDetails(hash));
      });
  }
}
