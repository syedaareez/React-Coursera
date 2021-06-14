import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';
import './DishdetailComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class DishDetail extends Component {
    constructor(props) {
        super(props);
    }
    
    renderDish(dish) {
        if (dish != null)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card> 
            );
        else
            return(
                <div></div>
            );
    };
    renderComment(dish){
        if(dish){
        const dishReturn = dish.comments.map((singleComment) => {
            return(
                <li key={singleComment.id} >
                <p>{singleComment.comment}</p>
                <p>-- {singleComment.author} , {singleComment.date}</p>
                </li>
            );
        });
        const heading=document.querySelector(".commentheading");
        heading.style.display='block';
        return dishReturn;
        }else{
            return (
                <div></div>
            );
        }
}
    
    render(){
        
        
        
        return(
            <div className="row">
                  <div  className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.Dish)}
                  </div>
                    <div  className="col-12 col-md-5 m-1">
                        <h4 className="commentheading">Comments</h4>
                        <ul className="list-unstyled">
                        {this.renderComment(this.props.Dish)}
                        </ul>
                      </div>
                </div>
        );
    };

};

export default DishDetail;