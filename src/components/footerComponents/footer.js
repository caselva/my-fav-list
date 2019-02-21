import React, { Component } from 'react';
import { Alert } from 'reactstrap';

class Footer extends Component
{
	render() 
	{
		return (
			<footer>
				<Alert color="light">
					Thank you for checking out my ReactJS App!
				</Alert>
			</footer>
		);
	}
}

export default Footer;