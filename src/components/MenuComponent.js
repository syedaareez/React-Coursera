import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
import DishDetail from './DishdetailComponent';

class Menu extends Component {

    constructor(props) {
        super(props);
    this.state = {
      detailBlockCall: null
    }
    }
    
    onClickBlock(dish) {
        this.setState({ detailBlockCall: dish});
    }
     
    renderDetailBlock(dish){
        return(
        <DishDetail Dish={dish} />
    );
    }
        
    
    
    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
              <div key={dish.id} className="col-12 col-md-5 m-1">
                <Card 
                  onClick={() => this.onClickBlock(dish)}>
                  <CardImg width="100%" src={dish.image} alt={dish.name} />
                  <CardImgOverlay>
                      <CardTitle>{dish.name}</CardTitle>
                  </CardImgOverlay>
                </Card>
              </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                {this.renderDetailBlock(this.state.detailBlockCall)}
            </div>

            
        );
    };
}

export default Menu;