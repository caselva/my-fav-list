import React, { Component } from 'react';
import {
	// Brings in row and column for flex responsive grid.
	Modal, ModalHeader, ModalBody, ModalFooter,
	Row,
	Col,
	// Reactstrap button.
	Button,
	// Reactstrap form container and inputs.
	Form,
	FormGroup,
	Label,
	Input,
	// Reactstrap card container and children.
	Card,
	CardImg,
	CardTitle,
	CardText,
	CardColumns,
	CardSubtitle,
	CardBody 
} from 'reactstrap';
import axios from "axios";

class Homepage extends Component
{
	constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdrop: true,
	  data: [],
		id: 0,
		message: null,
		intervalIsSet: false,
		idToDelete: null,
		idToUpdate: null,
		objectToUpdate: null
    };
	this.toggle = this.toggle.bind(this);
    this.changeBackdrop = this.changeBackdrop.bind(this);
  }
  
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  changeBackdrop(e) {
    let value = e.target.value;
    if (value !== 'static') {
      value = JSON.parse(value);
    }
    this.setState({ backdrop: value });
  }

	// when component mounts, first thing it does is fetch all existing data in our db
	// then we incorporate a polling logic so that we can easily see if our db has 
	// changed and implement those changes into our UI
	componentDidMount()
	{
		this.getDataFromDb();
		if (!this.state.intervalIsSet) {
			let interval = setInterval(this.getDataFromDb, 1000);
			this.setState({ intervalIsSet: interval });
		}
	}

	// never let a process live forever 
	// always kill a process everytime we are done using it
  	componentWillUnmount()
  	{
		if (this.state.intervalIsSet) {
			clearInterval(this.state.intervalIsSet);
			this.setState({ intervalIsSet: null });
		}
	}

	// just a note, here, in the front end, we use the id key of our data object 
	// in order to identify which we want to Update or delete.
	// for our back end, we use the object id assigned by MongoDB to modify 
	// data base entries

	// our first get method that uses our backend api to 
	// fetch data from our data base
	getDataFromDb = () => {
		fetch("http://localhost:3001/api/getData")
		.then(data => data.json())
		.then(res => this.setState({ data: res.data }));
	};

	// our put method that uses our backend api
	// to create new query into our data base
	putDataToDB = message => {
		let currentIds = this.state.data.map(data => data.id);
		let idToBeAdded = 0;
		while (currentIds.includes(idToBeAdded)) {
			++idToBeAdded;
		}

		axios.post("http://localhost:3001/api/putData", {
			id: idToBeAdded,
			message: message
		});
	};


	// our delete method that uses our backend api 
	// to remove existing database information
	deleteFromDB = idTodelete => {
		let objIdToDelete = null;
		this.state.data.forEach(dat => {
			if (dat.id === idTodelete) {
				objIdToDelete = dat._id;
			}
		});

		axios.delete("http://localhost:3001/api/deleteData", {
			data: {
				id: objIdToDelete
			}
		});
	};


	// our update method that uses our backend api
	// to overwrite existing data base information
	updateDB = (idToUpdate, updateToApply) => {
		let objIdToUpdate = null;
		this.state.data.forEach(dat => {
			if (dat.id === idToUpdate) {
				objIdToUpdate = dat._id;
			}
		});

		axios.post("http://localhost:3001/api/updateData", {
			id: objIdToUpdate,
			update: { message: updateToApply }
		});
	};

	render()
	{
		const { data } = this.state;
		// console.log( data );
		return (
		<div>
        <Form inline onSubmit={(e) => e.preventDefault()}>
          <Button color="secondary" size="lg" className="button" id="button" onClick={this.toggle} block>{this.props.buttonLabel}Modify Records</Button>
        </Form>
		<Form>
        <FormGroup>
          <Input type="text" className="carSearch" id="carSearch" placeholder="with a placeholder" />
        </FormGroup>
		</Form>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={this.state.backdrop}>
          <ModalHeader toggle={this.toggle}>Record Modification Form</ModalHeader>
				<ModalBody>
					<div className="cardBody">
						<Card body>
							<CardTitle>
								<h5>Add A Car</h5>
							</CardTitle>
							<CardText>Add a car to the list.</CardText>
							<hr />
							<Form>
								<FormGroup>
									<Label for="rlCar">Car Name</Label>
									<Input type="text" name="rlCar" id="rlCar" placeholder="Enter Car Name" />
								</FormGroup>
								<FormGroup>
									<Label for="rlCarDesc">Car Description</Label>
									<Input type="text" name="rlCarDesc" id="rlCarDesc" placeholder="Enter Car Description" />
								</FormGroup>
								<FormGroup>
									<Label for="rlCarDesc2">Description of Car</Label>
									<Input
										type="text" name="rlCarDesc2" id="rlCarDesc2"
										onChange={e => this.setState({ message: e.target.value })}
										placeholder="Description of Car"
									/>
								</FormGroup>
								<Button onClick={() => this.putDataToDB(this.state.message)}>
										ADD
									</Button>
							</Form>
						</Card>
					</div>
					<div className="cardBody">
						<Card body>
							<CardTitle>
								<h5>Delete A Car</h5>
							</CardTitle>
							<CardText>Delete a car from the list.</CardText>
							<hr />
							<div>
									<div style={{ padding: "10px" }}>
									<Input
										type="text"
										onChange={e => this.setState({ idToDelete: e.target.value })}
										placeholder="put id of item to delete here"
									/>
									<Button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
										DELETE
									</Button>
								</div>
							</div>
						</Card>
					</div>
					<div className="cardBody">
						<Card body>
							<CardTitle>
								<h5>Update A Car</h5>
							</CardTitle>
							<CardText>Update a car on the list.</CardText>
							<hr />
							<div>
								<div style={{ padding: "10px" }}>
									<Input
										type="text"
										onChange={e => this.setState({ idToUpdate: e.target.value })}
										placeholder="id of item to update here"
									/>
									<Input
										type="text"
										onChange={e => this.setState({ updateToApply: e.target.value })}
										placeholder="put new value of the item here"
									/>
									<Button
										onClick={() => this.updateDB(this.state.idToUpdate, this.state.updateToApply) }
									>
										UPDATE
									</Button>
								</div>
							</div>
						</Card>
					</div>
				</ModalBody>
        </Modal>
			<div className="container-fluid">
				<br alt="THIS IS GROSS REMOVE THIS AND REPLACE WITH CSS." />
			    <Row>
					<Col xs="12" md="8" lg="9">
						<CardColumns>
							{data.length <= 0
							? "NO CARS ENTERED YET!"
							: data.map(dat => (
							<Card>
								<CardImg top width="100%" src="./images/octane.jpg" alt="Car Image" key={data.id} />
								<CardBody>
									<CardTitle>{dat.message}</CardTitle>
									<CardSubtitle>{dat.message}</CardSubtitle>
									<CardText>{dat.id} - {dat.message}</CardText>
									<Button>Button</Button>
								</CardBody>
							</Card>
							))}
						</CardColumns>
					</Col>
					<Col xs="12">
					</Col>
				</Row>
			</div>
			</div>
		);
	}
}

export default Homepage;