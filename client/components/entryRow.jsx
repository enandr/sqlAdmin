import React from 'react';

export default class EntryRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const keys = Object.keys(this.props.entries[0]);
    let rows = null;
    rows = this.props.entries.map((value, index) => {
      const data = keys.map((value2, index2) => {
        return (
          <td key={index2}>{value[value2]}</td>
        );
      });
      return (
        <tr key={index}>
          {data}
        </tr>
      );
    });
    if (rows) {
      return rows;
    } else {
      return (
        <tr>No Data</tr>
      );
    }
  }
}
