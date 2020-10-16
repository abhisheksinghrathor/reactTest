import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import './Product.scss';
import $ from 'jquery'; 


class Product extends React.Component {
    constructor(props) {
       super(props);
     // checkAvailability();
     this.state = {
        frontbackimg: ''
     }
    };
    componentDidMount() {
        var localimg;
        debugger;
        if(this.props.product.hasDiscount == true){
            $("#"+this.props.product.id).css("outline","1px solid #e60000");            
            $("#discount_"+this.props.product.id).css("background-color","#e60000");
        }
       
       debugger;
       for(var i=0;i<this.props.product.variants[0].phoneImages.length;i++){
           if(this.props.product.variants[0].phoneImages[i].includes("frontback") || this.props.product.variants[0].phoneImages[i].includes("front-back"))
            localimg = this.props.product.variants[0].phoneImages[i];           
       }

       if(localimg)
       this.setState({frontbackimg: localimg});
       else
       this.setState({frontbackimg: this.props.product.imageSrc});

       this.checkOutofstock();
    }
    checkOutofstock(){
        for(var i=0;i<this.props.product.variants.length;i++){
            for(var j=0;j<this.props.product.variants[i].pricingOptions.length;j++){
                 if(this.props.product.variants[i].pricingOptions[j].outOfStock == false){
                   return;
                 }
                 else{
                     $("#"+this.props.product.id).css("opacity","0.3");
                     $("#stock_"+this.props.product.id).css("display","block");
                     return;
                 }
            }
        }
    }
    render() {
        this.phonevalue= this.props.product.initialPhonePrice.value;
        return (
            <div className="card product" id={this.props.product.id}>
                <div className="discount" id={'discount_'+this.props.product.id}><i class="fa fa-gift"></i><p className="discount_label">Switch and Save {this.props.product.callOut}</p></div>
                <div className="grid-container">
                <div>
                <a to={`/products/${this.props.product.id}`} className="product__link">
                    <img className="card-img-top product__img" src={this.state.frontbackimg} alt={this.props.product.title} />
                </a>
                </div>
                <div><div className="card-body product__text">
                    <h4 className="card-title product__title">
                        <Link to={`/products/${this.props.product.id}`}>{this.props.product.title}</Link>
                    </h4>
                    {this.phonevalue == '0.00' ? (
                                <p className="product__price"><b>Free</b></p>
      ) : (
        <p className="product__price"><b>€{this.props.product.initialPhonePrice.value}</b></p>
      )}                      
                    <p className="product__price"><b>€{this.props.product.initialPlan.planPrice}</b> /month on {this.props.product.initialPlan.planName}</p>
                    <div><h5 className="product__stock" id={'stock_'+this.props.product.id}>Out of Stock</h5></div>          
                </div>
                </div> 
                </div>  
                             
            </div>
        );
    }
 }
 export default Product;

