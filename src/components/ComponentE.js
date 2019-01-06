import React, { Component } from 'react';
import Table from './Table';

export default class ComponentE extends Component {
  render() {
    return (
      <>
        <h2>Component E</h2>
        <Table cols={this.props.table.cols} rows={this.props.table.rows} />
      </>
    );
  }
}
