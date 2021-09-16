import React from 'react';
import { Card, CardImg, CardText,CardImgOverlay, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap' ;
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import CommentForm from './CommentFormComponent';


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
                         <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                  <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>

                                </CardImgOverlay>
                                <CardBody>
                                <CardText> {dish.description} </CardText>
                                </CardBody>
                </Card>
                </FadeTransform>
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
            <Fade in>
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
                        </Fade>
        );
    });
            return (
                <div className="container">
                <div className="row">
                    <h4> Comments </h4>
                        <ul className='list-unstyled'>
                             <Stagger in>
                            {com}
                            <CommentForm dishId={dishId} postComment={postComment} />
             </Stagger>

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
