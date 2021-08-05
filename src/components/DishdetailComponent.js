import React from 'react';
import { Card, CardImg, CardText, CardBody,CardImgOverlay,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';



function RenderDish({ dish }) {

        if (dish != null) {
            return (
                <div className="container">
                <div className="row">
                <Card>
                  <CardImg width="100%" src={dish.image} alt={dish.name} />
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

function RenderComments({ comments }) {

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
                    </ul>
            </div>
                    </div>
            );
        }
        else {
            return (<div></div>)
        }
    }
const DishDetail= (props)=>{
        
    const dish = props.dish
    const comments = props.comments

    const dishItem = <RenderDish dish={dish} />
    const commentItem = <RenderComments comments={comments}/>
        
            if (dishItem == null) {
                return (<div></div>);
            }

    return (
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

                <div className='row'>
                     <div className='col-12 col-md-5 m-1'>
                   {dishItem}
                    </div>
                    <div className='col-12 col-md-5 m-1'>
                     {commentItem}
                </div>
            </div>
            </div>
            )
        }
 


export default DishDetail;
