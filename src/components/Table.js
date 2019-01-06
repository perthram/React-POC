import React, { Component } from 'react';

export default class Table extends Component {
  render() {
    return (
      <table>
        <thead>{this.props.cols}</thead>

        <tbody>{this.props.rows}</tbody>
      </table>
    );
  }
}
