import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,CardTitle, Breadcrumb, BreadcrumbItem, Label,Modal, ModalHeader, ModalBody, Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import './DishdetailComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function RenderDish({dish}) {
    
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

    }

function RenderComments({comments}) {
      
      if(comments){
        const commentReturn = comments.map((singleComment) => {
            return(
                <li key={singleComment.id} >
                <p>{singleComment.comment}</p>
                <p>-- {singleComment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(singleComment.date)))}</p>
                </li>
            );
        });
        return (
            <div>
            {commentReturn}
            <CommentForm  />
            </div>
            
                    

            );
        }else{
            return (
                <div></div>
            );
        }
    
    }
    
    
class CommentForm extends Component {

        constructor(props) {
            super(props);
    
            this.toggleModal = this.toggleModal.bind(this);
            this.afterSubmit = this.afterSubmit.bind(this);
            
            this.state = {
              modalOpen: false
            };
        }
    
        toggleModal() {
            this.setState({
              modalOpen: !this.state.modalOpen
            });
        }
    
        afterSubmit(values) {
            this.toggleModal();
            alert('Current State is: ' + JSON.stringify(values));
            
        }
        
        
    
        render() {
            const required = (val) => val && val.length;
            const maxLength = (len) => (val) => !(val) || (val.length <= len);
            const minLength = (len) => (val) => val && (val.length >= len);
            return(
            <div>
                <Button onClick={this.toggleModal}> Submit Comment</Button>
                <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.afterSubmit(values)}>
                        <Row className="form-group">
                            <Col>
                            <Label htmlFor="rating">Rating</Label>
                            <Control.select model=".rating" id="rating" className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                            <Label htmlFor="yourName">Your Name</Label>
                            <Control.text model=".yourName" id="yourName" className="form-control" placeholder="Your Name" 
                                validators={{
                                             minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                            />
                                    <Errors
                                        className="text-danger"
                                        model=".yourName"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                            <Label htmlFor="comment">Comment</Label>
                            <Control.textarea model=".comment" id="comment"
                                        rows="6" className="form-control" />
                            </Col>
                        </Row>
                        <Button type="submit" className="bg-primary">
                            Submit
                        </Button>
                    </LocalForm>
                </ModalBody>
               </Modal>
            </div>
            );
        }
    
    }
    

    const  DishDetail = (props) => {

      return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h3>Comments</h3>
                        <ol className="list-unstyled">
                        <RenderComments comments={props.comments} />
                        </ol>
                    </div>
                </div>
                </div>
        );
    }

    


    
export default DishDetail;
