import React, { Component } from 'react';

class FilterProductTabel extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      filterText : '',
      isStockOnly: false
    };
    this.handleFilter = this.handleFilter.bind(this);
    this.handleStock = this.handleStock.bind(this);
  }
  handleFilter(txt) {
    this.setState({
      filterText : txt
    })
  }
  handleStock(checked) {
    this.setState({
      isStockOnly : checked
    })
  }
  render() {
    return (
      <div>
        <SearchBar 
          filterText={this.state.filterText}
          isStockOnly={this.state.isStockOnly}
          handleFilter={this.handleFilter}
          handleStock={this.handleStock}
        />
        <ProductTable 
          products={this.props.products}
          filterText={this.state.filterText}
          isStockOnly={this.state.isStockOnly}
        />
      </div>
    );
  }
}

class SearchBar extends Component {
  constructor(props) {
    super(props);
  
    this.handleFilter = this.handleFilter.bind(this);
    this.handleStock = this.handleStock.bind(this);
  }
  handleFilter(e) {
    this.props.handleFilter(e.target.value);
  }
  handleStock(e) {
    this.props.handleStock(e.target.checked);
  }
  render() {
    return (
      <div>
        <input type="text" placeholder="Search..." value={this.props.filterText} onChange={this.handleFilter} /> <br/>
        <input type="checkbox" checked={this.props.isStockOnly} onChange={this.handleStock} />{' '} Only show products in stock
      </div>
    );
  }
}

class ProductTable extends Component {
  render() {
    let rows = [];
    let lastCategory = null;

    this.props.products.forEach((product) => {
      if(product.name.indexOf(this.props.filterText) === -1 ||
        (!product.stocked && this.props.isStockOnly)) {
        return;
      }
      if(product.category !== lastCategory){
        rows.push(<ProductCategoryRow category={product.category} key={this.props.category}/>);
      }
      rows.push(<ProductRow product={product} key={product.name}/>);
      lastCategory = product.category;
    });

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

class ProductCategoryRow extends Component {
  render() {
    return (
      <div>
        <tr>
          <td colSpan="2">{this.props.category}</td>
        </tr>
      </div>
    );
  }
}

class ProductRow extends Component {
  render() {
    let product = this.props.product;
    let styleObj = {};

    if(!product.stocked) {
      styleObj.color = 'red';
    }

    return (
      <div>
        <tr>
          <td style={styleObj}>{product.name}</td>
          <td>{product.price}</td>
        </tr>
      </div>
    );
  }
}

var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

class App extends Component {
  render() {
    return (
      <div>
        <FilterProductTabel products={PRODUCTS}/>
      </div>
    );
  }
}

export default App;
