import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';


class Header extends Component
{
	constructor(props)
	{
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
		};
	}

	toggle()
	{
		this.setState({
			isOpen: !this.state.isOpen
		});
	}
	
	render()
	{
		return (
			<div>
				<Navbar dark expand="md">
					<NavbarBrand href="/">My Favorite Cars of Rocket League</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink href="https://github.com/caselva/my-fav-list/">GitHub</NavLink>
							</NavItem>
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav caret>
									Contact Carlos
								</DropdownToggle>
								<DropdownMenu className="headerFontColor" right>
									<DropdownItem>
										<NavLink href="callto:15059209349">Phone</NavLink>
									</DropdownItem>
									<DropdownItem>
										<NavLink href="mailto:datpubacc@gmail.com">Email</NavLink>
									</DropdownItem>
									<DropdownItem divider />
									<DropdownItem>
										<NavLink href="https://linked.in/">LinkedIn</NavLink>
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
						</Nav>
					</Collapse>
				</Navbar>
			</div>
		);
	}
}

export default Header;