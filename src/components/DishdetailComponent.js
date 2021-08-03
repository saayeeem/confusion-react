import React from 'react';
import { Card, CardImg, CardText, CardBody,CardImgOverlay,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';



function RenderDish({dish, comments}) {
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

        if (dish != null && comments !=null) {
            return (
                <div className="container">
                    <div className="row">
                <div className="col-12 col-md-5 m-1">
                <Card>
                  <CardImg width="100%" src={dish.image} alt={dish.name} />
                  <CardImgOverlay>
                      <CardTitle>{dish.name}</CardTitle>
                  </CardImgOverlay>
                </Card>
                    </div>
                     <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                    <ul className='list-unstyled'>
                    {com}
                </ul>

            </div>
                    </div>
                </div>
            );
        }
        if (dish == null) {
            return (<div></div>)
        }
        if (comments == null) {
            return (<div></div>)
        }
    }
 
const DishDetail= (props)=>{
        
    const dish = props.dish
    const comments = props.comments

    const dishItem = <RenderDish dish={dish}
        comments={comments} />
        
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
                    {dishItem}
            </div>
            </div>
            )
        }
 


export default DishDetail;
