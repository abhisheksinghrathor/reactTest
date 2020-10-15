import React, {useState} from 'react';
import './ProductSlider.scss';


class ProductSlider extends React.Component {

        constructor() {
            super();
        
            // Define the initial state:
            this.state = {
               img:''
            };
          }
          componentDidMount() {
              debugger;
           this.setState({img:this.props.images[0]});
         } 
         changeImage(i){
            this.setState({img:this.props.images[i]});
         }
         changeImg(value){
            this.setState({img:value});         
         }
    
    render(){
    return (
        <aside className="col-sm-5">
            <article className="gallery-wrap">
                <div className="img-big-wrap">
                    <div style={{padding: '2rem'}
                    }><img                     
                        src={this.state.img}
                        style={{width: '300px',
                                height: '400px'}}
                    /></div>
                </div>
                <div className="img-small-wrap">
                    {this.props.images.map((img , i ) => (
                        <div className="item-gallery" onClick={() => {this.changeImage(i)}}><img src={img}/></div>
                    ))}
                </div>
            </article>
        </aside>
    );
};

};
export default ProductSlider;