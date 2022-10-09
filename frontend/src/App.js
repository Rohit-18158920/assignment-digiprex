import React, { Component } from "react";
import './App.css';
import Config from "./config";

import LineLoader from './components/LineLoader';
import { Table, Button } from 'react-bootstrap';
import Pagination from "react-js-pagination";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true,
      itemsCountPerPage: 5,
      pageRangeDisplayed: 5,
      activePage: 1,
      showModal: false,
      orderInfo: {},
    };

    this.handlePageChange = this.handlePageChange.bind(this);
    this.filterdata = this.filterdata.bind(this);
    this.getOrderInfo = this.getOrderInfo.bind(this);
  }
  componentWillMount() {
    const api = {
      method: 'GET',
      url: Config.getDetailsUrl
    };
    setTimeout(() => {
      request(api).then((res) => {
        return res.json().then((res) => {
          const filteredList = res.data;
          let list = [];
          for (let i = 0; i < this.state.itemsCountPerPage && i < filteredList.length; i++) {
            list.push(filteredList[i]);
          }
          this.setState({
            dataShowList: filteredList,
            paginatedDataList: list,
            filteredList: filteredList,
            totalRows: filteredList.length,
            loadingData: false,
          });
        })
      })
        .catch(err => {
          console.log(err);
          this.setState({
            dataShowList: [],
            paginatedDataList: [],
            filteredList: [],
            totalRows: 0,
            loadingData: false,
          })
        });
    }, 1200);
  }
  filterdata = event => {
    this.setState({
      filterValue: event.target.value
    });
    let filteredList = this.state.dataShowList;

    filteredList = filteredList.filter((data) => {
      const cartToken = data.cart_token.toLowerCase();
      if (cartToken.indexOf(
        event.target.value.toLowerCase()) !== -1)
        return true;
      else
        return false;
    });
    let list = [];
    for (let i = 0; i < this.state.itemsCountPerPage && i < filteredList.length; i++) {
      list.push(filteredList[i]);
    }
    this.setState({
      activePage: 1,
      totalRows: (filteredList.length),
      filteredList: filteredList,
      paginatedDataList: list
    })
  }
  handlePageChange(pageNumber) {
    let list = [];
    for (let i = (pageNumber - 1) * this.state.itemsCountPerPage; i < (pageNumber * this.state.itemsCountPerPage) && i < this.state.filteredList.length; i++) {
      list.push(this.state.filteredList[i]);
    }
    this.setState({
      activePage: pageNumber,
      paginatedDataList: list
    });
  }
  getOrderInfo(orderInfo) {
    const showModal = this.state.showModal;
    if(showModal) {
      this.setState({
        orderInfo: {},
        showModal: false
      });
    }
    else {
    this.setState({
      orderInfo: JSON.stringify(orderInfo, undefined, 4),
      showModal: true
    });
  }
  }
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-sm navbar-expand-md navbar-expand-lg navbar-dark bgNavColor">
          <div className="navbar-brand" style={{ color: '#0747a6' }} >
            Abandoned Checkout Data Viewer Tool
                        </div>
        </nav>
        <div className="card-body border-bottom-0 dataTable" >
          {this.state.loadingData ?
            <LineLoader />
            :
            <>
              <div className="input-group mb-3">
                <input type="text" id="fileNameFilter" name="fileNameFilter" className="form-control someChange" placeholder="Search by Cart Token" aria-label="FileName" aria-describedby="basic-addon1"
                  value={this.state.filterValue} onChange={this.filterdata}
                />
              </div>
              <div className="row">
                <Table bordered responsive key="dataTable">
                  <thead key="tableHead" className="rohit-nowrap-1">
                    <tr key="tableHeadTr">
                      <th >Cart Token</th>
                      <th>Order Info</th>
                      <th >User Email</th>
                      <th>Contact Number</th>
                      <th >nextSchedule</th>
                      <th >Status</th>
                      <th> Completed</th>

                    </tr>
                  </thead>
                  <tbody key="tableBody" className="rohit-nowrap-1">
                    {this.state.paginatedDataList.map((info, key) =>
                      <tr key={key}>
                        <td>{info.cart_token}</td>
                        <td>
                          <Button variant="primary" onClick={() => this.getOrderInfo(info.order_info)} >{info.order_info.id}</Button>
                        </td>
                        <td>{info.email}</td>
                        <td>{info.phone.phone}</td>
                        <td>{formatDate(info.next_schedule)}</td>
                        <td>{formatStatus(info.status)}</td>
                        <td>{info.completed.toString()}</td>
                      </tr>
                    )
                    }
                  </tbody>
                </Table>
              </div>
              <div className="row" style={{ marginLeft:'13px' }}>
                <div className="col-md-12" >
              {
                this.state.showModal ?
                  <>
                      <textarea rows="10" cols="200" value ={this.state.orderInfo} disabled></textarea>
                  </> : <></>
              }
              </div>
              </div>
              <div className="row" style={{ position: 'absolute', right: 33 }}>
                <div className="col-md-12" >
                  <Pagination
                    itemClass="page-item"
                    linkClass="page-link"
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.itemsCountPerPage}
                    totalItemsCount={this.state.totalRows}
                    pageRangeDisplayed={this.state.pageRangeDisplayed}
                    onChange={this.handlePageChange}
                  />
                </div>
              </div>
            </>
          }
        </div>
      </>
    );
  }
}

async function request(api) {
  console.log('api call params::' + JSON.stringify(api));
  const result = await fetch(api.url, {
    method: api.method,
    body: validateBody(api)
  });
  return result
}
function validateBody(api) {
  if (api.method === 'GET' || api.method === 'PUT') {
    return JSON.stringify()
  }
  return JSON.stringify(api.body);
}
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric", hour: '2-digit', minute: '2-digit' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
const formatStatus = (statusCode) => {
  let status = '';
  if (statusCode === 1)
    status = "Waiting for 1st Reminder to be sent";
  else if (statusCode === 2)
    status = "1st Reminder sent";
  else if (statusCode === 3)
    status = "2nd Reminder sent";
  else if (statusCode === 4)
    status = "Final Reminder sent";
  return status;
}

export default App;