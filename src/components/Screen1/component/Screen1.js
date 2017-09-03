import React, { Component} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Code from 'material-ui/svg-icons/action/code';
import {Button,Col, Row,Glyphicon} from 'react-bootstrap';

import {getData, Lang} from '../../../actions/action';
import string from '../../../utils/constants';

import ThreeDRotation from 'material-ui-icons/ThreeDRotation';
class Body extends Component {
    constructor(props){
        super(props);     
          
    }

    componentWillMount(){
   
    }

  
    /**
     * @description renders language (name) List from Json object defined in action >> 6 Languages 
     * @author Suhas R More
     * @returns 
     * @memberof Body
     */
    getLanguage(){
        return(
            <div>
                {Lang.map( (row, index) => (
                   
                    <div value={index} id={"ID"+index} value={index} key={index}>
                    
                        <Card className = "Language-Card">
                            
                            <CardHeader
                                title={row.name +"  "}
                                subtitle={row.subTitle}
                                avatar={row.icon}
                            />
                            <Badge badgeContent={row.repos}>
                                <ActionGrade />
                            </Badge>
                            <Button 
                                id={row.api} 
                                lang={row.name}
                                onClick={this.props.onClick}
                                className="Repo" >
                                    {string.Show} {row.name} {string.Repos} 
                                    <Glyphicon glyph="star" />
                            </Button>
                            
                        </Card>
                   
                   </div>
                   
                ))}
            </div>
        );
    }

    /**
     * @description renders langugae and repo count from Json defined in action
     * @author Suhas R More
     * @returns 
     * @memberof Body
     */
    getLanguageDescription(){
        return(
            <div>
            <Card >
                <CardHeader className="Languages" title={"Languages"} />

                {Lang.map( (row, index) => (
                    <CardText key={index}>
                        <Row className="lang">
                            <Col sm={6}>
                                {row.name}
                            </Col>
                            <Col sm={6} className="pull-right ">
                                {row.repos}
                            </Col>
                        </Row>    
                    </CardText>
                ))}

            </Card>
            </div> 
        );
    }
   
    /**
     * @description render Screen1 component i.e Languge List and Languages
     * @author Suhas R More
     * @returns 
     * @memberof Body
     */
    render(){
        return(
           <div>
              <Row>
             <Col sm={8} className = " ">
                 <div className="Section">
                    {this.getLanguage()}
                  </div>
            </Col>
            <Col sm={4} >
                <div className="language-details">
                
                {this.getLanguageDescription()}   
                </div>                 
            </Col >
            </Row>  
           </div>    

        );
    }
}

export default Body;