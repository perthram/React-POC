import React, { Component } from 'react';
import { default as response } from '../../mock/response1.json';
import ComponentB from './ComponentB';
import Table from './Table';
export default class ComponentA extends Component {
  constructor(props) {
    super(props);
    this.state = { tableData: {}, selectedRow: [], active: -1 };
  }
  fetchData = () => {
    setTimeout(() => {
      this.setState({ tableData: response, selectedRow: [], active: -1 });
      alert('Data Retrieved for ComponentA');
    }, 500);
  };
  updateSelectedRow = (row, active) => {
    this.setState({ selectedRow: row, active });
  };
  render() {
    const cols = (
      <tr>
        {response.headers.map(el => (
          <th key={el}>{el}</th>
        ))}
      </tr>
    );
    let rows = [];
    if (Object.keys(this.state.tableData).length === 0) {
      rows.push(
        <tr key="no data">
          <td colSpan="3">No data Found</td>
        </tr>
      );
    } else {
      rows = this.state.tableData.records.map((el, index) => {
        return (
          <tr
            key={index}
            className={this.state.active === index ? 'active' : ''}
            onClick={() => this.updateSelectedRow(el, index)}
          >
            {el.map((el1, index1) => (
              <td key={index1}>{el1}</td>
            ))}
          </tr>
        );
      });
    }
    return (
      <React.Fragment>
        <h2>Component A</h2>
        <Table cols={cols} rows={rows} />
        <button onClick={this.fetchData}>Retreive</button>
        {this.state.selectedRow.length > 0 && (
          <ComponentB selectedRow={this.state.selectedRow} />
        )}
      </React.Fragment>
    );
  }
}
