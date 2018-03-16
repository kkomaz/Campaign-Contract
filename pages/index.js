import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';

/**
 * Rendered on Server + client;
*/

class CampaignIndex extends Component {
  // Not assigned to instances of the class.
  // Function is assigned to the class itself
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map(address => {
      return {
        header: address,
        description: <a>View Campaign</a>,
        fluid: true
      }
    });

    return <Card.Group items={items} />
  }

  render() {
    return (
      <div>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
        {this.renderCampaigns()}
        <Button
          content="Create Campaign"
          icon="add circle"
          primary
        />
      </div>
    )
  }
}

export default CampaignIndex;
