import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Navbar } from 'react-bootstrap';
import { Card } from 'material-ui/Card';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (

            <Card>
                <div className="row Header" >
                    <div className="col-md-5 Logo" >
                        TechScan
                    </div>
                    <div className="col-md-1 col-md-offset-4 pull-left">
                        <a href="https://github.com/Suhas010" target="_blank" data-toggle="tooltip" title="Github Repo">Github </a>
                    </div>    
                    <div className="col-md-1  pull-left">
                        <a href="https://linkedin.com/in/suhas-more" target="_blank" data-toggle="tooltip" title="Linkedin">Linkedin </a>
                    </div>
                </div>
            </Card>


        );

    }
}

export default Header;