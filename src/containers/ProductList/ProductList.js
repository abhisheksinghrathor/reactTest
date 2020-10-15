import React, {Component} from 'react';
import {connect} from 'react-redux';
import Product from "../../components/Product/Product";
import 'react-responsive-modal/styles.css';
import { Button} from 'react-bootstrap';
//import { Modal } from 'react-bootstrap-modal';
import {brandFilter} from "../../pipes/brandFilter";
import {orderByFilter} from "../../pipes/orderByFilter";
import {paginationPipe} from "../../pipes/paginationFilter";
import Pagination from "../../components/Pagination/Pagination";
import {phones} from "../../data/phones";
import $ from 'jquery'; 

class ProductList extends Component {

    constructor() {
        super();
    
        // Define the initial state:
        this.state = {
            colValue : 'col-lg-4',
            perPage: 9,
            currentPage: 1,
            pagesToShow: 3,
            gridValue: 3,
            brandname:'',            
            brandfilter: false
        };

        this.myItems=[];
        this.sortItems=[];
        this.colurarr=[];
       // this.originalProducts=this.props.products;
      }
      
     
      componentDidMount() {
          this.state.totalItemsCount = this.props.products.length;
          this.setState({
              sortItems: this.props.products
          });
          if(sessionStorage.getItem('brand') !=null){
            $('#brandName').val(sessionStorage.getItem('brand'));
            this._onChange();
          }
          $('#search_sort_SmartPhone').val(sessionStorage.getItem('sort'));

          for(var i=0;i<this.props.products.length;i++){
            for(var j=0;j<this.props.products[i].variants.length;j++)
                 this.colurarr.push(this.props.products[i].variants[j].colour);   
        }

        console.log(this.colurarr.filter((v, i, a) => a.indexOf(v) === i));
    }  

    handleClose = () => {       
        $("#myModal").css("display","none");
    }
    handleShow = () => {
        $("#myModal").css("display","block");        
        $("#myModal").css("background-color","rgba(0,0,0,0.4)");
    }

    sortPrice = (e) =>{
            debugger;
        console.log(e.target.value);
        sessionStorage.setItem('sort', e.target.value);
        switch(e.target.value) {
            case 'priceDesc':
                this.props.products.sort(function (a, b) {
                    return a.initialPhonePrice.value.localeCompare(b.initialPhonePrice.value);
                }); 
                this.props.products.reverse();
                this.setState({
                    sorItems: this.props.products
                });
              return this.state.sortItems;
            case 'priceAsc':
                this.props.products.sort(function (a, b) {
                    return a.initialPhonePrice.value.localeCompare(b.initialPhonePrice.value);
                });  
                this.setState({
                    sorItems: this.props.products
                });
              return this.state.sortItems;
            case 'nameDesc':
                this.props.products.sort(function (a, b) {
                    return a.title.localeCompare(b.title);
                });  
                this.props.products.reverse();
                this.setState({
                    sorItems: this.props.products
                });
              return this.state.sortItems;
            case 'nameAsc':
                this.props.products.sort(function (a, b) {
                    return a.title.localeCompare(b.title);
                });  
                this.setState({
                    sorItems: this.props.products
                });
              return this.state.sortItems;
            default:
                this.setState({
                    sorItems: phones
                });
              return 'foo';
          }

        this.props.products.sort(function (a, b) {
            return a.initialPhonePrice.value.localeCompare(b.initialPhonePrice.value);
        });
        this.setState({
            sorItems: this.props.products
        });
    }

    changeLayout = (n) => {
        this.setState({gridValue: n});

        let realGridValue;

        if(n === 4) {
            realGridValue = 3
        } else {
            realGridValue = 4;
        }

      this.setState({
          colValue: `col-lg-${realGridValue}`
      });
    };

    _onChange = (n) => {
        this.myItems = [];
        var options =  $('datalist')[0].options;
        console.log();
        for (var i=0;i<options.length;i++){
           if (options[i].value == $('#brandName').val() && options[i].value != 'Select All') 
             { 
                this.setState({brandname: $('#brandName').val(), brandfilter: true});                        
                sessionStorage.setItem('brand', $('#brandName').val());
                for (var j=0;j<this.props.products.length;j++){
                // console.log(this.props.products[j].brand +'....'+ $('#brandName').val());
                if(this.props.products[j].brand == $('#brandName').val())
                this.myItems.push(this.props.products[j]);
                }
            this.state.totalItemsCount = this.myItems.length;            
            break;}
            else{
                sessionStorage.removeItem('brand');
                this.setState({brandname: '', brandfilter: false});                    
                this.state.totalItemsCount = this.props.products.length;     
            }
        }

    };

    onPrev = () => {
        const updatedState = {...this.state};
        updatedState.currentPage = this.state.currentPage - 1;
        this.setState(updatedState);
    };


    onNext = () => {
        this.setState({
            ...this.state,
            currentPage: this.state.currentPage + 1
        });
    };

    goPage = (n) => {
        this.setState({
            ...this.state,
            currentPage: n
        });
    };


    render() {

        let isActive = this.state.colValue[this.state.colValue.length -1];
        let isbrandfilter = this.state.brandfilter;
        return (
            <div className="col-lg-12">
                <div className="row mb-3">
                    <div className="col-12 d-none d-lg-block d-xl-block">
                        <div className="card ">
                            <div className="card-header d-flex">
                            <button className="filter-button" onClick={this.handleShow}><i class="fa fa-filter"></i>Filters</button>
                            <div className="row sortby">
                                <div className="sortby-label">Sort By:</div>
                                <div>
                                <select name="search-sort" id="search_sort_SmartPhone" className="form-control" onChange={this.sortPrice} >
                                <option value="" id="sort-default">Default</option>
                                <option value="priceAsc">Price (lowest first)</option>
                                <option value="priceDesc">Price (highest first)</option>
                                <option value="nameAsc">Name (A-Z)</option>
                                <option value="nameDesc">Name (Z-A)</option>
                                </select>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isbrandfilter ? (
                                <div className="row"> 
       {paginationPipe(this.myItems, this.state).map(productItem =>{
            let classes = `${this.state.colValue} col-md-6 mb-4`;
            return (<div className={classes}>
                <Product key={productItem.id} product={productItem} />
            </div>)
        })}</div>
      ) : (
       <div className="row">{paginationPipe(this.props.products, this.state).map(productItem =>{
        let classes = `${this.state.colValue} col-md-6 mb-4`;
        return (<div className={classes}>
            <Product key={productItem.id} product={productItem} />
        </div>)
    })}</div>
      )}              
                <div className="d-flex justify-content-end">
                    <Pagination
                        totalItemsCount={this.state.totalItemsCount}
                        currentPage={this.state.currentPage}
                        perPage={this.state.perPage}
                        pagesToShow={this.state.pagesToShow}
                        onGoPage={this.goPage}
                        onPrevPage={this.onPrev}
                        onNextPage={this.onNext}
                    />
                </div>
                <div id="myModal" class="modal">
                    <div class="modal-content">
                        <span class="close" onClick={this.handleClose}>&times;</span><p> CLear</p>
                        <div class="filter">
                        <label >Filter</label><br/>
                        <input list="filterbrandName" name="browser" id="brandName"  onChange={this._onChange} className="col-sm-6 custom-select custom-select-sm selectfilter" placeholder="Select Brand"></input>
                        <datalist id="filterbrandName">
                            <option value="Select All"/>
                            <option value="Samsung"/>
                            <option value="Apple"/>
                        </datalist>
                        <hr/>
                        <label >Features</label><br/>
                        <input list="filterbrandName" name="browser" id="brandName"  onChange={this._onChange} className="col-sm-6 custom-select custom-select-sm selectfilter" placeholder="Select Features"></input>
                        <datalist id="filterbrandName">
                            <option value="Select All"/>
                            <option value="Samsung"/>
                            <option value="Apple"/>
                        </datalist>
                        <hr/>
                        <label >Platform</label><br/>
                        <input list="filterbrandName" name="browser" id="brandName"  onChange={this._onChange} className="col-sm-6 custom-select custom-select-sm selectfilter" placeholder="Select Platform"></input>
                        <datalist id="filterbrandName">
                            <option value="Select All"/>
                            <option value="Samsung"/>
                            <option value="Apple"/>
                        </datalist>
                        <hr/>
                        
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}

const mapStateToProps = state => {
    const brands = state.brandFilter;
    const orderBy = state.orderBy;

    const filterByBrandArr = brandFilter(state.shop.products, brands);
    const filterByOrderArr = orderByFilter(filterByBrandArr, orderBy);


    return {products: filterByOrderArr }
};

export default connect(mapStateToProps, null)(ProductList);
