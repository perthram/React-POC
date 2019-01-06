import React, { Component } from 'react';
import { default as response } from '../../mock/response3.json';

export default class SubComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { tableData: {}, active: -1 };
  }
  componentDidMount() {
    this.callSetTimeout();
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.selectedRow.sub !== this.props.selectedRow.sub ||
      prevProps.selectedRow.master != this.props.selectedRow.master
    ) {
      this.callSetTimeout();
    }
  }

  callSetTimeout = () => {
    setTimeout(() => {
      this.setState({
        tableData: {
          records:
            response.records[this.props.selectedRow.master][
              this.props.selectedRow.sub
            ],
        },
        active: 0,
      });
      alert('Data Retrieved for Component' + this.props.name);
    }, 500);
  };

  updateSelectedRow = active => {
    this.setState({ active });
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
            onClick={() => this.updateSelectedRow(index)}
          >
            {el.map((el1, index1) => (
              <td key={index1}>{el1}</td>
            ))}
          </tr>
        );
      });
    }
    return <>{this.props.render({ cols, rows })}</>;
  }
}
