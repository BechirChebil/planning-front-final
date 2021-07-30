import React, { Component } from 'react';
import PlanningService from '../services/PlanningService';

import jsPDF from 'jspdf';

class ListPlanningComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            titre: '',
            startTime: '',
            plannings: []
        }
        this.addPlanning = this.addPlanning.bind(this);
        this.editPlanning = this.editPlanning.bind(this);
        this.deletePlanning = this.deletePlanning.bind(this);
        this.generatPdf = this.generatPdf.bind(this);
    }

    componentDidMount() {
        PlanningService.getPlannings().then((res) => {
            
            this.setState({ plannings: res.data })
        })
        PlanningService.getPlanningById(this.state.id).then((res) => {
            let planning = res.data;
           //console.log(" Add :",planning);
            this.setState({
                titre: planning.titre,
                startTime: planning.startTime,
            });
        })


        //console.log(this.state.plannings.id   );

    }


    addPlanning() {
        this.props.history.push('/AddPlanning/0');
    }

    editPlanning(id) {
        this.props.history.push(`/AddPlanning/${id}`);
    }

    expoterPlanning(id) {
        this.props.history.push(`/ExportPlanning/${id}`);
    }

    deletePlanning(id) {
        PlanningService.deletePlanning(id).then(res => {
            this.setState({ plannings: this.state.plannings.filter(planning => planning.id !== id) });
        })
    }
    viewPlanning(id) {
        this.props.history.push(`/ViewPlanning/${id}`);

    }


    //////generat fuction
    generatPdf(id) {
        // var aa = id;

        // var pl = this.state.id;

        // new document in jsPDF
        var doc = new jsPDF('p', 'pt');

        /////////add some text to pdf doc
        doc.setFont('courier')
        doc.text(11, 22, 'this is default text')

        ///////set the font 
        doc.setFont('Comic Sans')

        // alert(this.state.planning.titre);

        //var variable= planning.getPlanningById(id);

        //doc.text(33, 44, variable);

        ///set the font type
        //doc.setFontSize(10)
        //doc.text(55, 66, 'eee')

        // save the pdf doc
        //doc.save("generated.pdf");

    }

    render() {
        /////////////////

        //////////////////////////////////
        return (
            <div>
                <h2 className="text-center">list Planning</h2>
                <button className="btn btn-primary" onClick={this.addPlanning}>Add Planning</button>
                <br></br><br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>titre</th>
                                <th>start time</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.plannings.map(
                                    planning =>
                                        <tr key={planning.id}>
                                            <td>{planning.id} </td>
                                            <td>{planning.titre} </td>
                                            <td>{planning.startTime} </td>
                                            <td> {console.log(" Add :",planning)}
                                                {/* <button onClick={() => this.editPlanning(planning.id)} className="btn btn-info">Update</button> */}
                                                {/* <button style={{ marginLeft: "10px" }} onClick={() => this.deletePlanning(planning.id)} className="btn btn-danger">Delete</button> */}
                                                <button style={{ marginLeft: "10px" }} onClick={() => {
                                                    if (window.confirm('Are you sure you wish to delete this item?'))
                                                    this.deletePlanning(planning.id)
                                                }} className="btn btn-danger">Delete</button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.viewPlanning(planning.id)} className="btn btn-info">View</button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.expoterPlanning(planning.id)} className="btn btn-danger">Export</button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.generatPdf(planning.id)} className="btn btn-info">generate PDF</button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

            </div>

        );
    }
}

export default ListPlanningComponent;