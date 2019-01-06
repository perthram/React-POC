import React, { Component } from 'react';
import { default as response } from '../../mock/response2.json';
import Table from './Table';
import SubComponent from './SubComponent';
import ComponentC from './ComponentC';
import ComponentD from './ComponentD';
import ComponentE from './ComponentE';

export default class ComponentB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: {},
      selectedRow: {},
      active: -1,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        tableData: { records: response.records[this.props.selectedRow[1]] },
        active: 0,
        selectedRow: {
          master: this.props.selectedRow[1],
          sub: response.records[this.props.selectedRow[1]][0][2],
        },
      });
      alert('Data Retrieved for ComponentB');
    }, 500);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.selectedRow[1] !== this.props.selectedRow[1]) {
      setTimeout(() => {
        this.setState({
          tableData: { records: response.records[this.props.selectedRow[1]] },
          selectedRow: {
            master: this.props.selectedRow[1],
            sub: response.records[this.props.selectedRow[1]][0][2],
          },
          active: 0,
        });
        alert('Data for ComponentB Retrieved');
      }, 500);
    }
  }
  updateSelectedRow = (row, active) => {
    this.setState({
      selectedRow: { master: this.props.selectedRow[1], sub: row[2] },
      active,
    });
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
      <>
        <h2>Component B</h2>
        <Table cols={cols} rows={rows} />
        {Object.keys(this.state.selectedRow).length > 0 && (
          <>
            <SubComponent
              selectedRow={this.state.selectedRow}
              name="C"
              render={table => <ComponentC table={table} />}
            />
            <SubComponent
              selectedRow={this.state.selectedRow}
              name="D"
              render={table => <ComponentD table={table} />}
            />
            <SubComponent
              selectedRow={this.state.selectedRow}
              name="E"
              render={table => <ComponentE table={table} />}
            />
          </>
        )}
      </>
    );
  }
}
