import React, {Component, useState} from 'react';
import { Card, CardImg, CardText,CardImgOverlay, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Button, Label, Row, Col } from 'reactstrap' ;
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

// import CommentForm from './CommentFormComponent';
const required = (val) => val && val.length; 
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);


        this.state = {
            isCommentFormModalOpen: false
        };

        this.toggleCommentFormModal = this.toggleCommentFormModal.bind(this);
        this.handleCommentFormSubmit = this.handleCommentFormSubmit.bind(this);

    }

    handleCommentFormSubmit(values) {
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);


    }

    toggleCommentFormModal() {
        this.setState({
            isCommentFormModalOpen: !this.state.isCommentFormModalOpen
        });
    }


    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleCommentFormModal}>
                    <i class="fas fa-pencil-alt"></i> Submit Comment
                </Button>
                <Modal isOpen={this.state.isCommentFormModalOpen} toggle={this.toggleCommentFormModal} >
                    <ModalHeader toggle={this.toggleCommentFormModal}> Submit Comment </ModalHeader>
                    <ModalBody>

                        <LocalForm onSubmit={(values) => this.handleCommentFormSubmit(values)}>

                            <Row className="form-group">
                                <Label htmlFor="rating" md={12} >Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating"
                                        className="form-control"
                                        name="rating"
                                        id="rating"
                                        validators={{
                                            required
                                        }}
                                    >
                                        <option>Please Select</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}> Your Name </Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your  Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 3 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}
function RenderDish({ dish,isLoading,errMess }) {
  if (isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (dish != null)  {
            return (
                <div className="container">
                <div className="row">
                <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                  <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>

                                </CardImgOverlay>
                                <CardBody>
                                <CardText> {dish.description} </CardText>
                                </CardBody>
                </Card>
                    </div>
                    </div>

            );
        }
        if (dish == null) {
            return (<div></div>)
        }
}

  function RenderComments({comments, postComment,dishId}) {

        if (comments !=null) {
            const com = comments.map(comment => {
        return (
            <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>-- {comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit'
                    }).format(new Date(Date.parse(comment.date)))}
                </p>
            </li>
        );
    });
            return (
                <div className="container">
                <div className="row">
                    <h4> Comments </h4>
                    <ul className='list-unstyled'>
                            {com}
                            <CommentForm dishId={dishId} postComment={postComment} />

                    </ul>
            </div>
                    </div>
            );
        }
        else {
            return (<div></div>)
        }
    }
   const DishDetail = props => {
   
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } 
    else{
        return (<div className="container">
        <div className="row">
            <Breadcrumb>
                <BreadcrumbItem>
                    <Link to="/menu">Menu</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active> {
                    props.dish.name
                }</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3> {
                    props.dish.name
                }</h3>
                <hr/>
            </div>
        </div>
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish={
                    props.dish
                }/>
            </div>
            <div className="col-12 col-md-5 m-1">
                <RenderComments comments={
                    props.comments
                } dishId={
                        props.dish.id
                    }
                    postComment={
                        props.postComment
                    }/>
               
            </div>
        </div>
    </div>);
    }   
   
   
   
};

export default DishDetail;
