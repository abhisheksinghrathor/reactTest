import React from 'react';
import {connect} from 'react-redux';
import ProductSlider from "../../components/ProductSlider/ProductSlider";
import './ProductDetail.scss';
import $ from 'jquery'; 

class ProductDetail extends React.Component {
    constructor(props) {
       super(props);
       
       this.state = {
          images:  this.props.product.variants[0].phoneImages,
          storageOptions: this.props.product.variants[0].pricingOptions
       }
      // var parse = require('html-react-parser');
       this.colour = this.props.product.variants[0].colour;
       this.storage = this.props.product.variants[0].pricingOptions[0].capacity;
       this.summary = this.props.product.summary;
       this.updateColor = this.updateColor.bind(this);
       this.state.planDetails = this.props.product.variants[0].pricingOptions[0].price[0];
       this.state.plans = this.props.product.variants[0].pricingOptions[0].price;
       this.state.selectedPlan1= '';
       this.state.selectedPlan2 = '';
    };
    componentDidMount() {
        debugger;
        if(this.props.product.variants[0].pricingOptions[0].outOfStock != false){
        this.updateCapacity( this.props.product.variants[0].pricingOptions[0].price, this.props.product.variants[0].pricingOptions[0].capacity, true);

        }
  }  
    updateColor(color) {
        this.colour = color;
        var localimg;
        for (var i = 0; i < this.props.product.variants.length; i++) {
            if(this.props.product.variants[i].colour == color){
               this.storage = this.props.product.variants[i].pricingOptions[0].capacity;
               localimg = this.props.product.variants[i].phoneImages[0];
           this.setState({
            images: this.props.product.variants[i].phoneImages,
            storageOptions: this.props.product.variants[i].pricingOptions
          });
          if(this.props.product.variants[i].pricingOptions[0].outOfStock != false){
            this.updateCapacity( this.props.product.variants[i].pricingOptions[0].price, this.props.product.variants[0].pricingOptions[0].capacity, true);    
            }
            else{
                this.updateCapacity( this.props.product.variants[i].pricingOptions[0].price, this.props.product.variants[0].pricingOptions[0].capacity, false);               
            }   
        }
        } 
        debugger;
        this.refs.ProductSliderImage.changeImg(localimg);

    }

    updateCapacity(items, capacity, outofstock){
        this.storage = capacity;
        this.setState({
            plans: items
        });

        if(outofstock == true){
        $("#instock").css("display","block");
        $("#addtocart").addClass("addtocart-select");  
        $("#addtocart").prop('disabled', true); 
        }
        else{
        $("#instock").css("display","none");
        $("#addtocart").removeClass("addtocart-select");  
        $("#addtocart").prop('disabled', false); 
        }
    }
    showPlan(item) {
     //   this.state.planDetails= item;
        this.setState({planDetails: item})
        console.log(this.state.planDetails);
        $("#myplanModal").css("display","block");        
        $("#myplanModal").css("background-color","rgba(0,0,0,0.4)");
           
       /* for (var i = 0; i < this.props.product.variants.length; i++) {
            if(this.props.product.variants[i].colour == this.colour){
                for(var j=0; j<this.props.product.variants[i];j++)
           // console.log();
           this.setState({
            images: this.props.product.variants[i].phoneImages,
            storageOptions: this.props.product.variants[i].pricingOptions
          });
        }
        } */
    }
    hidePlan(plan, colour) { 
        $("#myplanModal").css("display","none");
    }
    selectPlan(plan) { 
        debugger;
       $("#myplanModal").css("display","none");
        this.setState({
            selectedPlan1: this.props.product.title+' '+this.colour+' '+this.storage+'     €'+plan.phonePrice+' one-off cost',
            selectedPlan2: plan.planName+'   €'+plan.planPrice+'/month'
        });
        console.log(this.state.selectedPlan);
    }
    render() {
        let inStock = false;
        this.phoneprice = this.state.planDetails.phonePrice;
        return (
            <div className="row">
                        <ProductSlider ref="ProductSliderImage" images={this.state.images}/>
                        
                        <aside className="col-sm-7">
                <article className="card-body p-5">
                    <h3 className="title mb-3">{this.props.product.title}</h3>
                    <dl className="item-property">
                        <dt>Colour : {this.colour}</dt>
                        <div>
                        {this.props.product.variants.map((item , i ) => (
                             <button className={"btncolor "+item.colour}
                         onClick={() => this.updateColor(item.colour)}>                        
                         </button>
                        ))}
                    </div>
                    </dl>
                    <dl className="item-property">
                        <dt>Storage : {this.storage}</dt>
                        <div className="row">
                        
                        {this.state.storageOptions.map((item , i ) => (
                            inStock= item.outOfStock,                            
                            inStock ? (
                                <button className="btncapacity outOfstock"
                            onClick={() => this.updateCapacity(item.price,item.capacity,item.outOfStock)}>{item.capacity}                         
                            </button>        
      ) : (
        <button className="btncapacity"
        onClick={() => this.updateCapacity(item.price,item.capacity,item.outOfStock)}>{item.capacity}                         
        </button>
      )
                            
                        ))}
                        <div id="instock"><i class="fa fa-times-circle stock"></i> Out of Stock</div>
                    </div>
                    </dl>
                    <dl className="item-property">
                        <dt>Plans</dt>
                        <div className="row">
                        {this.state.plans.map((item , i ) => (
                            <div>
                            <div className="card plan-card"  onClick={() => this.showPlan(item)} >
                            <div className="item-gallery">{item.planName}</div>
                            {this.phoneprice== '0.00' ? (
                            <div className="item-gallery">Free</div>
                            ) : (
                            <div className="item-gallery">€{item.phonePrice}</div>
                            )}
                            </div>
                            </div>
                        ))}
                    </div>
                    </dl>
                    <dl className="item-property">
                    <div dangerouslySetInnerHTML={{__html: this.summary}}></div>
                    </dl>
                    <dl className="item-property">
                        <dt>Specifications</dt>
                        <div> <div className="row">
                        <ul>
                        {this.props.product.specifications.map((item , i ) => (
                           <li><div className="item-gallery">{item.name} : {item.value}</div></li>                           
                        ))}
                        </ul>
                    </div>
                    </div>
                    </dl>                    
                        <div className="row">
                        <div className="price-footer">
                            <button className="button addtocart" id="addtocart">Add to Cart</button>
                        </div>
                        <div className="price-footer card">
                        <p>{this.state.selectedPlan1}</p>
                        <p>{this.state.selectedPlan2}</p>
                        </div>                        
                        </div>
                </article>
            </aside>
            <div id="myplanModal" class="modal">
                    <div class="modal-content">
                    {this.phoneprice== '0.00' ? (
                    <div className="plan-detail plan-header"><p>Get this phone <b>Free</b></p></div>
                    ) : (
                    <div className="plan-detail plan-header"><p> Pay <b>€{this.state.planDetails.phonePrice}</b> for this phone</p></div>
                    )}   
                        <div class="filter">
                        <div className="plan-summary plan-detail">
                        <label >{this.state.planDetails.planName}</label><br/>
                        <label ><b>€{this.state.planDetails.planPrice}</b>/month</label>                       
                        </div>
                        <div className="row">
                            <div className="plan-extra plan-extra-left"><p>{this.state.planDetails.dataAllowance} data</p></div>
                            <div className="plan-extra"><p>{this.state.planDetails.freeExtra}</p></div>
                        </div>  
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-default btnmodal" data-dismiss="modal" onClick={() => this.selectPlan(this.state.planDetails)} >Select</button>
                            <button type="button" class="btn btn-default btnmodal" data-dismiss="modal" onClick={this.hidePlan}>Close</button>
                    </div>
                    </div>
                    
                </div>
                    </div>
        );
    }
 }
 export default ProductDetail;