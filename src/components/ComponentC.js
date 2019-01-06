import React, { Component } from 'react';

import Table from './Table';

export default class ComponentC extends Component {
  render() {
    return (
      <>
        <h2>Component C</h2>
        <Table cols={this.props.table.cols} rows={this.props.table.rows} />
      </>
    );
  }
}
